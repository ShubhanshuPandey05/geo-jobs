/**
 * Companies Career URL Scraper
 *
 * Takes the companies array from ./companies.js, loops over each company,
 * uses the Gemini API to suggest likely career page URLs based on the
 * company website, validates each candidate by checking for HTTP 200,
 * and writes the results to ./companiesCareerUrl.js.
 *
 * Companies without a discoverable career page are excluded from the output.
 *
 * Usage: node src/scrapers/companiesScraper.js
 *        npm run discover:careers
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const companies = require('./companies');
const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")

const responseSchema = z.object({
  companyName: z.string().describe("Company Name"),
  website: z.string().url().describe("Company website"),
  careerPage: z.boolean().describe("Whether the company has a careers/jobs page"),
  careerUrl: z.string().url().nullable().describe("Official careers page URL if one exists, otherwise null"),
});
const groundingTool = {
  googleSearch: {},
};


// ── Config ────────────────────────────────────────────────────────────
const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_MODEL_PATH = GEMINI_MODEL.startsWith('models/') ? GEMINI_MODEL : `models/${GEMINI_MODEL}`;
const REQUEST_TIMEOUT = parseInt(process.env.CAREER_DISCOVERY_TIMEOUT_MS) || 30000;
const VALIDATE_TIMEOUT = 10000; // 10s for URL validation
const RATE_LIMIT_MS = 1500;     // Delay between companies to be polite
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


// ── Main ──────────────────────────────────────────────────────────────
async function discoverCareerUrls() {
  logger.info('═'.repeat(60));
  logger.info('Career URL Discovery — Gemini + Validation');
  logger.info(`Time:      ${new Date().toISOString()}`);
  logger.info(`Companies: ${companies.length}`);
  logger.info(`Model:     ${GEMINI_MODEL}`);
  logger.info('═'.repeat(60));

  // Check Gemini API
  const geminiReady = await checkGemini();
  if (!geminiReady) {
    logger.error('❌ Gemini API is not reachable. Check your API key and try again.');
    process.exit(1);
  }

  const results = [];
  let found = 0;
  let notFound = 0;

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const progress = `[${i + 1}/${companies.length}]`;

    logger.info('');
    logger.info(`${progress} ${company.name} — ${company.website}`);

    try {
      const careerUrl = await findCareerUrl(company);

      if (careerUrl) {
        found++;
        logger.info(`  ✅ Career URL: ${careerUrl}`);
        results.push({
          ...company,
          career_url: careerUrl,
        });
      } else {
        notFound++;
        logger.info(`  ⬜ No career page found — skipping`);
      }
    } catch (err) {
      notFound++;
      logger.error(`  ❌ Error: ${err.message}`);
    }

    // Rate limiting
    if (i < companies.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  // ── Write results ───────────────────────────────────────────────────
  const outputPath = path.join(__dirname, 'companiesCareerUrl.js');
  writeResults(outputPath, results);

  // ── Summary ─────────────────────────────────────────────────────────
  logger.info('');
  logger.info('═'.repeat(60));
  logger.info('DISCOVERY COMPLETE');
  logger.info('═'.repeat(60));
  logger.info(`  Total companies:  ${companies.length}`);
  logger.info(`  Career URL found: ${found}`);
  logger.info(`  Not found:        ${notFound}`);
  logger.info(`  Output file:      ${outputPath}`);
  logger.info('═'.repeat(60));
}

// ── Find Career URL for a Single Company ──────────────────────────────
async function findCareerUrl(company) {
  // Step 1: Ask Gemini for likely career page URLs
  const careerUrl = await askGeminiForCareerUrl(company);

  if (!careerUrl) {
    logger.info(`  🤖 Gemini says they have no career page`);
    return null;
  }

  logger.info(`  🤖 Gemini Returns ${careerUrl}`);

  // Step 2: Validate career URL by checking HTTP status

    const isValid = await validateUrl(careerUrl);
    if (isValid) {
      return careerUrl;
    }
    logger.info(`  ❌ ${url} — failed validation`);

  return null;
}

// ── Gemini: Ask for Career Page URL ───────────────────────────────────
async function askGeminiForCareerUrl(company) {
const prompt = `
You are a career page discovery agent.

Company: ${company.name}
Website: ${company.website}

Search the web and find the official careers page.

Rules:
- Do not guess
- Use only the company domain or ATS domains
- If no careers page exists return null

Return JSON only:

{
  "careerUrl": "https://..."
}
`;

  try {
    const geminiRequest = {
      // model: "gemini-2.5-flash",
      model: "gemini-3.1-flash-live-preview",
      contents : prompt,
      config: {
        temperature: 0.2,
        // responseMimeType: "application/json",
        // responseJsonSchema: zodToJsonSchema(responseSchema),
        
        systemInstruction: prompt,
        tools: [groundingTool],
      },
    };
    let response = await genAI.models.generateContent(geminiRequest);
    // console.log("response:-", response)
    const candidate = response.candidates[0];
    const url = candidate.content.parts[0]?.text;
    console.log(url)
    return parseGeminiCareerUrl(url);

  } catch (err) {
    logger.warn(`  🤖 Gemini request failed: ${err.message}`);
    // Fallback: generate common career URL patterns manually
    return false
  }
}

// ── Parse Gemini Career URL Response ────────────────────────────────
function parseGeminiCareerUrl(responseText) {
  let cleaned = responseText.trim();

  // Remove markdown code fences
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");
  cleaned = cleaned.trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (
      typeof parsed.careerUrl === "string" &&
      parsed.careerUrl.startsWith("http")
    ) {
      return parsed.careerUrl;
    }

    return null;
  } catch {
    return null;
  }
}

// ── Validate URL (HTTP 200 check) ─────────────────────────────────────
async function validateUrl(url) {
  try {
    const response = await axios.get(url, {
      timeout: VALIDATE_TIMEOUT,
      maxRedirects: 5,
      validateStatus: () => true, // Don't throw on any status
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    const status = response.status;

    // Must be 200 (success)
    if (status !== 200) {
      logger.debug(`  ↳ ${url} returned status ${status}`);
      return false;
    }

    // Extra check: make sure the page has some content and isn't a generic redirect
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      logger.debug(`  ↳ ${url} is not HTML (${contentType})`);
      return false;
    }

    // Check body has some minimum content (not empty page or error page)
    const body = typeof response.data === 'string' ? response.data : '';
    if (body.length < 500) {
      logger.debug(`  ↳ ${url} has too little content (${body.length} bytes)`);
      return false;
    }

    return true;
  } catch (err) {
    logger.debug(`  ↳ ${url} request error: ${err.message}`);
    return false;
  }
}

// ── Write Results to File ─────────────────────────────────────────────
function writeResults(outputPath, results) {
  const fileContent = `/**
 * Companies with discovered career page URLs
 * Auto-generated by companiesScraper.js on ${new Date().toISOString()}
 * Total: ${results.length} companies
 */
const companiesWithCareerUrls = ${JSON.stringify(results, null, 2)};

module.exports = companiesWithCareerUrls;
`;

  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  logger.info(`\n📄 Results written to: ${outputPath}`);
}

// ── Gemini Health Check ───────────────────────────────────────────────
async function checkGemini() {
  if (!GEMINI_API_KEY) {
    logger.error('❌ GEMINI_API_KEY is not set.');
    return false;
  }

  try {
    const response = await axios.get(
      `${GEMINI_API_URL}/models?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      { timeout: 5000 }
    );
    const models = response.data?.models || [];
    const modelNames = models.map(m => m.name).filter(Boolean);
    const hasModel = modelNames.some(name => name === GEMINI_MODEL_PATH || name.endsWith(`/${GEMINI_MODEL}`));

    if (hasModel) {
      logger.info(`✅ Gemini ready — model "${GEMINI_MODEL}" found`);
    } else {
      logger.warn(`⚠️  Gemini reachable but model "${GEMINI_MODEL}" not found`);
      if (modelNames.length > 0) {
        const preview = modelNames.slice(0, 10).join(', ');
        const more = modelNames.length > 10 ? ' ...' : '';
        logger.warn(`   Available: ${preview}${more}`);
      }
    }
    return true; // Gemini is reachable even if model might need enabling
  } catch (err) {
    logger.error(`❌ Gemini API check failed: ${err.message}`);
    return false;
  }
}

// ── Utilities ─────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Entry Point ───────────────────────────────────────────────────────
if (require.main === module) {
  discoverCareerUrls()
    .then(() => {
      logger.info('Career URL discovery finished.');
      process.exit(0);
    })
    .catch(err => {
      logger.error(`Fatal error: ${err.message}`);
      process.exit(1);
    });
}

module.exports = { discoverCareerUrls };