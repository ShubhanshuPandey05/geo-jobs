/**
 * AI Validation Service — Ollama Integration
 * 
 * Validates scraped job posts using a local Ollama LLM (qwen3:8b).
 * Filters out noisy data (nav links, blog posts, non-job content)
 * and assigns a confidence score to each real job posting.
 * 
 * Design:
 * - One request per company (batch all non-ATS jobs together)
 * - Jobs are sent as JSON (no raw HTML)
 * - Graceful fallback if Ollama is unavailable
 */
const axios = require('axios');
const logger = require('../utils/logger');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct';
const CONFIDENCE_THRESHOLD = parseFloat(process.env.AI_CONFIDENCE_THRESHOLD) || 0.6;
const OLLAMA_TIMEOUT = parseInt(process.env.OLLAMA_TIMEOUT) || 120000; // 2 minutes

/**
 * Validate a batch of jobs using the AI model.
 * 
 * @param {Array} jobs — Array of job objects from generic/career page scraping
 * @param {string} companyName — Company name for context
 * @returns {Array} — Filtered jobs with ai_confidence scores attached
 */
async function validateJobs(jobs, companyName) {
  if (!jobs || jobs.length === 0) {
    return [];
  }

  logger.info(`[AI] Validating ${jobs.length} jobs for "${companyName}" using ${OLLAMA_MODEL}...`);

  // Prepare a lightweight payload (only fields the model needs to judge)
  const jobSummaries = jobs.map((job, index) => ({
    index,
    title: job.title || '',
    source_url: job.source_url || '',
    department: job.department || '',
    work_type: job.work_type || '',
    location: job.location_raw || job.matched_city || '',
  }));

  const prompt = buildPrompt(jobSummaries, companyName);

  try {
    const response = await callOllama(prompt);
    const validatedResults = parseResponse(response, jobs.length);

    // Merge AI results back into jobs
    const validatedJobs = [];
    for (let i = 0; i < jobs.length; i++) {
      const result = validatedResults[i];
      if (!result) continue;

      if (result.is_valid && result.confidence >= CONFIDENCE_THRESHOLD) {
        validatedJobs.push({
          ...jobs[i],
          ai_confidence: result.confidence,
          ai_is_active: result.is_active !== false, // default to true
        });
      } else {
        logger.debug(
          `[AI] Filtered out: "${jobs[i].title}" (confidence: ${result.confidence}, valid: ${result.is_valid})`
        );
      }
    }

    logger.info(
      `[AI] ${companyName}: ${validatedJobs.length}/${jobs.length} jobs passed validation (threshold: ${CONFIDENCE_THRESHOLD})`
    );

    return validatedJobs;
  } catch (err) {
    logger.warn(`[AI] Ollama validation failed for "${companyName}": ${err.message}`);
    logger.warn(`[AI] Falling back — passing all ${jobs.length} jobs through without AI validation`);

    // Graceful fallback: pass everything through with null confidence
    return jobs.map(job => ({
      ...job,
      ai_confidence: null,
      ai_is_active: true,
    }));
  }
}

/**
 * Build the prompt for the AI model
 */
function buildPrompt(jobSummaries, companyName) {
  return `/no_think
You are a job listing validator. Analyze the following scraped data from "${companyName}" career/jobs page and determine which entries are REAL job postings vs noise (navigation links, blog posts, contact pages, generic website content, etc).

For each entry, respond with:
- "is_valid": true if it's a real job posting, false if it's noise
- "confidence": a score from 0.0 to 1.0 indicating how confident you are
- "is_active": true if the job appears to be currently active/open, false if it seems closed/expired

IMPORTANT RULES:
1. A real job posting has a specific role title (e.g. "Senior Software Engineer", "Product Manager")
2. Generic text like "Join Our Team", "About Us", "Contact", "View All Jobs" are NOT job postings

INPUT (JSON array):
${JSON.stringify(jobSummaries, null, 2)}

OUTPUT FORMAT (JSON array — same length as input, same order):
[
  { "index": 0, "is_valid": true, "confidence": 0.95, "is_active": true },
  { "index": 1, "is_valid": false, "confidence": 0.1, "is_active": false },
  ...
]

Respond ONLY with the JSON array, no explanation.`;
}

/**
 * Call Ollama API
 */
async function callOllama(prompt) {
  const response = await axios.post(
    `${OLLAMA_URL}/api/generate`,
    {
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0.1, // Low temp for consistent, factual responses
        num_predict: 4096,
      },
    },
    {
      timeout: OLLAMA_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data.response || '';
}

/**
 * Parse the AI model's JSON response
 * Handles edge cases like markdown code blocks, partial responses, etc.
 */
function parseResponse(responseText, expectedCount) {
  // Strip markdown code blocks if present
  let cleaned = responseText.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '');
  cleaned = cleaned.trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      logger.warn('[AI] Response is not an array, creating default results');
      return createDefaultResults(expectedCount);
    }

    // Build a lookup by index for safety
    const resultMap = {};
    for (const item of parsed) {
      if (typeof item.index === 'number') {
        resultMap[item.index] = {
          is_valid: item.is_valid === true,
          confidence: typeof item.confidence === 'number' ? Math.min(1, Math.max(0, item.confidence)) : 0.5,
          is_active: item.is_active !== false,
        };
      }
    }

    // Ensure we have results for all indices
    const results = [];
    for (let i = 0; i < expectedCount; i++) {
      results.push(resultMap[i] || { is_valid: true, confidence: 0.5, is_active: true });
    }

    return results;
  } catch (err) {
    logger.warn(`[AI] Failed to parse AI response: ${err.message}`);
    logger.debug(`[AI] Raw response: ${cleaned.substring(0, 500)}`);
    return createDefaultResults(expectedCount);
  }
}

/**
 * Default results when parsing fails — be permissive
 */
function createDefaultResults(count) {
  return Array.from({ length: count }, () => ({
    is_valid: true,
    confidence: 0.5,
    is_active: true,
  }));
}

/**
 * Check if Ollama is available
 */
async function isOllamaAvailable() {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    const models = response.data?.models || [];
    const hasModel = models.some(m => m.name?.startsWith(OLLAMA_MODEL.split(':')[0]));
    logger.info(`[AI] Ollama is ${hasModel ? 'ready' : 'available but model not found'} (${OLLAMA_URL})`);
    return hasModel;
  } catch {
    logger.warn(`[AI] Ollama is not available at ${OLLAMA_URL}`);
    return false;
  }
}

module.exports = {
  validateJobs,
  isOllamaAvailable,
  CONFIDENCE_THRESHOLD,
};
