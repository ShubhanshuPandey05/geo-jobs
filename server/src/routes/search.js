const express = require('express');
const router = express.Router();
const meili = require('../config/meilisearch');
const { JOBS_INDEX, COMPANIES_INDEX } = require('../services/meiliSync');

/**
 * GET /api/search?q=react+developer&city=Bangalore&work_type=remote&type=all
 *
 * Unified search powered by Meilisearch — instant, typo-tolerant, fuzzy.
 * 
 * Query params:
 *   q          – search query (required, min 1 char)
 *   city       – filter by city
 *   work_type  – filter by work type (remote/hybrid/onsite)
 *   type       – "jobs" | "companies" | "all" (default: "all")
 *   page       – pagination page (default: 1)
 *   limit      – results per page (default: 25)
 *   sort       – sort by field (e.g. "posted_at:desc")
 */
router.get('/', async (req, res) => {
  try {
    const {
      q,
      city,
      work_type,
      type = 'all',
      page = 1,
      limit = 25,
      sort,
    } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Search query (q) is required' });
    }

    const searchLimit = Math.min(Number(limit), 100);
    const searchOffset = (Math.max(Number(page), 1) - 1) * searchLimit;

    // Build Meilisearch filter array
    const jobFilters = ['is_active = true'];
    const companyFilters = [];

    if (city) {
      jobFilters.push(`city = "${city}"`);
      companyFilters.push(`city = "${city}"`);
    }
    if (work_type) {
      jobFilters.push(`work_type = "${work_type}"`);
    }

    const response = { query: q, page: Number(page), limit: searchLimit };

    // Search jobs
    if (type === 'all' || type === 'jobs') {
      const jobsResult = await meili.index(JOBS_INDEX).search(q.trim(), {
        limit: searchLimit,
        offset: searchOffset,
        filter: jobFilters.length > 0 ? jobFilters.join(' AND ') : undefined,
        sort: sort ? [sort] : ['posted_at:desc'],
        attributesToHighlight: ['title', 'company_name', 'department'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        showMatchesPosition: true,
      });

      response.jobs = {
        data: jobsResult.hits,
        total: jobsResult.estimatedTotalHits,
        processingTimeMs: jobsResult.processingTimeMs,
      };
    }

    // Search companies
    if (type === 'all' || type === 'companies') {
      const companiesResult = await meili.index(COMPANIES_INDEX).search(q.trim(), {
        limit: type === 'all' ? 10 : searchLimit,  // fewer company results in "all" mode
        offset: type === 'all' ? 0 : searchOffset,
        filter: companyFilters.length > 0 ? companyFilters.join(' AND ') : undefined,
        sort: sort ? [sort] : ['job_count:desc'],
        attributesToHighlight: ['name', 'industry', 'description'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
      });

      response.companies = {
        data: companiesResult.hits,
        total: companiesResult.estimatedTotalHits,
        processingTimeMs: companiesResult.processingTimeMs,
      };
    }

    res.json(response);
  } catch (err) {
    console.error('Search error:', err);

    // Fallback messaging if Meilisearch is unreachable
    if (err.code === 'ECONNREFUSED' || err.type === 'MeiliSearchCommunicationError') {
      return res.status(503).json({
        error: 'Search service is starting up. Please try again in a moment.',
      });
    }

    res.status(500).json({ error: 'Search failed' });
  }
});

/**
 * GET /api/search/suggest?q=rea
 *
 * Lightweight autocomplete endpoint — returns just titles and company names
 * for fast dropdown suggestions while the user types.
 */
router.get('/suggest', async (req, res) => {
  try {
    const { q, city } = req.query;
    if (!q || q.trim().length === 0) {
      return res.json({ suggestions: [] });
    }

    const filters = ['is_active = true'];
    if (city) filters.push(`city = "${city}"`);

    const [jobResults, companyResults] = await Promise.all([
      meili.index(JOBS_INDEX).search(q.trim(), {
        limit: 6,
        attributesToRetrieve: ['id', 'title', 'company_name', 'company_id', 'company_slug', 'city', 'work_type'],
        filter: filters.join(' AND '),
      }),
      meili.index(COMPANIES_INDEX).search(q.trim(), {
        limit: 4,
        attributesToRetrieve: ['id', 'name', 'slug', 'logo_url', 'industry', 'job_count'],
      }),
    ]);

    res.json({
      suggestions: {
        jobs: jobResults.hits,
        companies: companyResults.hits,
      },
      processingTimeMs: Math.max(jobResults.processingTimeMs, companyResults.processingTimeMs),
    });
  } catch (err) {
    console.error('Suggest error:', err);
    res.json({ suggestions: { jobs: [], companies: [] } });
  }
});

/**
 * POST /api/search/sync
 *
 * Triggers a full re-sync from Postgres → Meilisearch.
 * Useful after a scrape run finishes.
 */
router.post('/sync', async (req, res) => {
  try {
    const { fullSync } = require('../services/meiliSync');
    const result = await fullSync();
    res.json({ status: 'ok', ...result });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Sync failed', message: err.message });
  }
});

module.exports = router;
