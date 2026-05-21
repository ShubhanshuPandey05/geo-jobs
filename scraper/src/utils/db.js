require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5433,
    database: process.env.DB_NAME || 'jobmap',
    user: process.env.DB_USER || 'jobmap',
    password: process.env.DB_PASSWORD || 'jobmap_secret_123',
  },
  pool: { min: 1, max: 10 },
});

module.exports = db;
