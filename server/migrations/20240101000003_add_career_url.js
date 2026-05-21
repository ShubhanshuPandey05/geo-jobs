/**
 * Migration: Add career_url to companies table
 */
exports.up = function (knex) {
  return knex.schema.alterTable('companies', (table) => {
    table.string('career_url', 500);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('companies', (table) => {
    table.dropColumn('career_url');
  });
};
