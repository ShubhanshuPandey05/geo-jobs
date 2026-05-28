/**
 * Seed Companies via Admin API
 * 
 * Reads the consolidated company data and pushes it through the
 * authorized bulk API endpoint. Handles batching for large datasets.
 * 
 * Usage: node scraper/src/seed-companies-api.js
 * 
 * Prerequisite: The server must be running (npm run dev in server/)
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { transform } = require('./utils/formatCompanyData');

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3001';
const TOKEN = process.env.ADMIN_API_TOKEN;
const DATA_FILE = path.resolve(__dirname, '../data/techbehemoths-companies.json');

const BATCH_SIZE = 50;

async function main() {
  if (!TOKEN) {
    console.error('❌ ADMIN_API_TOKEN not set in .env');
    process.exit(1);
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ ${DATA_FILE} not found. Place your company data JSON there.`);
    process.exit(1);
  }

  let rawCompanies = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📦 Loaded ${rawCompanies.length} companies from ${DATA_FILE}`);

  // Auto-detect format: if companies have `headquarter` or `services` fields,
  // they're in raw TechBehemoths format and need transformation
  const needsTransform = rawCompanies.some(c => c.headquarter || c.services || c.company_size);

  let companies;
  if (needsTransform) {
    console.log('🔄 Detected raw format — transforming via formatCompanyData...');
    companies = transform(rawCompanies);
    console.log(`   Transformed: ${companies.length} companies`);
  } else {
    console.log('✅ Data already in standard format — skipping transform');
    companies = rawCompanies;
  }

  console.log(`🔗 API: ${API_BASE}/api/admin/companies/bulk\n`);

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalErrors = 0;

  // Send in batches
  for (let i = 0; i < companies.length; i += BATCH_SIZE) {
    const batch = companies.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(companies.length / BATCH_SIZE);

    process.stdout.write(`  [${batchNum}/${totalBatches}] Sending ${batch.length} companies... `);

    try {
      const res = await axios.post(
        `${API_BASE}/api/admin/companies/bulk`,
        { companies: batch },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
          timeout: 60000,
        }
      );

      const { inserted, updated, errors } = res.data;
      totalInserted += inserted;
      totalUpdated += updated;
      totalErrors += (errors?.length || 0);

      console.log(`✅ +${inserted} new, ~${updated} updated${errors?.length ? `, ❌ ${errors.length} errors` : ''}`);

      if (errors?.length) {
        errors.forEach(e => console.log(`     ❌ ${e.company}: ${e.error}`));
      }
    } catch (err) {
      console.log(`❌ Request failed: ${err.response?.data?.error || err.message}`);
      totalErrors += batch.length;
    }
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 Summary`);
  console.log(`   Inserted: ${totalInserted}`);
  console.log(`   Updated:  ${totalUpdated}`);
  console.log(`   Errors:   ${totalErrors}`);
  console.log(`${'═'.repeat(50)}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
