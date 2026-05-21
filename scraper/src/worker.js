/**
 * BullMQ Worker — Processes scrape and discovery jobs
 * Handles: ATS scraping, career page discovery, generic scraping
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const logger = require('./utils/logger');
const browserPool = require('./utils/browser-pool');
const storage = require('./storage');
const { discoverCareerPage } = require('./discovery');

// Scraper modules
const greenhouseScraper = require('./scrapers/greenhouse');
const leverScraper = require('./scrapers/lever');
const ashbyScraper = require('./scrapers/ashby');
const genericScraper = require('./scrapers/generic');

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
});

const CONCURRENCY = parseInt(process.env.SCRAPER_CONCURRENCY) || 5;

// ─── Scraper Worker ──────────────────────────────────
const scraperWorker = new Worker('scraper', async (job) => {
  const { company, options } = job.data;
  const startTime = Date.now();

  logger.info(`[Worker] Processing: ${company.name} (${company.ats_platform || 'generic'})`);

  try {
    // Step 1: Upsert company + offices
    const { companyId, cityToOfficeId } = await storage.upsertCompany(company);

    // Step 2: Mark existing jobs as inactive
    const deactivated = await storage.markJobsInactive(companyId);
    if (deactivated > 0) logger.debug(`Deactivated ${deactivated} old jobs for ${company.name}`);

    // Step 3: Scrape jobs based on platform
    let jobs = [];
    let method = 'unknown';

    switch (company.ats_platform) {
      case 'greenhouse':
        jobs = await greenhouseScraper.scrape(company.ats_identifier, options);
        method = 'api';
        break;
      case 'lever':
        jobs = await leverScraper.scrape(company.ats_identifier, options);
        method = 'api';
        break;
      case 'ashby':
        jobs = await ashbyScraper.scrape(company.ats_identifier, options);
        method = 'api';
        break;
      case 'career_page':
        if (company.career_url) {
          jobs = await genericScraper.scrape(company.career_url, options);
          method = 'hybrid';
        }
        break;
      default:
        if (company.career_url) {
          jobs = await genericScraper.scrape(company.career_url, options);
          method = 'hybrid';
        } else {
          logger.info(`[Worker] No scraping method for ${company.name}`);
          method = 'none';
        }
    }

    // Step 4: Save jobs
    let result = { inserted: 0, updated: 0, skipped: 0 };
    if (jobs.length > 0) {
      result = await storage.saveJobs(jobs, companyId, cityToOfficeId);
      logger.info(`[Worker] ${company.name}: ${result.inserted} new, ${result.updated} updated, ${result.skipped} skipped`);
    } else {
      logger.info(`[Worker] ${company.name}: No jobs found`);
    }

    // Step 5: Update hiring status
    const { isHiring, jobCount } = await storage.updateHiringStatus(companyId);

    // Step 6: Log metrics
    const durationMs = Date.now() - startTime;
    await storage.logScrapeRun({
      companyId,
      platform: company.ats_platform || 'generic',
      jobsFound: jobs.length,
      jobsInserted: result.inserted,
      jobsUpdated: result.updated,
      durationMs,
      method,
    });

    logger.info(`[Worker] ✅ ${company.name}: ${jobCount} active jobs (${durationMs}ms)`);

    return {
      company: company.name,
      jobsFound: jobs.length,
      jobsInserted: result.inserted,
      isHiring,
      durationMs,
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;
    logger.error(`[Worker] ❌ ${company.name}: ${err.message}`, { stack: err.stack });

    await storage.logScrapeRun({
      companyId: null,
      platform: company.ats_platform || 'generic',
      jobsFound: 0,
      jobsInserted: 0,
      jobsUpdated: 0,
      durationMs,
      method: 'error',
      error: err.message,
    });

    throw err; // Re-throw for BullMQ retry
  }
}, {
  connection,
  concurrency: CONCURRENCY,
  limiter: {
    max: 10,
    duration: 60000, // Max 10 jobs per minute
  },
});

// ─── Discovery Worker ────────────────────────────────
const discoveryWorker = new Worker('discovery', async (job) => {
  const { company } = job.data;
  logger.info(`[Discovery] Discovering career page for: ${company.name}`);

  try {
    const careerUrl = await discoverCareerPage(company.website);

    if (careerUrl) {
      logger.info(`[Discovery] Found career page: ${careerUrl}`);

      // Enqueue a scrape job for the discovered career page
      const { scraperQueue } = require('./queue');
      await scraperQueue.add('scrape-company', {
        company: {
          ...company,
          ats_platform: 'career_page',
          career_url: careerUrl,
        },
        options: {},
      }, {
        priority: 3,
        delay: 2000,
      });

      return { company: company.name, careerUrl, discovered: true };
    }

    logger.info(`[Discovery] No career page found for ${company.name}`);
    return { company: company.name, careerUrl: null, discovered: false };
  } catch (err) {
    logger.error(`[Discovery] Error for ${company.name}: ${err.message}`);
    throw err;
  }
}, {
  connection,
  concurrency: 3,
  limiter: {
    max: 5,
    duration: 60000,
  },
});

// ─── Event Handlers ──────────────────────────────────
scraperWorker.on('completed', (job, result) => {
  logger.debug(`Job completed: ${result?.company} (${result?.durationMs}ms)`);
});

scraperWorker.on('failed', (job, err) => {
  logger.error(`Job failed: ${job?.data?.company?.name} — ${err.message}`);
});

discoveryWorker.on('completed', (job, result) => {
  logger.debug(`Discovery completed: ${result?.company} (${result?.discovered ? 'found' : 'not found'})`);
});

discoveryWorker.on('failed', (job, err) => {
  logger.error(`Discovery failed: ${job?.data?.company?.name} — ${err.message}`);
});

// ─── Graceful Shutdown ───────────────────────────────
async function shutdown() {
  logger.info('Shutting down workers...');
  await scraperWorker.close();
  await discoveryWorker.close();
  await browserPool.shutdown();
  await connection.quit();
  const db = require('./utils/db');
  await db.destroy();
  logger.info('Workers shut down.');
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

logger.info(`Worker started (concurrency: ${CONCURRENCY})`);
logger.info(`Listening on queues: scraper, discovery`);
