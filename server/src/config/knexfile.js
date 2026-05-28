require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const defaultConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'geojobs',
    user: process.env.DB_USER || 'geojobs',
    password: process.env.DB_PASSWORD || 'geojobs_secret_123',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: require('path').resolve(__dirname, '../../migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: require('path').resolve(__dirname, '../../seeds'),
  },
};

module.exports = {
  development: defaultConfig,
  production: defaultConfig,
};
