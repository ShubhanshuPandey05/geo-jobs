/**
 * BullMQ Queue Configuration
 * Defines scraper queues with retry, concurrency, and priority settings
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Queue, QueueScheduler } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
});

// ─── Main Scraper Queue ──────────────────────────────
const scraperQueue = new Queue('scraper', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: {
      count: 1000,
      age: 86400, // 24 hours
    },
    removeOnFail: {
      count: 500,
      age: 172800, // 48 hours
    },
  },
});

// ─── Discovery Queue ─────────────────────────────────
const discoveryQueue = new Queue('discovery', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
    removeOnComplete: { count: 500 },
    removeOnFail: { count: 200 },
  },
});

/**
 * Add a company scrape job to the queue
 */
async function enqueueScrapeJob(companyData, options = {}) {
  const jobId = `scrape_${companyData.slug}_${Date.now()}`;
  const priority = options.priority || getPriority(companyData);

  return scraperQueue.add('scrape-company', {
    company: companyData,
    options: {
      includeAll: options.includeAll || false,
    },
  }, {
    jobId,
    priority,
    delay: options.delay || 0,
  });
}

/**
 * Add a career page discovery job
 */
async function enqueueDiscoveryJob(companyData, options = {}) {
  return discoveryQueue.add('discover-careers', {
    company: companyData,
  }, {
    jobId: `discover_${companyData.slug}_${Date.now()}`,
    priority: 5,
    delay: options.delay || 0,
  });
}

/**
 * Enqueue all companies for scraping
 */
async function enqueueAllCompanies(companies) {
  let atsCount = 0, discoveryCount = 0;

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const delay = i * 1500; // 1.5s stagger between companies

    if (company.ats_platform && company.ats_identifier) {
      // ATS companies with API go directly to scrape queue
      await enqueueScrapeJob(company, { delay });
      atsCount++;
    } else if (company.ats_platform === 'career_page' && company.career_url) {
      // Career page companies with known URL go to scrape queue
      await enqueueScrapeJob(company, { delay });
      atsCount++;
    } else if (company.website) {
      // Unknown companies go to discovery queue
      await enqueueDiscoveryJob(company, { delay: delay + 500 });
      discoveryCount++;
    }
  }

  return { atsCount, discoveryCount };
}

/**
 * Determine priority (lower = higher priority)
 * 1 = ATS with verified API
 * 3 = career page with known URL
 * 5 = needs discovery
 */
function getPriority(company) {
  if (company.ats_platform) return 1;
  if (company.career_url) return 3;
  return 5;
}

/**
 * Get queue stats
 */
async function getQueueStats() {
  const [scraperCounts, discoveryCounts] = await Promise.all([
    scraperQueue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed'),
    discoveryQueue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed'),
  ]);

  return { scraper: scraperCounts, discovery: discoveryCounts };
}

async function closeQueues() {
  await scraperQueue.close();
  await discoveryQueue.close();
  await connection.quit();
}

module.exports = {
  scraperQueue,
  discoveryQueue,
  connection,
  enqueueScrapeJob,
  enqueueDiscoveryJob,
  enqueueAllCompanies,
  getQueueStats,
  closeQueues,
};
