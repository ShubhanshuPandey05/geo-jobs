/**
 * Database Storage Layer
 * Handles upsert logic for companies, offices, and jobs
 */
const crypto = require('crypto');
const db = require('./utils/db');
const logger = require('./utils/logger');

/**
 * Generate content hash for deduplication
 */
function contentHash(title, companyId, sourceUrl) {
  return crypto.createHash('sha256')
    .update(`${title}::${companyId}::${sourceUrl}`)
    .digest('hex');
}

/**
 * Upsert a company and its offices
 * Returns { companyId, cityToOfficeId }
 */
async function upsertCompany(companyData) {
  const { offices, ...fields } = companyData;

  let company = await db('companies').where('slug', fields.slug).first();
  if (company) {
    await db('companies').where('id', company.id).update({ ...fields, updated_at: db.fn.now() });
    company = await db('companies').where('id', company.id).first();
    logger.debug(`Updated company: ${company.name} (ID: ${company.id})`);
  } else {
    [company] = await db('companies').insert(fields).returning('*');
    logger.info(`Created company: ${company.name} (ID: ${company.id})`);
  }

  const cityToOfficeId = {};
  for (const office of (offices || [])) {
    let existing = await db('offices')
      .where('company_id', company.id)
      .where('city', office.city)
      .first();

    if (existing) {
      cityToOfficeId[office.city] = existing.id;
    } else {
      const [newOffice] = await db('offices').insert({
        company_id: company.id,
        ...office,
      }).returning('*');
      cityToOfficeId[office.city] = newOffice.id;
      logger.debug(`Created office: ${office.city} (ID: ${newOffice.id})`);
    }
  }

  return { companyId: company.id, cityToOfficeId };
}

/**
 * Save scraped jobs with deduplication
 */
async function saveJobs(jobs, companyId, cityToOfficeId) {
  let inserted = 0, updated = 0, skipped = 0;

  for (const job of jobs) {
    const hash = contentHash(job.title, companyId, job.source_url);
    const officeId = cityToOfficeId[job.matched_city] || Object.values(cityToOfficeId)[0] || null;

    const existing = await db('jobs').where('content_hash', hash).first();

    if (existing) {
      await db('jobs').where('id', existing.id).update({
        is_active: true,
        scraped_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
      updated++;
    } else {
      try {
        await db('jobs').insert({
          company_id: companyId,
          office_id: officeId,
          title: job.title,
          description: job.description || '',
          source_url: job.source_url || '',
          work_type: job.work_type || 'onsite',
          department: job.department || 'General',
          content_hash: hash,
          is_active: true,
          posted_at: job.posted_at ? new Date(job.posted_at) : new Date(),
          scraped_at: new Date(),
        });
        inserted++;
      } catch (err) {
        if (err.code === '23505') {
          skipped++;
        } else {
          logger.error(`Error inserting "${job.title}": ${err.message}`);
        }
      }
    }
  }

  return { inserted, updated, skipped };
}

/**
 * Mark all jobs for a company as inactive
 */
async function markJobsInactive(companyId) {
  return db('jobs')
    .where('company_id', companyId)
    .where('is_active', true)
    .update({ is_active: false, updated_at: db.fn.now() });
}

/**
 * Update company hiring status
 */
async function updateHiringStatus(companyId) {
  const [{ count }] = await db('jobs')
    .where('company_id', companyId)
    .where('is_active', true)
    .count('id as count');

  const isHiring = parseInt(count) > 0;
  await db('companies').where('id', companyId).update({ is_hiring: isHiring });
  return { isHiring, jobCount: parseInt(count) };
}

/**
 * Insert jobs into the staging table.
 * Jobs are staged before the atomic swap to prevent data loss.
 * 
 * @param {Array} jobs — Array of job objects
 * @param {number} companyId — Company ID
 * @param {Object} cityToOfficeId — Map of city → office ID
 * @param {string} sourceType — 'ats_api' | 'career_page' | 'generic'
 * @param {number|null} defaultConfidence — Default AI confidence (1.0 for ATS, null for per-job)
 */
async function insertToStaging(jobs, companyId, cityToOfficeId, sourceType, defaultConfidence) {
  let inserted = 0;

  for (const job of jobs) {
    const hash = contentHash(job.title, companyId, job.source_url);
    const officeId = cityToOfficeId[job.matched_city] || Object.values(cityToOfficeId)[0] || null;
    const confidence = defaultConfidence !== null ? defaultConfidence : (job.ai_confidence ?? null);

    try {
      await db('jobs_staging').insert({
        company_id: companyId,
        office_id: officeId,
        title: job.title,
        description: job.description || '',
        source_url: job.source_url || '',
        work_type: job.work_type || 'onsite',
        department: job.department || 'General',
        content_hash: hash,
        is_active: job.ai_is_active !== false,
        source_type: sourceType,
        ai_confidence: confidence,
        posted_at: job.posted_at ? new Date(job.posted_at) : new Date(),
        scraped_at: new Date(),
      });
      inserted++;
    } catch (err) {
      if (err.code === '23505') {
        // Duplicate in staging — skip
        logger.debug(`Staging duplicate skipped: "${job.title}"`);
      } else {
        logger.error(`Error staging "${job.title}": ${err.message}`);
      }
    }
  }

  logger.debug(`Staged ${inserted}/${jobs.length} jobs for company ${companyId} (${sourceType})`);
  return { inserted };
}

/**
 * Atomic swap: replace old jobs with staged new jobs for a company.
 * Uses a database transaction to ensure atomicity.
 * 
 * Flow:
 * 1. DELETE all existing jobs for the company from the jobs table
 * 2. INSERT all staged jobs from jobs_staging into jobs
 * 3. DELETE staging entries for the company
 * 
 * @param {number} companyId
 * @returns {{ deleted: number, promoted: number }}
 */
async function swapCompanyJobs(companyId) {
  return db.transaction(async (trx) => {
    // Step 1: Count and delete old jobs
    const deleted = await trx('jobs')
      .where('company_id', companyId)
      .del();

    // Step 2: Promote staging → jobs (copy all columns except the staging ID)
    const stagingJobs = await trx('jobs_staging')
      .where('company_id', companyId)
      .select(
        'company_id', 'office_id', 'title', 'description', 'source_url',
        'salary_min', 'salary_max', 'salary_currency',
        'experience_min', 'experience_max',
        'work_type', 'department', 'content_hash',
        'is_active', 'source_type', 'ai_confidence',
        'posted_at', 'scraped_at'
      );

    let promoted = 0;
    if (stagingJobs.length > 0) {
      // Batch insert in chunks of 50
      const chunkSize = 50;
      for (let i = 0; i < stagingJobs.length; i += chunkSize) {
        const chunk = stagingJobs.slice(i, i + chunkSize);
        await trx('jobs').insert(chunk.map(job => ({
          ...job,
          created_at: new Date(),
          updated_at: new Date(),
        })));
      }
      promoted = stagingJobs.length;
    }

    // Step 3: Clear staging
    await trx('jobs_staging')
      .where('company_id', companyId)
      .del();

    logger.debug(`Swap complete for company ${companyId}: deleted ${deleted}, promoted ${promoted}`);
    return { deleted, promoted };
  });
}

/**
 * Clear staging entries for a company (error cleanup)
 */
async function clearCompanyStaging(companyId) {
  const deleted = await db('jobs_staging')
    .where('company_id', companyId)
    .del();
  if (deleted > 0) {
    logger.debug(`Cleared ${deleted} staging entries for company ${companyId}`);
  }
  return deleted;
}

/**
 * Delete all jobs for a company (used when no new jobs are found)
 */
async function deleteCompanyJobs(companyId) {
  return db('jobs')
    .where('company_id', companyId)
    .del();
}

/**
 * Store scraping metrics
 */
async function logScrapeRun(data) {
  try {
    await db('scrape_logs').insert({
      company_id: data.companyId,
      platform: data.platform,
      jobs_found: data.jobsFound,
      jobs_inserted: data.jobsInserted,
      jobs_updated: data.jobsUpdated,
      duration_ms: data.durationMs,
      method: data.method,
      error: data.error || null,
      created_at: new Date(),
    });
  } catch {
    // scrape_logs table may not exist yet — skip silently
  }
}

module.exports = {
  upsertCompany,
  saveJobs,
  markJobsInactive,
  updateHiringStatus,
  logScrapeRun,
  contentHash,
  // New staging functions
  insertToStaging,
  swapCompanyJobs,
  clearCompanyStaging,
  deleteCompanyJobs,
};
