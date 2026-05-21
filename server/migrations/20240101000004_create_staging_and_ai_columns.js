/**
 * Migration: Create jobs_staging table and add AI-related columns to jobs
 * 
 * The staging table mirrors the jobs schema and is used for atomic job replacement:
 * 1. New scraped jobs land in jobs_staging first
 * 2. Old jobs are deleted from the jobs table
 * 3. Staging jobs are promoted to the jobs table
 * 4. Staging is cleaned up
 * 
 * This prevents data loss during the scrape→replace cycle.
 */
exports.up = async function (knex) {
  // Add source_type and ai_confidence to the main jobs table
  await knex.schema.alterTable('jobs', (table) => {
    // Where the job came from: 'ats_api' (trusted), 'career_page', 'generic'
    table.string('source_type', 30).defaultTo('unknown');
    // AI confidence score (0.0–1.0) — null means not AI-validated (e.g. ATS jobs)
    table.float('ai_confidence').nullable();
  });

  // Create the staging table — mirrors jobs schema
  await knex.schema.createTable('jobs_staging', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().notNullable();
    table.integer('office_id').unsigned().nullable();
    table.string('title', 255).notNullable();
    table.text('description');
    table.text('source_url').notNullable();
    table.integer('salary_min');
    table.integer('salary_max');
    table.string('salary_currency', 10).defaultTo('INR');
    table.integer('experience_min');
    table.integer('experience_max');
    table.string('work_type', 20);
    table.string('department', 100);
    table.string('content_hash', 64);
    table.boolean('is_active').defaultTo(true);
    table.string('source_type', 30).defaultTo('unknown');
    table.float('ai_confidence').nullable();
    table.timestamp('posted_at');
    table.timestamp('scraped_at').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });

  // Index for fast company-level operations on staging
  await knex.raw('CREATE INDEX idx_staging_company ON jobs_staging(company_id)');
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('jobs_staging');

  await knex.schema.alterTable('jobs', (table) => {
    table.dropColumn('source_type');
    table.dropColumn('ai_confidence');
  });
};
