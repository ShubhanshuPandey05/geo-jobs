/**
 * Hybrid HTTP Client
 * Step 1: Try Axios (fast, lightweight)
 * Step 2: If needs JS rendering, fallback to Playwright
 */
const axios = require('axios');
const cheerio = require('cheerio');
const browserPool = require('./browser-pool');
const logger = require('./logger');

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
];

/**
 * Detect if HTML needs JavaScript rendering
 */
function needsJSRendering(html) {
  if (!html || html.trim().length < 500) return true;

  const indicators = [
    // React / Next.js / Vue shell
    '<div id="__next"', '<div id="root"', '<div id="app"',
    'window.__NEXT_DATA__', '__NUXT__',
    // Completely empty body
    '<body></body>', '<body>\n</body>',
    // Explicit JS rendering markers
    'Loading...', 'Please enable JavaScript',
    'noscript', 'data-reactroot',
  ];

  const $ = cheerio.load(html);
  const bodyText = $('body').text().trim();

  // If body has very little text, likely needs JS
  if (bodyText.length < 100) return true;

  // Check for SPA indicators
  for (const indicator of indicators) {
    if (html.includes(indicator)) {
      // But check if there's actual content too
      const jobRelated = $('[class*="job"], [class*="position"], [class*="opening"], [class*="career"], [data-job], [data-position]').length;
      if (jobRelated === 0 && bodyText.length < 300) return true;
    }
  }

  return false;
}

/**
 * Fetch page with Axios (Step 1)
 */
async function fetchStatic(url, options = {}) {
  const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

  try {
    const response = await axios.get(url, {
      timeout: options.timeout || 15000,
      headers: {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        ...options.headers,
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 400,
    });

    return {
      html: response.data,
      url: response.config.url || url,
      status: response.status,
      method: 'static',
    };
  } catch (err) {
    logger.debug(`Static fetch failed for ${url}: ${err.message}`);
    return null;
  }
}

/**
 * Fetch page with Playwright (Step 2 — JS rendering)
 */
async function fetchDynamic(url, options = {}) {
  return browserPool.withPage(async (page) => {
    // Add random delay before navigating
    await new Promise(r => setTimeout(r, 500 + Math.random() * 1500));

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: options.timeout || 30000,
    });

    // Wait for potential lazy content
    if (options.waitForSelector) {
      await page.waitForSelector(options.waitForSelector, { timeout: 10000 }).catch(() => {});
    } else {
      // Generic wait for job-like content
      await page.waitForSelector(
        '[class*="job"], [class*="position"], [class*="opening"], [class*="career"], [class*="listing"], main, article',
        { timeout: 10000 }
      ).catch(() => {});
    }

    // Handle infinite scroll if needed
    if (options.scrollToBottom) {
      await autoScroll(page);
    }

    const html = await page.content();
    const finalUrl = page.url();

    return {
      html,
      url: finalUrl,
      status: 200,
      method: 'dynamic',
    };
  }, { timeout: options.timeout || 30000 });
}

/**
 * Auto-scroll to load all lazy content
 */
async function autoScroll(page, maxScrolls = 10) {
  let previousHeight = 0;
  let scrollCount = 0;

  while (scrollCount < maxScrolls) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break;

    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    scrollCount++;
  }
}

/**
 * Hybrid fetch — tries static first, falls back to dynamic
 */
async function hybridFetch(url, options = {}) {
  // For known API endpoints, always use static
  if (options.forceStatic || isAPIEndpoint(url)) {
    const result = await fetchStatic(url, options);
    if (result) return result;
  }

  // For known SPA sites, skip static and go dynamic
  if (options.forceDynamic) {
    logger.debug(`Using Playwright for ${url} (forced dynamic)`);
    return fetchDynamic(url, options);
  }

  // Step 1: Try static fetch
  const staticResult = await fetchStatic(url, options);
  if (staticResult) {
    // Check if the HTML needs JS rendering
    if (!needsJSRendering(staticResult.html)) {
      logger.debug(`Static fetch sufficient for ${url}`);
      return staticResult;
    }
    logger.debug(`Static fetch returned JS-dependent page for ${url}, falling back to Playwright`);
  }

  // Step 2: Fallback to Playwright
  logger.debug(`Using Playwright for ${url}`);
  return fetchDynamic(url, options);
}

function isAPIEndpoint(url) {
  return url.includes('/api/') || url.includes('boards-api.') || url.endsWith('.json');
}

module.exports = {
  hybridFetch,
  fetchStatic,
  fetchDynamic,
  needsJSRendering,
};
