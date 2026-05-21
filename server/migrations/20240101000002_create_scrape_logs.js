/**
 * Migration: Add scrape_logs table for scraper metrics
 */
exports.up = function (knex) {
  return knex.schema.createTable('scrape_logs', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.string('platform', 50);
    table.integer('jobs_found').defaultTo(0);
    table.integer('jobs_inserted').defaultTo(0);
    table.integer('jobs_updated').defaultTo(0);
    table.integer('duration_ms').defaultTo(0);
    table.string('method', 50);
    table.text('error');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('scrape_logs');
};
