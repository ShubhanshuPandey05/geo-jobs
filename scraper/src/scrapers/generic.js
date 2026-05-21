/**
 * Generic Career Page Scraper
 * Heuristic-based job extraction from custom career pages
 * Supports: React, Next.js, Vue, Webflow, Notion, static HTML
 */
const cheerio = require('cheerio');
const logger = require('../utils/logger');
const { hybridFetch } = require('../utils/http-client');
const { normalizeJob, classifyDepartment, detectWorkType, matchCity } = require('../utils/normalizer');

// ─── Selectors for common career page patterns ───────
const JOB_LIST_SELECTORS = [
  // Common career page patterns
  '[class*="job-list"] a', '[class*="jobList"] a', '[class*="job_list"] a',
  '[class*="career"] a[href*="job"]', '[class*="career"] a[href*="position"]',
  '[class*="opening"] a', '[class*="position"] a',
  '[class*="vacancy"] a', '[class*="posting"] a',
  // Data attributes
  '[data-job]', '[data-position]', '[data-posting]',
  // Notion career pages
  '.notion-collection-item a',
  // Lever embeds
  '.lever-job-posting a',
  // Common list patterns
  '.jobs-list a', '.job-listings a', '.career-listing a',
  '#careers a[href*="/job"]', '#jobs a',
  // Table-based job listings
  'table tr a[href*="job"]', 'table tr a[href*="career"]',
  // Webflow
  '.w-dyn-item a',
  // Generic link patterns that look like job postings
  'a[href*="/careers/"][href*="/"]',
  'a[href*="/jobs/"][href*="/"]',
  'a[href*="/positions/"]',
];

const JOB_CARD_SELECTORS = [
  '[class*="job-card"]', '[class*="jobCard"]', '[class*="job_card"]',
  '[class*="job-item"]', '[class*="jobItem"]', '[class*="job_item"]',
  '[class*="posting-card"]', '[class*="position-card"]',
  '[class*="career-item"]', '[class*="opening-item"]',
  '.job', '.position', '.opening', '.posting',
  'li[class*="job"]', 'li[class*="position"]',
  'article[class*="job"]', 'article[class*="career"]',
  'div[class*="job"]', 'div[class*="position"]',
];

const TITLE_SELECTORS = [
  'h2', 'h3', 'h4',
  '[class*="title"]', '[class*="name"]',
  '[class*="heading"]', '[class*="position"]',
  'a', 'strong',
];

const LOCATION_SELECTORS = [
  '[class*="location"]', '[class*="city"]', '[class*="place"]',
  '[class*="geo"]', '[class*="region"]', '[class*="office"]',
  'span:has(> svg)', // Icon + text pattern
];

const DEPARTMENT_SELECTORS = [
  '[class*="department"]', '[class*="team"]', '[class*="category"]',
  '[class*="function"]', '[class*="group"]',
];

/**
 * Scrape a generic career page
 */
async function scrape(url, options = {}) {
  logger.info(`[Generic] Scraping career page: ${url}`);

  try {
    const result = await hybridFetch(url, {
      forceDynamic: options.forceDynamic || false,
      scrollToBottom: true,
      timeout: 30000,
    });

    if (!result || !result.html) {
      logger.warn(`[Generic] Failed to fetch ${url}`);
      return [];
    }

    logger.info(`[Generic] Fetched via ${result.method}: ${url}`);
    const $ = cheerio.load(result.html);
    let jobs = [];

    // Strategy 1: Try structured job cards
    jobs = extractFromJobCards($, url);
    if (jobs.length > 0) {
      logger.info(`[Generic] Found ${jobs.length} jobs via card extraction`);
      return jobs;
    }

    // Strategy 2: Try job links/list items
    jobs = extractFromJobLinks($, url);
    if (jobs.length > 0) {
      logger.info(`[Generic] Found ${jobs.length} jobs via link extraction`);
      return jobs;
    }

    // Strategy 3: Try heuristic text pattern extraction
    jobs = extractFromTextPatterns($, url);
    if (jobs.length > 0) {
      logger.info(`[Generic] Found ${jobs.length} jobs via text pattern extraction`);
      return jobs;
    }

    logger.warn(`[Generic] No jobs found on ${url}`);
    return [];
  } catch (err) {
    logger.error(`[Generic] Error scraping ${url}: ${err.message}`);
    return [];
  }
}

/**
 * Strategy 1: Extract from structured job cards
 */
function extractFromJobCards($, baseUrl) {
  const jobs = [];

  for (const selector of JOB_CARD_SELECTORS) {
    const cards = $(selector);
    if (cards.length < 2) continue; // Need at least 2 to confirm it's a list

    cards.each((_, card) => {
      const $card = $(card);
      const job = extractJobFromElement($, $card, baseUrl);
      if (job && job.title && job.title.length > 3) {
        jobs.push(normalizeJob({
          ...job,
          ats_platform: 'career_page',
        }));
      }
    });

    if (jobs.length > 0) break;
  }

  return jobs;
}

/**
 * Strategy 2: Extract from job links
 */
function extractFromJobLinks($, baseUrl) {
  const jobs = [];
  const seen = new Set();

  for (const selector of JOB_LIST_SELECTORS) {
    const links = $(selector);
    if (links.length < 2) continue;

    links.each((_, el) => {
      const $el = $(el);
      const href = resolveUrl($el.attr('href'), baseUrl);
      if (!href || seen.has(href)) return;
      seen.add(href);

      const title = $el.text().trim();
      if (!title || title.length < 3 || title.length > 200) return;

      // Filter out navigation links
      if (isNavigationLink(title)) return;

      // Try to find location near the link
      const parent = $el.parent();
      const locationEl = parent.find(LOCATION_SELECTORS.join(', ')).first();
      const location = locationEl.text().trim() || '';

      const deptEl = parent.find(DEPARTMENT_SELECTORS.join(', ')).first();
      const department = deptEl.text().trim() || '';

      const city = matchCity(location) || matchCity(title);

      jobs.push(normalizeJob({
        title: cleanTitle(title),
        source_url: href,
        location_raw: location,
        matched_city: city,
        department: department || classifyDepartment(title),
        work_type: detectWorkType(location, title),
        ats_platform: 'career_page',
      }));
    });

    if (jobs.length > 0) break;
  }

  return jobs;
}

/**
 * Strategy 3: Text pattern extraction
 * Looks for repeating patterns that look like job listings
 */
function extractFromTextPatterns($, baseUrl) {
  const jobs = [];
  const body = $('main, [role="main"], .content, #content, body');

  // Find all links with job-like titles
  body.find('a').each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const href = $el.attr('href');

    if (!text || !href || text.length < 5 || text.length > 200) return;
    if (isNavigationLink(text)) return;

    // Check if the link text looks like a job title
    if (looksLikeJobTitle(text)) {
      const resolvedUrl = resolveUrl(href, baseUrl);
      if (!resolvedUrl) return;

      // Find surrounding text for location/department
      const container = $el.closest('li, tr, div, article').first();
      const containerText = container.text();
      const city = matchCity(containerText);

      jobs.push(normalizeJob({
        title: cleanTitle(text),
        source_url: resolvedUrl,
        location_raw: '',
        matched_city: city,
        department: classifyDepartment(text),
        work_type: detectWorkType(containerText, text),
        ats_platform: 'career_page',
      }));
    }
  });

  return jobs;
}

/**
 * Extract job info from a card element
 */
function extractJobFromElement($, $card, baseUrl) {
  // Find title
  let title = '';
  for (const sel of TITLE_SELECTORS) {
    const el = $card.find(sel).first();
    if (el.length && el.text().trim().length > 3) {
      title = el.text().trim();
      break;
    }
  }

  // Find link
  let link = $card.find('a').first().attr('href') || '';
  link = resolveUrl(link, baseUrl);

  // Find location
  let location = '';
  for (const sel of LOCATION_SELECTORS) {
    const el = $card.find(sel).first();
    if (el.length) {
      location = el.text().trim();
      break;
    }
  }

  // Find department
  let department = '';
  for (const sel of DEPARTMENT_SELECTORS) {
    const el = $card.find(sel).first();
    if (el.length) {
      department = el.text().trim();
      break;
    }
  }

  if (!title) return null;

  return {
    title: cleanTitle(title),
    source_url: link || baseUrl,
    location_raw: location,
    matched_city: matchCity(location) || matchCity($card.text()),
    department: department || classifyDepartment(title),
    work_type: detectWorkType(location, title, $card.text()),
  };
}

// ─── Utilities ────────────────────────────────────────

function resolveUrl(href, baseUrl) {
  if (!href) return null;
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return null;
  }
}

function cleanTitle(title) {
  return title
    .replace(/\s+/g, ' ')
    .replace(/[\n\r\t]/g, ' ')
    .replace(/^(apply|view|see|open)\s+(for\s+)?/i, '')
    .trim();
}

function isNavigationLink(text) {
  const navWords = [
    'home', 'about', 'contact', 'login', 'sign up', 'register',
    'blog', 'news', 'press', 'privacy', 'terms', 'cookie',
    'facebook', 'twitter', 'linkedin', 'instagram', 'youtube',
    'back to', 'view all', 'see all', 'show more', 'load more',
    'menu', 'close', 'search', 'filter',
  ];
  const t = text.toLowerCase().trim();
  return t.length < 3 || navWords.some(w => t === w || t.startsWith(w + ' '));
}

function looksLikeJobTitle(text) {
  const jobKeywords = [
    'engineer', 'developer', 'designer', 'manager', 'analyst',
    'architect', 'lead', 'director', 'specialist', 'coordinator',
    'consultant', 'associate', 'executive', 'officer', 'scientist',
    'researcher', 'strategist', 'planner', 'writer', 'editor',
    'intern', 'trainee', 'head of', 'vp of', 'chief',
    'frontend', 'backend', 'fullstack', 'devops', 'sre',
    'product', 'marketing', 'sales', 'support', 'success',
    'qa', 'testing', 'security', 'data', 'ml', 'ai',
  ];
  const t = text.toLowerCase();
  return jobKeywords.some(k => t.includes(k));
}

module.exports = { scrape, platform: 'career_page' };
