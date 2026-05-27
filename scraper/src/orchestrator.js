/**
 * Sequential Company Orchestrator — API-Driven
 * 
 * Reads companies with career URLs from the admin API, then for each company:
 * 1. Scrape all sources (ATS APIs + career pages + generic)
 * 2. ATS jobs → trusted (no AI needed)
 * 3. Career page / generic jobs → collected
 * 4. Bulk insert all jobs via admin API (which also indexes in Meilisearch)
 * 
 * Usage: cd scraper && npm run orchestrate
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const readline = require('readline');
const axios = require('axios');
const logger = require('./utils/logger');

// Scraper modules
const greenhouseScraper = require('./scrapers/greenhouse');
const leverScraper = require('./scrapers/lever');
const ashbyScraper = require('./scrapers/ashby');
const genericScraper = require('./scrapers/generic');
const { discoverCareerPage } = require('./discovery');

// ─── Config ──────────────────────────────────────────────────────────────────
const API_BASE = process.env.API_BASE_URL || 'http://localhost:3001';
const TOKEN = process.env.ADMIN_API_TOKEN;

const api = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: `Bearer ${TOKEN}` },
  timeout: 120000, // 2 min for bulk job insert
});

// ATS platforms that produce trusted, structured data (skip AI validation)
const TRUSTED_ATS_PLATFORMS = new Set(['greenhouse', 'lever', 'ashby']);

async function orchestrate() {
  if (!TOKEN) {
    logger.error('❌ ADMIN_API_TOKEN not set in .env');
    process.exit(1);
  }

  // Fetch companies with career URLs from API
  logger.info('📡 Fetching companies with career URLs from API...');
  let companies;
  try {
    const res = await api.get('/api/admin/companies/with-career-url');
    companies = res.data.companies;
    logger.info(`   Found ${companies.length} companies with career URLs\n`);
  } catch (err) {
    logger.error(`❌ Failed to fetch companies: ${err.response?.data?.error || err.message}`);
    process.exit(1);
  }

  if (companies.length === 0) {
    logger.info('✅ No companies with career URLs to process.');
    return;
  }

  logger.info('═'.repeat(60));
  logger.info('JobMap Orchestrator v4.0 — API-Driven Pipeline');
  logger.info(`Time: ${new Date().toISOString()}`);
  logger.info(`Companies: ${companies.length}`);
  logger.info('═'.repeat(60));

  const summary = {
    total: companies.length,
    processed: 0,
    failed: 0,
    totalJobsScraped: 0,
    totalAtsJobs: 0,
    totalGenericJobs: 0,
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
        await processCompany(company, summary);
        summary.processed++;
      } catch (err) {
        summary.failed++;
        summary.errors.push({ company: company.name, error: err.message });
        logger.error(`${progress} ❌ Worker ${workerId + 1} FAILED: ${company.name} — ${err.message}`);
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
  try {
    const browserPool = require('./utils/browser-pool');
    await browserPool.shutdown();
  } catch {}
}

/**
 * Process a single company through the full pipeline
 */
async function processCompany(company, summary) {
  // Scrape all available sources
  const { atsJobs, genericJobs, method } = await scrapeAllSources(company);

  summary.totalJobsScraped += atsJobs.length + genericJobs.length;
  summary.totalAtsJobs += atsJobs.length;
  summary.totalGenericJobs += genericJobs.length;

  logger.info(`  📊 Scraped: ${atsJobs.length} ATS jobs, ${genericJobs.length} generic jobs`);

  // Combine all jobs
  const allJobs = [];

  // ATS jobs — trusted
  for (const job of atsJobs) {
    allJobs.push({
      ...job,
      source_type: 'ats_api',
      ai_confidence: 1.0,
    });
  }

  // Generic/career page jobs
  for (const job of genericJobs) {
    allJobs.push({
      ...job,
      source_type: 'career_page',
      ai_confidence: job.ai_confidence || 0.9,
    });
  }

  if (allJobs.length === 0) {
    logger.info(`  ℹ️  No jobs found for ${company.name}`);
    return;
  }

  // Bulk insert via API (handles dedup + Meilisearch indexing)
  try {
    const res = await api.post('/api/admin/jobs/bulk', {
      company_id: company.id,
      jobs: allJobs,
    });

    const { inserted, duplicates, active_job_count, errors } = res.data;
    summary.totalJobsSaved += inserted;
    logger.info(`  ✅ API: +${inserted} inserted, ~${duplicates} duplicates, ${active_job_count} active total`);

    if (errors?.length) {
      errors.forEach(e => logger.warn(`     ❌ ${e.title}: ${e.error}`));
    }
  } catch (err) {
    logger.error(`  ❌ Bulk job insert failed: ${err.response?.data?.error || err.message}`);
    throw err;
  }
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

        // Also save the discovered career URL to DB
        try {
          await api.patch(`/api/admin/companies/${company.slug}/career-url`, {
            career_url: discoveredUrl,
          });
          logger.info(`  [Discovery] Saved career URL to DB`);
        } catch {}
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
  logger.info(`  Jobs saved to DB:     ${summary.totalJobsSaved}`);

  if (summary.errors.length > 0) {
    logger.info('');
    logger.info('  ERRORS:');
    summary.errors.forEach(e => logger.error(`    ❌ ${e.company}: ${e.error}`));
  }

  logger.info('═'.repeat(60));
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
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