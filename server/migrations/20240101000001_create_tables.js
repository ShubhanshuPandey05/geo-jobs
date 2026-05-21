exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis');

  await knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('slug', 255).unique().notNullable();
    table.text('website');
    table.text('description');
    table.string('industry', 100);
    table.text('logo_url');
    table.string('ats_platform', 50);
    table.string('ats_identifier', 255);
    table.boolean('is_hiring').defaultTo(false);
    table.integer('employee_count');
    table.string('founded_year', 4);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('offices', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.string('city', 100);
    table.string('state', 100);
    table.string('country', 100).defaultTo('India');
    table.text('address');
    table.decimal('latitude', 10, 7);
    table.decimal('longitude', 10, 7);
    table.boolean('is_hq').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.raw('ALTER TABLE offices ADD COLUMN location GEOGRAPHY(POINT, 4326)');

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_office_location()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
        NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER trigger_update_office_location
    BEFORE INSERT OR UPDATE ON offices
    FOR EACH ROW EXECUTE FUNCTION update_office_location();
  `);

  await knex.raw('CREATE INDEX idx_offices_location ON offices USING GIST(location)');

  await knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    table.integer('office_id').unsigned().references('id').inTable('offices').onDelete('SET NULL');
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
    table.timestamp('posted_at');
    table.timestamp('scraped_at').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });

  await knex.raw(`CREATE INDEX idx_jobs_search ON jobs USING GIN(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '')))`);
  await knex.raw('CREATE UNIQUE INDEX idx_jobs_content_hash ON jobs(content_hash) WHERE content_hash IS NOT NULL');
  await knex.raw('CREATE INDEX idx_jobs_active ON jobs(company_id, is_active) WHERE is_active = true');
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('jobs');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_update_office_location ON offices');
  await knex.raw('DROP FUNCTION IF EXISTS update_office_location');
  await knex.schema.dropTableIfExists('offices');
  await knex.schema.dropTableIfExists('companies');
  await knex.raw('DROP EXTENSION IF EXISTS postgis');
};
