/**
 * Meilisearch Sync Service
 * 
 * Pulls jobs and companies from Postgres and indexes them into Meilisearch.
 * Can be run as:
 *   - A standalone script:  node src/services/meiliSync.js
 *   - Imported & called:    require('./services/meiliSync').fullSync()
 */

const db = require('../config/db');
const meili = require('../config/meilisearch');

// ─── Index Configuration ──────────────────────────────────────────────────────

const JOBS_INDEX = 'jobs';
const COMPANIES_INDEX = 'companies';

const JOBS_SEARCHABLE = [
  'title',
  'company_name',
  'department',
  'work_type',
  'city',
  'description',
];

const JOBS_FILTERABLE = [
  'city',
  'work_type',
  'department',
  'company_slug',
  'company_id',
  'is_active',
  'salary_min',
  'salary_max',
  'experience_min',
  'experience_max',
];

const JOBS_SORTABLE = ['posted_at', 'salary_max', 'salary_min', 'title'];

const COMPANIES_SEARCHABLE = ['name', 'industry', 'description', 'city'];
const COMPANIES_FILTERABLE = ['city', 'industry', 'is_hiring'];
const COMPANIES_SORTABLE = ['name', 'job_count'];

// ─── Index Setup ──────────────────────────────────────────────────────────────

async function ensureIndexes() {
  console.log('[MeiliSync] Ensuring indexes exist...');

  // Jobs index
  try {
    await meili.createIndex(JOBS_INDEX, { primaryKey: 'id' });
  } catch (e) {
    if (e.code !== 'index_already_exists') throw e;
  }

  const jobsIndex = meili.index(JOBS_INDEX);
  await jobsIndex.updateSearchableAttributes(JOBS_SEARCHABLE);
  await jobsIndex.updateFilterableAttributes(JOBS_FILTERABLE);
  await jobsIndex.updateSortableAttributes(JOBS_SORTABLE);

  // Typo tolerance config — be generous with fuzzy matching
  await jobsIndex.updateTypoTolerance({
    enabled: true,
    minWordSizeForTypos: { oneTypo: 3, twoTypos: 6 },
  });

  // Ranking rules — prioritise typo, then words, then proximity, then attribute order
  await jobsIndex.updateRankingRules([
    'words',
    'typo',
    'proximity',
    'attribute',
    'sort',
    'exactness',
  ]);

  // Companies index
  try {
    await meili.createIndex(COMPANIES_INDEX, { primaryKey: 'id' });
  } catch (e) {
    if (e.code !== 'index_already_exists') throw e;
  }

  const companiesIndex = meili.index(COMPANIES_INDEX);
  await companiesIndex.updateSearchableAttributes(COMPANIES_SEARCHABLE);
  await companiesIndex.updateFilterableAttributes(COMPANIES_FILTERABLE);
  await companiesIndex.updateSortableAttributes(COMPANIES_SORTABLE);
  await companiesIndex.updateTypoTolerance({
    enabled: true,
    minWordSizeForTypos: { oneTypo: 3, twoTypos: 6 },
  });

  console.log('[MeiliSync] Index configuration applied.');
}

// ─── Data Sync ────────────────────────────────────────────────────────────────

async function syncJobs() {
  console.log('[MeiliSync] Syncing jobs...');

  const BATCH_SIZE = 500;
  let offset = 0;
  let totalIndexed = 0;

  const jobsIndex = meili.index(JOBS_INDEX);

  while (true) {
    const jobs = await db('jobs as j')
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
      .where('j.is_active', true)
      .orderBy('j.id')
      .limit(BATCH_SIZE)
      .offset(offset);

    if (jobs.length === 0) break;

    // Convert dates to Unix timestamps for Meilisearch sorting
    const documents = jobs.map((j) => ({
      ...j,
      posted_at: j.posted_at ? Math.floor(new Date(j.posted_at).getTime() / 1000) : null,
      // Ensure numeric types
      salary_min: j.salary_min ? Number(j.salary_min) : null,
      salary_max: j.salary_max ? Number(j.salary_max) : null,
      experience_min: j.experience_min ? Number(j.experience_min) : null,
      experience_max: j.experience_max ? Number(j.experience_max) : null,
      latitude: j.latitude ? Number(j.latitude) : null,
      longitude: j.longitude ? Number(j.longitude) : null,
    }));

    const task = await jobsIndex.addDocuments(documents);
    totalIndexed += documents.length;
    offset += BATCH_SIZE;

    // Wait for this batch to finish so we don't overwhelm Meili
    await meili.tasks.waitForTask(task.taskUid, { timeOutMs: 60000 });
  }

  console.log(`[MeiliSync] Indexed ${totalIndexed} jobs.`);
  return totalIndexed;
}

async function syncCompanies() {
  console.log('[MeiliSync] Syncing companies...');

  const companiesIndex = meili.index(COMPANIES_INDEX);

  // Each company can have multiple offices — we create one document per company,
  // aggregating city info as a comma-separated list.
  const companies = await db.raw(`
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

  const documents = companies.rows.map((c) => ({
    ...c,
    job_count: Number(c.job_count) || 0,
    employee_count: c.employee_count ? Number(c.employee_count) : null,
  }));

  if (documents.length > 0) {
    const task = await companiesIndex.addDocuments(documents);
    await meili.tasks.waitForTask(task.taskUid, { timeOutMs: 60000 });
  }

  console.log(`[MeiliSync] Indexed ${documents.length} companies.`);
  return documents.length;
}

// ─── Full Sync (called on server startup and on demand) ───────────────────────

async function fullSync() {
  const start = Date.now();
  console.log('[MeiliSync] ─── Starting full sync ───');

  try {
    await ensureIndexes();
    const [jobCount, companyCount] = await Promise.all([syncJobs(), syncCompanies()]);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[MeiliSync] ─── Sync complete in ${elapsed}s | ${jobCount} jobs, ${companyCount} companies ───`);
    return { jobCount, companyCount, elapsed };
  } catch (err) {
    console.error('[MeiliSync] Sync failed:', err.message);
    throw err;
  }
}

// ─── Incremental helpers (for post-scrape hooks) ──────────────────────────────

async function indexJob(jobId) {
  const job = await db('jobs as j')
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
    .where('j.id', jobId)
    .first();

  if (!job) return;

  const doc = {
    ...job,
    posted_at: job.posted_at ? Math.floor(new Date(job.posted_at).getTime() / 1000) : null,
    salary_min: job.salary_min ? Number(job.salary_min) : null,
    salary_max: job.salary_max ? Number(job.salary_max) : null,
    experience_min: job.experience_min ? Number(job.experience_min) : null,
    experience_max: job.experience_max ? Number(job.experience_max) : null,
    latitude: job.latitude ? Number(job.latitude) : null,
    longitude: job.longitude ? Number(job.longitude) : null,
  };

  await meili.index(JOBS_INDEX).addDocuments([doc]);
}

async function removeJob(jobId) {
  await meili.index(JOBS_INDEX).deleteDocument(jobId);
}

module.exports = {
  fullSync,
  syncJobs,
  syncCompanies,
  ensureIndexes,
  indexJob,
  removeJob,
  JOBS_INDEX,
  COMPANIES_INDEX,
};

// ─── Run as standalone script ─────────────────────────────────────────────────
if (require.main === module) {
  fullSync()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
