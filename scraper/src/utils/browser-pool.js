/**
 * Browser Pool — Reuses Playwright browser instances
 * Avoids launching a new browser per request
 */
const { chromium } = require('playwright');
const logger = require('./logger');

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
];

const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1536, height: 864 },
];

// Blocked resource types for performance
const BLOCKED_RESOURCES = ['image', 'media', 'font', 'stylesheet'];
const BLOCKED_DOMAINS = [
  'google-analytics.com', 'googletagmanager.com', 'facebook.net',
  'doubleclick.net', 'hotjar.com', 'segment.com', 'mixpanel.com',
  'intercom.io', 'crisp.chat', 'zendesk.com',
];

class BrowserPool {
  constructor(maxBrowsers = 3) {
    this.maxBrowsers = maxBrowsers;
    this.browsers = [];
    this.contextCount = 0;
    this._launching = null;
  }

  /**
   * Get or launch a browser instance
   */
  async getBrowser() {
    // Reuse existing if under capacity
    const available = this.browsers.find(b => b.contexts().length < 5);
    if (available) return available;

    // Launch new if under max
    if (this.browsers.length < this.maxBrowsers) {
      if (this._launching) return this._launching;

      this._launching = chromium.launch({
        headless: true,
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
        ],
      });

      const browser = await this._launching;
      this._launching = null;
      this.browsers.push(browser);
      logger.info(`Browser launched (pool: ${this.browsers.length}/${this.maxBrowsers})`);
      return browser;
    }

    // All browsers at capacity, use first one anyway
    return this.browsers[0];
  }

  /**
   * Create a new context with anti-detection + performance optimizations
   */
  async createContext(options = {}) {
    const browser = await this.getBrowser();
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    const vp = VIEWPORTS[Math.floor(Math.random() * VIEWPORTS.length)];

    const context = await browser.newContext({
      userAgent: ua,
      viewport: vp,
      locale: 'en-US',
      timezoneId: 'Asia/Kolkata',
      ignoreHTTPSErrors: true,
      ...options,
    });

    // Block unnecessary resources
    await context.route('**/*', (route) => {
      const req = route.request();
      const resourceType = req.resourceType();
      const url = req.url();

      // Block heavy resource types
      if (BLOCKED_RESOURCES.includes(resourceType)) {
        return route.abort();
      }

      // Block tracking/analytics domains
      if (BLOCKED_DOMAINS.some(d => url.includes(d))) {
        return route.abort();
      }

      return route.continue();
    });

    this.contextCount++;
    return context;
  }

  /**
   * Execute a page action with a managed context + page
   */
  async withPage(fn, options = {}) {
    const context = await this.createContext(options);
    const page = await context.newPage();

    try {
      // Set default timeout
      page.setDefaultTimeout(options.timeout || 30000);
      page.setDefaultNavigationTimeout(options.timeout || 30000);

      const result = await fn(page);
      return result;
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
      this.contextCount--;
    }
  }

  /**
   * Graceful shutdown — close all browsers
   */
  async shutdown() {
    logger.info(`Shutting down browser pool (${this.browsers.length} browsers, ${this.contextCount} active contexts)`);
    for (const browser of this.browsers) {
      await browser.close().catch(() => {});
    }
    this.browsers = [];
    this.contextCount = 0;
    logger.info('Browser pool shut down');
  }
}

// Singleton pool
const pool = new BrowserPool(parseInt(process.env.MAX_BROWSERS) || 3);

// Graceful shutdown on process exit
const shutdown = async () => {
  await pool.shutdown();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = pool;
