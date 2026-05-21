/**
 * Lever ATS Scraper (API-based)
 * Uses the public Lever Postings API
 */
const axios = require('axios');
const logger = require('../utils/logger');
const { normalizeJob, classifyDepartment, detectWorkType, matchCity } = require('../utils/normalizer');

const LEVER_API = 'https://api.lever.co/v0/postings';

async function scrape(identifier, options = {}) {
  const url = `${LEVER_API}/${identifier}?mode=json`;
  logger.info(`[Lever] Fetching: ${url}`);

  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'JobMap-Scraper/2.0' },
    });

    if (!Array.isArray(data)) {
      logger.warn(`[Lever] Unexpected response format for ${identifier}`);
      return [];
    }

    logger.info(`[Lever] Found ${data.length} total jobs for ${identifier}`);

    const jobs = [];
    for (const posting of data) {
      const locationStr = posting.categories?.location || '';
      const city = matchCity(locationStr);

      if (!city && !options.includeAll) continue;

      const department = posting.categories?.department || classifyDepartment(posting.text);
      const workType = posting.categories?.commitment || detectWorkType(locationStr, posting.text);

      jobs.push(normalizeJob({
        external_id: `lv_${posting.id}`,
        title: posting.text?.trim(),
        description: posting.descriptionPlain?.substring(0, 500) || `Open position at ${identifier}`,
        source_url: posting.hostedUrl || posting.applyUrl,
        work_type: workType.toLowerCase().includes('remote') ? 'remote'
          : workType.toLowerCase().includes('hybrid') ? 'hybrid' : 'onsite',
        department: department,
        location_raw: locationStr,
        matched_city: city || 'Bangalore',
        posted_at: posting.createdAt ? new Date(posting.createdAt).toISOString() : new Date().toISOString(),
        ats_platform: 'lever',
      }));
    }

    logger.info(`[Lever] ${jobs.length} jobs matched location filter`);
    return jobs;
  } catch (err) {
    if (err.response?.status === 404) {
      logger.debug(`[Lever] Board not found: ${identifier}`);
    } else {
      logger.error(`[Lever] Error: ${err.message}`);
    }
    return [];
  }
}

module.exports = { scrape, platform: 'lever' };
