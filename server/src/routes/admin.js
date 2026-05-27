/**
 * Admin API Routes
 * 
 * Protected endpoints for bulk data ingestion. All routes require:
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 * 
 * Endpoints:
 *   POST   /api/admin/companies/bulk            — Bulk upsert companies + offices
 *   PATCH  /api/admin/companies/bulk/locations   — Batch update office coordinates
 *   PATCH  /api/admin/companies/:id/career-url   — Update career_url for one company
 *   GET    /api/admin/companies/without-coordinates — List companies missing coords
 *   GET    /api/admin/companies/without-career-url  — List companies missing career_url
 *   GET    /api/admin/companies/with-career-url     — List companies that have career_url
 *   POST   /api/admin/jobs/bulk                  — Bulk insert jobs + Meilisearch index
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');
const meili = require('../config/meilisearch');
const { JOBS_INDEX, COMPANIES_INDEX, indexJob } = require('../services/meiliSync');

// All admin routes require auth
router.use(adminAuth);

// ─── Helper: slugify ──────────────────────────────────────────────────────────
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── POST /companies/bulk ─────────────────────────────────────────────────────
// Body: { companies: [{ name, slug?, website, description, industry, ... offices: [...] }] }
router.post('/companies/bulk', async (req, res) => {
  try {
    const { companies } = req.body;

    if (!Array.isArray(companies) || companies.length === 0) {
      return res.status(400).json({ error: 'companies must be a non-empty array' });
    }

    const results = { inserted: 0, updated: 0, errors: [] };

    for (const companyData of companies) {
      try {
        const slug = companyData.slug || slugify(companyData.name);
        const { offices, career_url, ats_platform, ats_identifier, ...fields } = companyData;

        // Ensure slug is set
        fields.slug = slug;
        if (career_url) fields.career_url = career_url;
        if (ats_platform) fields.ats_platform = ats_platform;
        if (ats_identifier) fields.ats_identifier = ats_identifier;

        // Remove fields that don't exist in the DB schema
        delete fields.ats_platform;
        delete fields.ats_identifier;

        let company = await db('companies').where('slug', slug).first();
        if (company) {
          // Update existing — merge, don't overwrite with nulls
          const updateFields = {};
          for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null) {
              updateFields[key] = value;
            }
          }
          updateFields.updated_at = db.fn.now();
          await db('companies').where('id', company.id).update(updateFields);
          company = await db('companies').where('id', company.id).first();
          results.updated++;
        } else {
          [company] = await db('companies').insert(fields).returning('*');
          results.inserted++;
        }

        // Upsert offices
        if (Array.isArray(offices)) {
          for (const office of offices) {
            const existing = await db('offices')
              .where('company_id', company.id)
              .where('city', office.city)
              .first();

            if (existing) {
              // Update coordinates if provided
              const officeUpdate = {};
              if (office.latitude != null) officeUpdate.latitude = office.latitude;
              if (office.longitude != null) officeUpdate.longitude = office.longitude;
              if (office.state) officeUpdate.state = office.state;
              if (office.address) officeUpdate.address = office.address;
              if (office.is_hq != null) officeUpdate.is_hq = office.is_hq;
              if (Object.keys(officeUpdate).length > 0) {
                await db('offices').where('id', existing.id).update(officeUpdate);
              }
            } else {
              await db('offices').insert({
                company_id: company.id,
                city: office.city,
                state: office.state || null,
                latitude: office.latitude || null,
                longitude: office.longitude || null,
                address: office.address || null,
                is_hq: office.is_hq || false,
              });
            }
          }
        }
      } catch (err) {
        results.errors.push({ company: companyData.name || companyData.slug, error: err.message });
      }
    }

    // Index companies into Meilisearch
    try {
      const allCompanies = await db.raw(`
        SELECT 
          c.id, c.name, c.slug, c.website, c.description,
          c.industry, c.logo_url, c.is_hiring, c.employee_count, c.founded_year,
          STRING_AGG(DISTINCT o.city, ', ' ORDER BY o.city) AS city,
          (SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id AND j.is_active = true) AS job_count
        FROM companies c
        LEFT JOIN offices o ON o.company_id = c.id
        GROUP BY c.id
        ORDER BY c.id
      `);
      const docs = allCompanies.rows.map(c => ({
        ...c,
        job_count: Number(c.job_count) || 0,
        employee_count: c.employee_count ? Number(c.employee_count) : null,
      }));
      if (docs.length > 0) {
        const task = await meili.index(COMPANIES_INDEX).addDocuments(docs);
        await meili.tasks.waitForTask(task.taskUid, { timeOutMs: 60000 });
      }
    } catch (meiliErr) {
      console.warn('[Admin] Meilisearch company indexing failed:', meiliErr.message);
    }

    res.json({
      message: `Processed ${companies.length} companies`,
      ...results,
    });
  } catch (err) {
    console.error('[Admin] Bulk company insert error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /companies/bulk/locations ──────────────────────────────────────────
// Body: { locations: [{ company_id, city, latitude, longitude, state?, address? }] }
//   — or —
// Body: { locations: [{ slug, city, latitude, longitude, state?, address? }] }
router.patch('/companies/bulk/locations', async (req, res) => {
  try {
    const { locations } = req.body;

    if (!Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({ error: 'locations must be a non-empty array' });
    }

    const results = { updated: 0, created: 0, errors: [] };

    for (const loc of locations) {
      try {
        // Resolve company ID from slug or company_id
        let companyId = loc.company_id;
        if (!companyId && loc.slug) {
          const company = await db('companies').where('slug', loc.slug).first();
          if (!company) {
            results.errors.push({ slug: loc.slug, error: 'Company not found' });
            continue;
          }
          companyId = company.id;
        }

        if (!companyId) {
          results.errors.push({ ...loc, error: 'company_id or slug required' });
          continue;
        }

        // Find existing office by city
        const existingOffice = await db('offices')
          .where('company_id', companyId)
          .where('city', loc.city)
          .first();

        if (existingOffice) {
          await db('offices').where('id', existingOffice.id).update({
            latitude: loc.latitude,
            longitude: loc.longitude,
            ...(loc.state ? { state: loc.state } : {}),
            ...(loc.address ? { address: loc.address } : {}),
          });
          results.updated++;
        } else {
          await db('offices').insert({
            company_id: companyId,
            city: loc.city,
            state: loc.state || null,
            latitude: loc.latitude,
            longitude: loc.longitude,
            address: loc.address || null,
            is_hq: loc.is_hq || false,
          });
          results.created++;
        }
      } catch (err) {
        results.errors.push({ slug: loc.slug || loc.company_id, error: err.message });
      }
    }

    res.json({ message: `Processed ${locations.length} locations`, ...results });
  } catch (err) {
    console.error('[Admin] Bulk location update error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /companies/:id/career-url ──────────────────────────────────────────
// Body: { career_url: "https://..." }
// :id can be a numeric ID or a slug
router.patch('/companies/:id/career-url', async (req, res) => {
  try {
    const { career_url } = req.body;
    const identifier = req.params.id;

    if (!career_url) {
      return res.status(400).json({ error: 'career_url is required' });
    }

    // Find company by ID or slug
    let company;
    if (/^\d+$/.test(identifier)) {
      company = await db('companies').where('id', parseInt(identifier)).first();
    } else {
      company = await db('companies').where('slug', identifier).first();
    }

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await db('companies').where('id', company.id).update({
      career_url,
      updated_at: db.fn.now(),
    });

    res.json({ message: `Updated career_url for ${company.name}`, company_id: company.id, career_url });
  } catch (err) {
    console.error('[Admin] Career URL update error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /companies/without-coordinates ───────────────────────────────────────
router.get('/companies/without-coordinates', async (req, res) => {
  try {
    const companies = await db('companies as c')
      .select('c.id', 'c.name', 'c.slug', 'c.website', 'c.description', 'c.industry',
        'c.employee_count', 'c.founded_year')
      .whereNotExists(
        db('offices').whereRaw('offices.company_id = c.id')
          .whereNotNull('offices.latitude')
          .where('offices.latitude', '!=', 0)
      )
      .orderBy('c.name');

    // Also get offices for these companies (they might have offices without coords)
    const companyIds = companies.map(c => c.id);
    const offices = companyIds.length > 0
      ? await db('offices').whereIn('company_id', companyIds)
      : [];

    const result = companies.map(c => ({
      ...c,
      offices: offices.filter(o => o.company_id === c.id),
    }));

    res.json({ count: result.length, companies: result });
  } catch (err) {
    console.error('[Admin] Without-coordinates error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /companies/without-career-url ────────────────────────────────────────
router.get('/companies/without-career-url', async (req, res) => {
  try {
    const companies = await db('companies')
      .select('id', 'name', 'slug', 'website', 'description', 'industry',
        'employee_count', 'founded_year')
      .where(function () {
        this.whereNull('career_url').orWhere('career_url', '');
      })
      .orderBy('name');

    res.json({ count: companies.length, companies });
  } catch (err) {
    console.error('[Admin] Without-career-url error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /companies/with-career-url ───────────────────────────────────────────
router.get('/companies/with-career-url', async (req, res) => {
  try {
    const companies = await db('companies as c')
      .select('c.*')
      .whereNotNull('c.career_url')
      .where('c.career_url', '!=', '')
      .orderBy('c.name');

    // Get offices for each company
    const companyIds = companies.map(c => c.id);
    const offices = companyIds.length > 0
      ? await db('offices').whereIn('company_id', companyIds)
      : [];

    const result = companies.map(c => ({
      ...c,
      offices: offices.filter(o => o.company_id === c.id),
    }));

    res.json({ count: result.length, companies: result });
  } catch (err) {
    console.error('[Admin] With-career-url error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /jobs/bulk ──────────────────────────────────────────────────────────
// Body: { company_id: number, jobs: [{ title, description, source_url, ... }] }
// Inserts jobs directly into the jobs table (via staging + swap) and indexes in Meilisearch.
const crypto = require('crypto');

function contentHash(title, companyId, sourceUrl) {
  return crypto.createHash('sha256')
    .update(`${title}::${companyId}::${sourceUrl}`)
    .digest('hex');
}

router.post('/jobs/bulk', async (req, res) => {
  try {
    const { company_id, jobs, company_slug } = req.body;

    // Resolve company
    let companyId = company_id;
    if (!companyId && company_slug) {
      const company = await db('companies').where('slug', company_slug).first();
      if (!company) return res.status(404).json({ error: `Company ${company_slug} not found` });
      companyId = company.id;
    }

    if (!companyId) {
      return res.status(400).json({ error: 'company_id or company_slug is required' });
    }

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return res.status(400).json({ error: 'jobs must be a non-empty array' });
    }

    // Get office mapping for this company
    const offices = await db('offices').where('company_id', companyId);
    const cityToOfficeId = {};
    for (const o of offices) {
      cityToOfficeId[o.city] = o.id;
    }
    const defaultOfficeId = offices[0]?.id || null;

    const results = { inserted: 0, duplicates: 0, errors: [] };
    const insertedJobIds = [];

    // Use transaction for atomicity
    await db.transaction(async (trx) => {
      for (const job of jobs) {
        const hash = contentHash(job.title, companyId, job.source_url || '');
        const officeId = (job.matched_city && cityToOfficeId[job.matched_city])
          || defaultOfficeId;

        try {
          const existing = await trx('jobs').where('content_hash', hash).first();
          if (existing) {
            // Update timestamp
            await trx('jobs').where('id', existing.id).update({
              is_active: true,
              scraped_at: trx.fn.now(),
              updated_at: trx.fn.now(),
            });
            results.duplicates++;
            insertedJobIds.push(existing.id);
          } else {
            const [newJob] = await trx('jobs').insert({
              company_id: companyId,
              office_id: officeId,
              title: job.title,
              description: job.description || '',
              source_url: job.source_url || '',
              work_type: job.work_type || 'onsite',
              department: job.department || 'General',
              salary_min: job.salary_min || null,
              salary_max: job.salary_max || null,
              salary_currency: job.salary_currency || 'INR',
              experience_min: job.experience_min || null,
              experience_max: job.experience_max || null,
              content_hash: hash,
              is_active: true,
              source_type: job.source_type || 'career_page',
              ai_confidence: job.ai_confidence || null,
              posted_at: job.posted_at ? new Date(job.posted_at) : new Date(),
              scraped_at: new Date(),
            }).returning('*');
            results.inserted++;
            insertedJobIds.push(newJob.id);
          }
        } catch (err) {
          if (err.code === '23505') {
            results.duplicates++;
          } else {
            results.errors.push({ title: job.title, error: err.message });
          }
        }
      }
    });

    // Update hiring status
    const [{ count }] = await db('jobs')
      .where('company_id', companyId)
      .where('is_active', true)
      .count('id as count');
    await db('companies').where('id', companyId).update({
      is_hiring: parseInt(count) > 0,
    });

    // Index all inserted/updated jobs into Meilisearch
    try {
      if (insertedJobIds.length > 0) {
        const jobDocs = await db('jobs as j')
          .select(
            'j.id', 'j.title', 'j.description', 'j.work_type', 'j.department',
            'j.salary_min', 'j.salary_max', 'j.salary_currency',
            'j.experience_min', 'j.experience_max',
            'j.source_url', 'j.is_active', 'j.posted_at', 'j.company_id',
            'c.name as company_name', 'c.slug as company_slug', 'c.logo_url as company_logo',
            'c.industry as company_industry',
            'o.city', 'o.state', 'o.latitude', 'o.longitude', 'o.address'
          )
          .join('companies as c', 'c.id', 'j.company_id')
          .leftJoin('offices as o', 'o.id', 'j.office_id')
          .whereIn('j.id', insertedJobIds);

        const documents = jobDocs.map(j => ({
          ...j,
          posted_at: j.posted_at ? Math.floor(new Date(j.posted_at).getTime() / 1000) : null,
          salary_min: j.salary_min ? Number(j.salary_min) : null,
          salary_max: j.salary_max ? Number(j.salary_max) : null,
          experience_min: j.experience_min ? Number(j.experience_min) : null,
          experience_max: j.experience_max ? Number(j.experience_max) : null,
          latitude: j.latitude ? Number(j.latitude) : null,
          longitude: j.longitude ? Number(j.longitude) : null,
        }));

        if (documents.length > 0) {
          const task = await meili.index(JOBS_INDEX).addDocuments(documents);
          await meili.tasks.waitForTask(task.taskUid, { timeOutMs: 60000 });
        }
      }
    } catch (meiliErr) {
      console.warn('[Admin] Meilisearch job indexing failed:', meiliErr.message);
    }

    res.json({
      message: `Processed ${jobs.length} jobs for company ${companyId}`,
      ...results,
      active_job_count: parseInt(count),
    });
  } catch (err) {
    console.error('[Admin] Bulk job insert error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
