/**
 * Generic Career Page Scraper — LLM-Powered
 *
 * Pipeline:
 * 1. Render the career page DOM via Playwright (browser-pool)
 * 2. Strip noise: script, style, svg, footer, header, nav, cookie banners, tracking elements
 * 3. Convert the cleaned DOM into compact Markdown
 * 4. Send the Markdown to Ollama (Qwen 7B) for structured job extraction
 * 5. Normalize and return the extracted jobs
 */
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const browserPool = require('../utils/browser-pool');
const logger = require('../utils/logger');
const { normalizeJob, classifyDepartment, detectWorkType, matchCity } = require('../utils/normalizer');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct';
const OLLAMA_TIMEOUT = parseInt(process.env.OLLAMA_TIMEOUT) || 180000; // 3 minutes

// ─── Noise selectors to strip from the DOM ────────────
const NOISE_SELECTORS = [
  // Scripts & styles
  'script', 'style', 'noscript',
  // SVG & canvas
  'svg', 'canvas',
  // Structural chrome
  'footer', 'header', 'nav',
  // Cookie banners & consent managers
  '[class*="cookie"]', '[class*="consent"]', '[class*="gdpr"]',
  '[id*="cookie"]', '[id*="consent"]', '[id*="gdpr"]',
  '[class*="CookieBanner"]', '[class*="cookie-banner"]',
  '[class*="cookie-notice"]', '[class*="cookie-popup"]',
  // Tracking & analytics
  '[class*="tracking"]', '[class*="analytics"]',
  '[class*="gtm-"]', '[class*="ga-"]',
  'iframe[src*="google"]', 'iframe[src*="facebook"]',
  'iframe[src*="doubleclick"]', 'iframe[src*="analytics"]',
  // Chat widgets & popups
  '[class*="chat-widget"]', '[class*="chatbot"]',
  '[class*="intercom"]', '[class*="crisp"]', '[class*="zendesk"]',
  '[class*="drift"]', '[class*="hubspot"]',
  '[id*="intercom"]', '[id*="crisp"]',
  // Social sharing & newsletter
  '[class*="social-share"]', '[class*="newsletter"]',
  '[class*="subscribe"]',
  // Ads
  '[class*="advertisement"]', '[class*="ad-banner"]',
  '[class*="ad-slot"]', 'ins.adsbygoogle',
  // Hidden & decorative
  '[aria-hidden="true"]', '[style*="display:none"]', '[style*="display: none"]',
  // Images & media (we only care about text)
  'img', 'video', 'audio', 'picture', 'source',
  // Forms that aren't relevant
  'form:not([class*="search"])',
];

/**
 * Scrape a generic career page using LLM extraction
 */
async function scrape(url, options = {}) {
  logger.info(`[Generic] Scraping career page: ${url}`);

  try {
    // Step 1: Render the page with Playwright
    const html = await renderPage(url, options);
    if (!html) {
      logger.warn(`[Generic] Failed to render ${url}`);
      return [];
    }

    // Step 2: Strip noise and convert to Markdown
    const markdown = htmlToCleanMarkdown(html, url);
    if (!markdown || markdown.trim().length < 50) {
      logger.warn(`[Generic] Page content too short after cleaning: ${url}`);
      return [];
    }

    logger.info(`[Generic] Cleaned markdown: ${markdown.length} chars from ${url}`);

    // Save markdown to temp-markdown folder
    // try {
    //   const tempDir = path.resolve(__dirname, '../../temp-markdown');
    //   if (!fs.existsSync(tempDir)) {
    //     fs.mkdirSync(tempDir, { recursive: true });
    //   }
    //   let fileName = options.companyName ? options.companyName.replace(/[^a-z0-9]/gi, '_').toLowerCase() : new URL(url).hostname.replace(/[^a-z0-9]/gi, '_');
    //   const filePath = path.join(tempDir, `${fileName}.md`);
    //   fs.writeFileSync(filePath, markdown);
    //   logger.info(`[Generic] Saved markdown to ${filePath}`);
    // } catch (fsErr) {
    //   logger.warn(`[Generic] Failed to save markdown file: ${fsErr.message}`);
    // }

    // Step 3: Send to Ollama for job extraction
    const rawJobs = await extractJobsWithLLM(markdown, url);
    if (!rawJobs || rawJobs.length === 0) {
      logger.warn(`[Generic] LLM found no jobs on ${url}`);
      return [];
    }

    // Step 4: Normalize the extracted jobs
    const jobs = rawJobs.map(job => normalizeJob({
      title: job.title || '',
      source_url: resolveUrl(job.url, url) || url,
      location_raw: job.location || '',
      matched_city: matchCity(job.location || ''),
      department: job.department || classifyDepartment(job.title || ''),
      work_type: job.work_type || detectWorkType(job.location || '', job.title || ''),
      ats_platform: 'career_page',
    }));

    logger.info(`[Generic] Extracted ${jobs.length} jobs via LLM from ${url}`);
    return jobs;
  } catch (err) {
    logger.error(`[Generic] Error scraping ${url}: ${err.message}`);
    return [];
  }
}

// ─── Step 1: Render the page with Playwright ──────────

async function renderPage(url, options = {}) {
  try {
    return await browserPool.withPage(async (page) => {
      // Random human-like delay
      await new Promise(r => setTimeout(r, 300 + Math.random() * 700));

      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: options.timeout || 30000,
      });

      // Wait for job-related content to appear
      await page.waitForSelector(
        '[class*="job"], [class*="position"], [class*="opening"], [class*="career"], [class*="listing"], main, article, [role="main"]',
        { timeout: 10000 }
      ).catch(() => { });

      // Scroll to load lazy content
      await autoScroll(page);

      return await page.content();
    }, { timeout: options.timeout || 30000 });
  } catch (err) {
    logger.error(`[Generic] Playwright render failed for ${url}: ${err.message}`);
    return null;
  }
}

async function autoScroll(page, maxScrolls = 5) {
  let previousHeight = 0;
  let scrollCount = 0;
  while (scrollCount < maxScrolls) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break;
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    scrollCount++;
  }
}

// ─── Step 2: Strip noise & convert to Markdown ───────

function htmlToCleanMarkdown(html, baseUrl) {
  const $ = cheerio.load(html);

  // Remove all noise elements
  for (const selector of NOISE_SELECTORS) {
    try {
      $(selector).remove();
    } catch {
      // Some selectors might fail on malformed HTML, skip
    }
  }

  // Remove empty elements
  $('*').each((_, el) => {
    const $el = $(el);
    if (!$el.text().trim() && !$el.find('a').length) {
      $el.remove();
    }
  });

  // Target the main content area
  const mainContent = $('main, [role="main"], #content, .content, [class*="career"], [class*="job"], [class*="opening"], [class*="position"]').first();
  const root = mainContent.length ? mainContent : $('body');

  // Convert to markdown
  const lines = [];
  convertNodeToMarkdown(root, lines, $, baseUrl);

  // Deduplicate and clean the lines
  let markdown = lines
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .join('\n');

  // Collapse multiple blank lines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  // Truncate to avoid overwhelming the LLM (keep first ~8000 chars)
  const MAX_CHARS = 8000;
  if (markdown.length > MAX_CHARS) {
    markdown = markdown.substring(0, MAX_CHARS) + '\n\n[... content truncated ...]';
  }

  return markdown;
}

/**
 * Recursively convert DOM nodes to Markdown text
 */
function convertNodeToMarkdown(node, lines, $, baseUrl) {
  if (!node || !node.length) return;

  node.contents().each((_, child) => {
    if (child.type === 'text') {
      const text = $(child).text().trim();
      if (text) {
        lines.push(text);
      }
      return;
    }

    if (child.type !== 'tag') return;

    const $child = $(child);
    const tag = child.tagName?.toLowerCase();

    switch (tag) {
      case 'h1':
        lines.push(`\n# ${$child.text().trim()}`);
        break;
      case 'h2':
        lines.push(`\n## ${$child.text().trim()}`);
        break;
      case 'h3':
        lines.push(`\n### ${$child.text().trim()}`);
        break;
      case 'h4':
      case 'h5':
      case 'h6':
        lines.push(`\n#### ${$child.text().trim()}`);
        break;
      case 'a': {
        const href = $child.attr('href');
        const text = $child.text().trim();
        if (text && href) {
          const resolved = resolveUrl(href, baseUrl);
          lines.push(`[${text}](${resolved || href})`);
        } else if (text) {
          lines.push(text);
        }
        break;
      }
      case 'li':
        lines.push(`- ${$child.text().trim()}`);
        break;
      case 'br':
        lines.push('');
        break;
      case 'p':
      case 'div':
      case 'section':
      case 'article':
      case 'span':
      case 'td':
      case 'th':
      case 'tr':
      case 'ul':
      case 'ol':
      case 'dl':
      case 'dt':
      case 'dd':
      case 'main':
      case 'aside':
      case 'table':
      case 'tbody':
      case 'thead':
        convertNodeToMarkdown($child, lines, $, baseUrl);
        break;
      default:
        // For unknown tags, just recurse
        convertNodeToMarkdown($child, lines, $, baseUrl);
        break;
    }
  });
}

// ─── Step 3: LLM-based job extraction ─────────────────

async function extractJobsWithLLM(markdown, pageUrl) {
  const prompt = buildExtractionPrompt(markdown, pageUrl);

  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 8192,
        },
      },
      {
        timeout: OLLAMA_TIMEOUT,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const raw = response.data.response || '';
    return parseExtractionResponse(raw);
  } catch (err) {
    logger.error(`[Generic] Ollama extraction failed: ${err.message}`);
    return [];
  }
}

function buildExtractionPrompt(markdown, pageUrl) {
  return `/no_think
You are a job listing extractor. Below is the cleaned text content of a company career page.

Your task: Extract ALL individual job postings from this content.

For each job, extract:
- "title": The exact job title (e.g. "Senior Software Engineer", "Product Manager")
- "url": The direct link/URL to the job posting if visible, otherwise empty string ""
- "location": The job location if mentioned (e.g. "Bangalore", "Remote", "Mumbai, India")
- "department": The department or team if mentioned (e.g. "Engineering", "Marketing")
- "work_type": One of "remote", "hybrid", "onsite", or "" if unclear

RULES:
1. Only extract ACTUAL job postings with specific role titles
2. DO NOT extract: page titles, navigation items, section headers, company descriptions, or generic text
3. DO NOT extract entries like "View All Jobs", "Apply Now", "About Us", "Our Culture", etc.
4. If a department header groups multiple jobs, assign that department to each job under it
5. If no jobs are found, return an empty array []

PAGE URL: ${pageUrl}

CAREER PAGE CONTENT:
${markdown}

Respond with ONLY a JSON array. No explanation, no markdown code blocks.
Example: [{"title":"Software Engineer","url":"https://example.com/jobs/123","department":"Engineering","work_type":"remote","experience_min":"2","experience_max":"4","salary_min":"1000000","salary_max":"1500000"}]

JSON:`;
}

function parseExtractionResponse(responseText) {
  let cleaned = responseText.trim();

  // Strip markdown code blocks
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '');
  cleaned = cleaned.trim();

  // Try to find JSON array in the response
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!arrayMatch) {
    logger.warn('[Generic] No JSON array found in LLM response');
    logger.debug(`[Generic] Raw LLM response: ${cleaned.substring(0, 500)}`);
    return [];
  }

  try {
    const parsed = JSON.parse(arrayMatch[0]);
    if (!Array.isArray(parsed)) return [];

    // Validate and filter each job entry
    return parsed.filter(job => {
      if (!job || typeof job !== 'object') return false;
      if (!job.title || typeof job.title !== 'string') return false;

      const title = job.title.trim();
      // Filter obvious non-jobs
      if (title.length < 3 || title.length > 200) return false;
      if (/^(apply|view|see|learn|read|click|submit|sign|log)/i.test(title)) return false;

      return true;
    });
  } catch (err) {
    logger.warn(`[Generic] Failed to parse LLM extraction response: ${err.message}`);
    logger.debug(`[Generic] Attempted to parse: ${arrayMatch[0].substring(0, 500)}`);
    return [];
  }
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

module.exports = { scrape, platform: 'career_page' };