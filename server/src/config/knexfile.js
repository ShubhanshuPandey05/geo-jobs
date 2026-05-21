require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'jobmap',
      user: process.env.DB_USER || 'jobmap',
      password: process.env.DB_PASSWORD || 'jobmap_secret_123',
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: require('path').resolve(__dirname, '../../migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: require('path').resolve(__dirname, '../../seeds'),
    },
  },
};
