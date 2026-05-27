const { Meilisearch } = require('meilisearch');

const meili = new Meilisearch({
  host: process.env.MEILI_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILI_MASTER_KEY || 'jobmap_meili_master_key_123',
});

module.exports = meili;
