/**
 * GeoJobs Scraper — Main Entry Point
 * Orchestrates the scraping pipeline:
 * 1. Seeds companies from the company list
 * 2. Enqueues scrape jobs via BullMQ
 * 3. Workers process jobs (ATS APIs → career page discovery → generic scraping)
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const logger = require('./utils/logger');
const companies = require('./companies');
const { enqueueAllCompanies, getQueueStats, closeQueues } = require('./queue');
const storage = require('./storage');
const db = require('./utils/db');

async function main() {
  logger.info('='.repeat(60));
  logger.info('GeoJobs Scraper v2.0 — Starting');
  logger.info(`Time: ${new Date().toISOString()}`);
  logger.info(`Companies: ${companies.length}`);
  logger.info('='.repeat(60));

  try {
    // Step 1: Seed all companies and offices
    logger.info('Step 1: Seeding companies and offices...');
    for (const company of companies) {
      await storage.upsertCompany(company);
    }
    logger.info(`Seeded ${companies.length} companies`);

    // Step 2: Enqueue all companies for scraping
    logger.info('Step 2: Enqueueing scrape jobs...');
    const { atsCount, discoveryCount } = await enqueueAllCompanies(companies);
    logger.info(`Enqueued: ${atsCount} ATS scrape jobs, ${discoveryCount} discovery jobs`);

    // Step 3: Monitor progress
    logger.info('Step 3: Jobs enqueued. Start the worker to process them:');
    logger.info('  npm run worker');
    logger.info('');

    // Show queue stats
    const stats = await getQueueStats();
    logger.info(`Queue Stats:`);
    logger.info(`  Scraper: ${JSON.stringify(stats.scraper)}`);
    logger.info(`  Discovery: ${JSON.stringify(stats.discovery)}`);

    // If running in direct mode (no separate worker), process inline
    if (process.env.DIRECT_MODE === 'true') {
      logger.info('Running in DIRECT mode — processing jobs inline...');
      await processDirectMode();
    }

  } catch (err) {
    logger.error(`Fatal error: ${err.message}`, { stack: err.stack });
  } finally {
    await closeQueues();
    await db.destroy();
    logger.info('Done.');
  }
}

/**
 * Direct mode: Process all companies without BullMQ workers
 * Useful for one-shot scraping or testing
 */
async function processDirectMode() {
  const greenhouseScraper = require('./scrapers/greenhouse');
  const leverScraper = require('./scrapers/lever');
  const ashbyScraper = require('./scrapers/ashby');
  const genericScraper = require('./scrapers/generic');
  const { discoverCareerPage } = require('./discovery');

  const stats = {
    processed: 0,
    jobsScraped: 0,
    jobsInserted: 0,
    errors: [],
  };

  for (const company of companies) {
    logger.info(`\n${'─'.repeat(50)}`);
    logger.info(`Processing: ${company.name} (${company.ats_platform || 'discovery'})`);

    const startTime = Date.now();

    try {
      const { companyId, cityToOfficeId } = await storage.upsertCompany(company);
      await storage.markJobsInactive(companyId);

      let jobs = [];
      let method = 'none';

      // Route to appropriate scraper
      if (company.ats_platform === 'greenhouse' && company.ats_identifier) {
        jobs = await greenhouseScraper.scrape(company.ats_identifier);
        method = 'api';
      } else if (company.ats_platform === 'lever' && company.ats_identifier) {
        jobs = await leverScraper.scrape(company.ats_identifier);
        method = 'api';
      } else if (company.ats_platform === 'ashby' && company.ats_identifier) {
        jobs = await ashbyScraper.scrape(company.ats_identifier);
        method = 'api';
      } else if (company.career_url) {
        jobs = await genericScraper.scrape(company.career_url);
        method = 'hybrid';
      } else if (company.website) {
        // Try discovery
        logger.info(`  Discovering career page for ${company.name}...`);
        const careerUrl = await discoverCareerPage(company.website);
        if (careerUrl) {
          logger.info(`  Found: ${careerUrl}`);
          jobs = await genericScraper.scrape(careerUrl);
          method = 'hybrid';
        } else {
          logger.info(`  No career page found`);
        }
      }

      stats.jobsScraped += jobs.length;

      if (jobs.length > 0) {
        const result = await storage.saveJobs(jobs, companyId, cityToOfficeId);
        logger.info(`  ✅ ${result.inserted} new, ${result.updated} updated`);
        stats.jobsInserted += result.inserted;
      }

      const { isHiring, jobCount } = await storage.updateHiringStatus(companyId);
      const durationMs = Date.now() - startTime;

      await storage.logScrapeRun({
        companyId,
        platform: company.ats_platform || 'generic',
        jobsFound: jobs.length,
        jobsInserted: jobs.length,
        jobsUpdated: 0,
        durationMs,
        method,
      });

      logger.info(`  ${isHiring ? '✅' : '⬜'} ${jobCount} active jobs (${durationMs}ms)`);
      stats.processed++;

      // Rate limiting
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

    } catch (err) {
      logger.error(`  ❌ ${company.name}: ${err.message}`);
      stats.errors.push({ company: company.name, error: err.message });
    }
  }

  // Summary
  logger.info('\n' + '='.repeat(60));
  logger.info('SCRAPING COMPLETE');
  logger.info('='.repeat(60));
  logger.info(`Processed:    ${stats.processed}/${companies.length}`);
  logger.info(`Jobs scraped: ${stats.jobsScraped}`);
  logger.info(`Jobs saved:   ${stats.jobsInserted}`);
  logger.info(`Errors:       ${stats.errors.length}`);
  if (stats.errors.length > 0) {
    stats.errors.forEach(e => logger.error(`  - ${e.company}: ${e.error}`));
  }

  // Shutdown browser pool
  const browserPool = require('./utils/browser-pool');
  await browserPool.shutdown();
}

main().catch(err => {
  logger.error(`Fatal: ${err.message}`);
  process.exit(1);
});
