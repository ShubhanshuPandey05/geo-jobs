/**
 * Sequential Company Orchestrator
 * 
 * Processes companies one-by-one with the new pipeline:
 * 1. Scrape all sources (ATS APIs + career pages + generic)
 * 2. ATS jobs → staging directly (trusted source)
 * 3. Career page / generic jobs → AI validation via Ollama → staging
 * 4. Atomic swap: delete old jobs → promote staging → cleanup
 * 5. Update hiring status + log metrics
 * 
 * Usage: node src/orchestrator.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const readline = require('readline');
const logger = require('./utils/logger');
const companies = require('./companies');
const storage = require('./storage');
const db = require('./utils/db');
const { validateJobs, isOllamaAvailable } = require('./services/ai-validator');

// Scraper modules
const greenhouseScraper = require('./scrapers/greenhouse');
const leverScraper = require('./scrapers/lever');
const ashbyScraper = require('./scrapers/ashby');
const genericScraper = require('./scrapers/generic');
const { discoverCareerPage } = require('./discovery');

// ATS platforms that produce trusted, structured data (skip AI validation)
const TRUSTED_ATS_PLATFORMS = new Set(['greenhouse', 'lever', 'ashby']);

async function orchestrate() {
  logger.info('═'.repeat(60));
  logger.info('JobMap Orchestrator v3.0 — Parallel Pipeline');
  logger.info(`Time: ${new Date().toISOString()}`);
  logger.info(`Companies: ${companies.length}`);
  logger.info('═'.repeat(60));

  // Check Ollama availability upfront
  const aiAvailable = await isOllamaAvailable();
  if (!aiAvailable) {
    logger.warn('⚠️  Ollama is not available — career page jobs will NOT be AI-validated');
    logger.warn('   Start Ollama and pull qwen3:8b to enable AI filtering');
  }

  const summary = {
    total: companies.length,
    processed: 0,
    failed: 0,
    totalJobsScraped: 0,
    totalAtsJobs: 0,
    totalGenericJobs: 0,
    totalAiValidated: 0,
    totalAiFiltered: 0,
    totalJobsSaved: 0,
    errors: [],
  };

  const concurrency = await new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter number of concurrent processes (default 1): ', answer => {
      rl.close();
      resolve(parseInt(answer) || 1);
    });
  });

  logger.info(`Starting with concurrency: ${concurrency}`);

  let currentIndex = 0;

  const workers = Array(concurrency).fill().map(async (_, workerId) => {
    while (true) {
      const i = currentIndex++;
      if (i >= companies.length) break;

      const company = companies[i];
      const progress = `[${i + 1}/${companies.length}]`;

      logger.info('');
      logger.info('─'.repeat(60));
      logger.info(`${progress} Worker ${workerId + 1} Processing: ${company.name}`);
      logger.info('─'.repeat(60));

      const startTime = Date.now();

      try {
        await processCompany(company, aiAvailable, summary);
        summary.processed++;
      } catch (err) {
        summary.failed++;
        summary.errors.push({ company: company.name, error: err.message });
        logger.error(`${progress} ❌ Worker ${workerId + 1} FAILED: ${company.name} — ${err.message}`);

        // Clean up staging on error
        try {
          const existing = await db('companies').where('slug', company.slug).first();
          if (existing) {
            await storage.clearCompanyStaging(existing.id);
          }
        } catch (cleanupErr) {
          logger.error(`  Staging cleanup failed: ${cleanupErr.message}`);
        }
      }

      const durationMs = Date.now() - startTime;
      logger.info(`  ⏱️  Worker ${workerId + 1}: ${company.name} completed in ${durationMs}ms`);

      // Rate limiting between companies
      const delay = 1500 + Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  });

  await Promise.all(workers);

  // Print summary
  printSummary(summary);

  // Cleanup
  const browserPool = require('./utils/browser-pool');
  await browserPool.shutdown();
  await db.destroy();
}

/**
 * Process a single company through the full pipeline
 */
async function processCompany(company, aiAvailable, summary) {
  // Step 1: Upsert company + offices
  const { companyId, cityToOfficeId } = await storage.upsertCompany(company);

  // Step 2: Scrape all available sources
  const { atsJobs, genericJobs, method } = await scrapeAllSources(company);

  summary.totalJobsScraped += atsJobs.length + genericJobs.length;
  summary.totalAtsJobs += atsJobs.length;
  summary.totalGenericJobs += genericJobs.length;

  logger.info(`  📊 Scraped: ${atsJobs.length} ATS jobs, ${genericJobs.length} generic jobs`);

  // Step 3: Stage ATS jobs directly (trusted)
  if (atsJobs.length > 0) {
    await storage.insertToStaging(atsJobs, companyId, cityToOfficeId, 'ats_api', 1.0);
    logger.info(`  ✅ ${atsJobs.length} ATS jobs → staging (trusted, no AI needed)`);
  }

  // Step 4: AI validate generic/career page jobs
  let validatedGenericJobs = [];
  if (genericJobs.length > 0) {
    // if (aiAvailable) {
    //   validatedGenericJobs = await validateJobs(genericJobs, company.name);
    //   const filtered = genericJobs.length - validatedGenericJobs.length;
    //   summary.totalAiValidated += validatedGenericJobs.length;
    //   summary.totalAiFiltered += filtered;
    //   logger.info(`  🤖 AI validated: ${validatedGenericJobs.length} passed, ${filtered} filtered out`);
    // } else {


    // No AI Needed — pass everything through with confidence cause this is extracted by Ai model only
    validatedGenericJobs = genericJobs.map(j => ({ ...j, ai_confidence: 90, ai_is_active: true }));
    logger.info(`  ⚠️  No AI Needed — all ${genericJobs.length} generic jobs passed through`);


    // }

    if (validatedGenericJobs.length > 0) {
      await storage.insertToStaging(
        validatedGenericJobs,
        companyId,
        cityToOfficeId,
        'career_page',
        null // Individual confidence scores are already on each job
      );
    }
  }

  // Step 5: Atomic swap — staging → jobs table
  const totalStaged = atsJobs.length + validatedGenericJobs.length;
  if (totalStaged > 0) {
    const { deleted, promoted } = await storage.swapCompanyJobs(companyId);
    summary.totalJobsSaved += promoted;
    logger.info(`  🔄 Swapped: deleted ${deleted} old jobs, promoted ${promoted} new jobs`);
  } else {
    // No new jobs found — just delete old ones
    const deleted = await storage.deleteCompanyJobs(companyId);
    if (deleted > 0) {
      logger.info(`  🗑️  No new jobs found — deleted ${deleted} stale jobs`);
    } else {
      logger.info(`  ℹ️  No jobs found and none existed`);
    }
  }

  // Step 6: Update hiring status
  const { isHiring, jobCount } = await storage.updateHiringStatus(companyId);
  logger.info(`  ${isHiring ? '✅' : '⬜'} ${jobCount} active jobs`);

  // Step 7: Log scrape run
  const durationMs = Date.now();
  await storage.logScrapeRun({
    companyId,
    platform: company.ats_platform || 'generic',
    jobsFound: atsJobs.length + genericJobs.length,
    jobsInserted: totalStaged,
    jobsUpdated: 0,
    durationMs: 0, // Will be calculated by caller
    method,
    aiValidated: validatedGenericJobs.length,
    aiFiltered: genericJobs.length - validatedGenericJobs.length,
  });
}

/**
 * Scrape all available sources for a company
 * Returns { atsJobs: [], genericJobs: [], method: string }
 */
async function scrapeAllSources(company) {
  const atsJobs = [];
  const genericJobs = [];
  let method = 'none';

  // Try ATS API first (if configured)
  if (company.ats_platform && company.ats_identifier && TRUSTED_ATS_PLATFORMS.has(company.ats_platform)) {
    try {
      let jobs = [];
      switch (company.ats_platform) {
        case 'greenhouse':
          jobs = await greenhouseScraper.scrape(company.ats_identifier, { includeAll: true });
          break;
        case 'lever':
          jobs = await leverScraper.scrape(company.ats_identifier, { includeAll: true });
          break;
        case 'ashby':
          jobs = await ashbyScraper.scrape(company.ats_identifier, { includeAll: true });
          break;
      }
      atsJobs.push(...jobs);
      method = 'api';
      logger.info(`  [ATS] ${company.ats_platform}: ${jobs.length} jobs`);
    } catch (err) {
      logger.error(`  [ATS] ${company.ats_platform} failed: ${err.message}`);
    }
  }

  // Try career page / generic scraping
  const career_url = company.career_url;
  if (career_url) {
    try {
      const jobs = await genericScraper.scrape(career_url, { forceDynamic: false, companyName: company.name });
      genericJobs.push(...jobs);
      method = method === 'api' ? 'hybrid' : 'career_page';
      logger.info(`  [Career] ${career_url}: ${jobs.length} jobs`);
    } catch (err) {
      logger.error(`  [Career] Scrape failed: ${err.message}`);
    }
  }
  else if (!company.ats_platform && company.website) {
    // Attempt career page discovery
    try {
      logger.info(`  [Discovery] Searching for career page on ${company.website}...`);
      const discoveredUrl = await discoverCareerPage(company.website);
      if (discoveredUrl) {
        logger.info(`  [Discovery] Found: ${discoveredUrl}`);
        const jobs = await genericScraper.scrape(discoveredUrl, { forceDynamic: false, companyName: company.name });
        genericJobs.push(...jobs);
        method = 'discovery';
      } else {
        logger.info(`  [Discovery] No career page found`);
      }
    } catch (err) {
      logger.error(`  [Discovery] Failed: ${err.message}`);
    }
  }

  return { atsJobs, genericJobs, method };
}

/**
 * Print final summary
 */
function printSummary(summary) {
  logger.info('');
  logger.info('═'.repeat(60));
  logger.info('ORCHESTRATION COMPLETE');
  logger.info('═'.repeat(60));
  logger.info(`  Companies processed:  ${summary.processed}/${summary.total}`);
  logger.info(`  Companies failed:     ${summary.failed}`);
  logger.info(`  Total jobs scraped:   ${summary.totalJobsScraped}`);
  logger.info(`    ├─ ATS (trusted):   ${summary.totalAtsJobs}`);
  logger.info(`    └─ Generic/career:  ${summary.totalGenericJobs}`);
  logger.info(`  AI validated:         ${summary.totalAiValidated}`);
  logger.info(`  AI filtered out:      ${summary.totalAiFiltered}`);
  logger.info(`  Jobs saved to DB:     ${summary.totalJobsSaved}`);

  if (summary.errors.length > 0) {
    logger.info('');
    logger.info('  ERRORS:');
    summary.errors.forEach(e => logger.error(`    ❌ ${e.company}: ${e.error}`));
  }

  logger.info('═'.repeat(60));
}

// ─── Entry Point ──────────────────────────────────────
if (require.main === module) {
  orchestrate()
    .then(() => {
      logger.info('Orchestrator finished.');
      process.exit(0);
    })
    .catch(err => {
      logger.error(`Orchestrator fatal error: ${err.message}`);
      process.exit(1);
    });
}

module.exports = { orchestrate };