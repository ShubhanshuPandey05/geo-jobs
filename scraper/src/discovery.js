/**
 * Career Page Discovery System
 * Finds career/jobs pages from a company website
 * Parses: sitemap.xml, robots.txt, common URL patterns
 */
const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('./utils/logger');

// Common career page URL patterns
const CAREER_PATHS = [
  '/careers', '/jobs', '/join-us', '/work-with-us',
  '/openings', '/positions', '/hiring', '/opportunities',
  '/career', '/join', '/team', '/life-at',
  '/about/careers', '/company/careers', '/company/jobs',
  '/en/careers', '/in/careers',
];

const CAREER_KEYWORDS = [
  'career', 'careers', 'job', 'jobs', 'opening', 'openings',
  'position', 'positions', 'hiring', 'join us', 'work with us',
  'opportunities', 'vacancies', 'recruitment',
];

/**
 * Discover career page URL from a company website
 */
async function discoverCareerPage(websiteUrl) {
  if (!websiteUrl) return null;

  const baseUrl = normalizeBaseUrl(websiteUrl);
  logger.info(`[Discovery] Searching for career page: ${baseUrl}`);

  // Strategy 1: Try common career URL patterns
  const commonResult = await tryCommonPaths(baseUrl);
  if (commonResult) {
    logger.info(`[Discovery] Found via common path: ${commonResult}`);
    return commonResult;
  }

  // Strategy 2: Parse sitemap.xml
  const sitemapResult = await parseSitemap(baseUrl);
  if (sitemapResult) {
    logger.info(`[Discovery] Found via sitemap: ${sitemapResult}`);
    return sitemapResult;
  }

  // Strategy 3: Crawl homepage for career links
  const crawlResult = await crawlForCareerLinks(baseUrl);
  if (crawlResult) {
    logger.info(`[Discovery] Found via homepage crawl: ${crawlResult}`);
    return crawlResult;
  }

  logger.warn(`[Discovery] No career page found for ${baseUrl}`);
  return null;
}

/**
 * Try common career page URL patterns
 */
async function tryCommonPaths(baseUrl) {
  for (const path of CAREER_PATHS) {
    const url = `${baseUrl}${path}`;
    try {
      const response = await axios.head(url, {
        timeout: 8000,
        maxRedirects: 3,
        validateStatus: (s) => s >= 200 && s < 400,
        headers: { 'User-Agent': 'GeoJobs-Discovery/2.0' },
      });
      // Check if it's a real page (not just a redirect to homepage)
      const finalUrl = response.request?.res?.responseUrl || url;
      if (finalUrl !== baseUrl && finalUrl !== `${baseUrl}/`) {
        return finalUrl;
      }
    } catch {
      // Path doesn't exist, continue
    }
  }
  return null;
}

/**
 * Parse sitemap.xml for career-related URLs
 */
async function parseSitemap(baseUrl) {
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemap-index.xml`,
  ];

  for (const sitemapUrl of sitemapUrls) {
    try {
      const { data } = await axios.get(sitemapUrl, {
        timeout: 8000,
        headers: { 'User-Agent': 'GeoJobs-Discovery/2.0' },
      });

      const $ = cheerio.load(data, { xmlMode: true });
      const urls = [];

      $('url loc, sitemap loc').each((_, el) => {
        urls.push($(el).text().trim());
      });

      // Find career-related URLs
      const careerUrl = urls.find(u => {
        const lowerUrl = u.toLowerCase();
        return CAREER_KEYWORDS.some(k => lowerUrl.includes(k));
      });

      if (careerUrl) return careerUrl;
    } catch {
      // Sitemap not found, continue
    }
  }
  return null;
}

/**
 * Crawl the homepage to find career page links
 */
async function crawlForCareerLinks(baseUrl) {
  try {
    const { data: html } = await axios.get(baseUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'GeoJobs-Discovery/2.0',
        'Accept': 'text/html',
      },
    });

    const $ = cheerio.load(html);
    const candidates = [];

    // Look for links with career-related text or URLs
    $('a').each((_, el) => {
      const $el = $(el);
      const href = $el.attr('href') || '';
      const text = $el.text().toLowerCase().trim();

      const fullUrl = resolveUrl(href, baseUrl);
      if (!fullUrl) return;

      // Score the link
      let score = 0;
      const lowerHref = href.toLowerCase();

      if (CAREER_KEYWORDS.some(k => text.includes(k))) score += 3;
      if (CAREER_KEYWORDS.some(k => lowerHref.includes(k))) score += 2;

      // Penalty for external links
      if (!fullUrl.startsWith(baseUrl)) score -= 5;

      if (score > 0) {
        candidates.push({ url: fullUrl, score, text });
      }
    });

    // Return highest scoring candidate
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0]?.url || null;
  } catch {
    return null;
  }
}

function normalizeBaseUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return url.replace(/\/+$/, '');
  }
}

function resolveUrl(href, baseUrl) {
  if (!href) return null;
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return null;
  }
}

module.exports = { discoverCareerPage };
