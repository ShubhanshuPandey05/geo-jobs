/**
 * Greenhouse ATS Scraper (API-based — no Playwright needed)
 * Uses the public Greenhouse Boards API
 */
const axios = require('axios');
const logger = require('../utils/logger');
const { normalizeJob, classifyDepartment, detectWorkType, matchCity } = require('../utils/normalizer');

const GREENHOUSE_API = 'https://boards-api.greenhouse.io/v1/boards';

async function scrape(identifier, options = {}) {
  const url = `${GREENHOUSE_API}/${identifier}/jobs`;
  logger.info(`[Greenhouse] Fetching: ${url}`);

  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'GeoJobs-Scraper/2.0' },
    });

    if (!data.jobs || !Array.isArray(data.jobs)) {
      logger.warn(`[Greenhouse] No jobs array for ${identifier}`);
      return [];
    }

    logger.info(`[Greenhouse] Found ${data.jobs.length} total jobs for ${identifier}`);

    const jobs = [];
    for (const job of data.jobs) {
      const locationStr = job.location?.name || '';
      const city = matchCity(locationStr);

      if (!city && !options.includeAll) continue;

      jobs.push(normalizeJob({
        external_id: `gh_${job.id}`,
        title: job.title?.trim(),
        description: `Open position at ${job.company_name || identifier}. Location: ${locationStr}.`,
        source_url: job.absolute_url,
        work_type: detectWorkType(locationStr, job.title),
        department: classifyDepartment(job.title),
        location_raw: locationStr,
        matched_city: city || 'Bangalore',
        posted_at: job.first_published || job.updated_at,
        ats_platform: 'greenhouse',
      }));
    }

    logger.info(`[Greenhouse] ${jobs.length} jobs matched location filter`);
    return jobs;
  } catch (err) {
    if (err.response?.status === 404) {
      logger.debug(`[Greenhouse] Board not found: ${identifier}`);
    } else {
      logger.error(`[Greenhouse] Error: ${err.message}`);
    }
    return [];
  }
}

module.exports = { scrape, platform: 'greenhouse' };
