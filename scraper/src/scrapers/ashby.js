/**
 * Ashby ATS Scraper (API-based)
 * Uses the public Ashby Job Board API
 */
const axios = require('axios');
const logger = require('../utils/logger');
const { normalizeJob, classifyDepartment, detectWorkType, matchCity } = require('../utils/normalizer');

const ASHBY_API = 'https://api.ashbyhq.com/posting-api/job-board';

async function scrape(identifier, options = {}) {
  const url = `${ASHBY_API}/${identifier}`;
  logger.info(`[Ashby] Fetching: ${url}`);

  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'GeoJobs-Scraper/2.0' },
    });

    const postings = data.jobs || [];
    if (!Array.isArray(postings)) {
      logger.warn(`[Ashby] Unexpected response format for ${identifier}`);
      return [];
    }

    logger.info(`[Ashby] Found ${postings.length} total jobs for ${identifier}`);

    const jobs = [];
    for (const posting of postings) {
      const locationStr = posting.location || '';
      const city = matchCity(locationStr);

      if (!city && !options.includeAll) continue;

      jobs.push(normalizeJob({
        external_id: `ab_${posting.id}`,
        title: posting.title?.trim(),
        description: posting.descriptionPlain?.substring(0, 500) || `Open position at ${identifier}`,
        source_url: posting.jobUrl || posting.applyUrl || `https://jobs.ashbyhq.com/${identifier}/${posting.id}`,
        work_type: detectWorkType(locationStr, posting.title),
        department: posting.department || classifyDepartment(posting.title),
        location_raw: locationStr,
        matched_city: city || 'Bangalore',
        posted_at: posting.publishedAt || new Date().toISOString(),
        ats_platform: 'ashby',
      }));
    }

    logger.info(`[Ashby] ${jobs.length} jobs matched location filter`);
    return jobs;
  } catch (err) {
    if (err.response?.status === 404) {
      logger.debug(`[Ashby] Board not found: ${identifier}`);
    } else {
      logger.error(`[Ashby] Error: ${err.message}`);
    }
    return [];
  }
}

module.exports = { scrape, platform: 'ashby' };
