/**
 * Location Scraper — API-Driven (Concurrent)
 * 
 * Fetches companies without coordinates from the admin API,
 * scrapes their location from Google Maps using Playwright,
 * and batch-updates the coordinates via the API.
 * 
 * Usage: cd scraper && npm run findlocations
 *   or:  node src/scrapers/findLocations.js --concurrency 10
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const { chromium } = require('playwright');
const axios = require('axios');

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3001';
const TOKEN = process.env.ADMIN_API_TOKEN;
const BATCH_SIZE = 10; // Send location updates in batches of 10

// Parse --concurrency flag from CLI args (default: 5)
const CONCURRENCY = (() => {
  const idx = process.argv.indexOf('--concurrency');
  if (idx !== -1 && process.argv[idx + 1]) return parseInt(process.argv[idx + 1], 10);
  return 5;
})();

const api = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: `Bearer ${TOKEN}` },
  timeout: 30000,
});

// ─── Google Maps coordinate extraction ────────────────────────────────────────
async function getCoordinates(page, companyName, city, state) {
  const query = encodeURIComponent(`${companyName} ${city || ''}`);
  await page.goto(`https://www.google.com/maps/search/${query}`, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page.waitForFunction(() => window.location.href.includes('@'), { timeout: 10000 });

  const url = page.url();
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) throw new Error(`Could not parse coordinates from URL: ${url}`);

  return {
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2]),
  };
}

// ─── Worker: each worker owns one browser tab ─────────────────────────────────
async function worker(workerId, browser, tasks, locationUpdates, stats) {
  let page = await browser.newPage();

  while (true) {
    const task = tasks.shift();
    if (!task) break; // queue empty

    const { index, total, company } = task;
    const city = company.offices?.[0]?.city || '';
    const state = company.offices?.[0]?.state || '';

    try {
      console.log(`[W${workerId}] [${index}/${total}] 📍 ${company.name}...`);
      const coords = await getCoordinates(page, company.name, city, state);
      console.log(`[W${workerId}]    ✅ ${coords.latitude}, ${coords.longitude}`);

      locationUpdates.push({
        company_id: company.id,
        slug: company.slug,
        city: city || company.name,
        latitude: coords.latitude,
        longitude: coords.longitude,
        state: state || null,
      });
      stats.success++;

      // Batch flush when buffer is large enough
      if (locationUpdates.length >= BATCH_SIZE) {
        await flushLocationUpdates(locationUpdates);
      }
    } catch (err) {
      console.log(`[W${workerId}]    ❌ ${err.message}`);
      stats.failed++;

      // If the page crashed, create a fresh one
      if (err.message.includes('closed') || err.message.includes('crashed')) {
        try { await page.close(); } catch (_) { }
        page = await browser.newPage();
      }
    }
  }

  try { await page.close(); } catch (_) { }
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!TOKEN) {
    console.error('❌ ADMIN_API_TOKEN not set in .env');
    process.exit(1);
  }

  // Step 1: Get companies without coordinates from API
  console.log('📡 Fetching companies without coordinates from API...');
  let companies;
  try {
    const res = await api.get('/api/admin/companies/without-coordinates');
    companies = res.data.companies;
    console.log(`   Found ${companies.length} companies without coordinates\n`);
  } catch (err) {
    console.error('❌ Failed to fetch companies:', err.response?.data?.error || err.message);
    process.exit(1);
  }

  if (companies.length === 0) {
    console.log('✅ All companies already have coordinates!');
    return;
  }

  // Step 2: Build task queue
  const tasks = companies.map((company, i) => ({
    index: i + 1,
    total: companies.length,
    company,
  }));

  const locationUpdates = []; // Shared buffer (safe — JS is single-threaded)
  const stats = { success: 0, failed: 0 };

  // Step 3: Launch browser & spin up workers
  const actualConcurrency = Math.min(CONCURRENCY, companies.length);
  console.log(`🚀 Launching browser with ${actualConcurrency} concurrent tabs...\n`);
  const browser = await chromium.launch({ headless: true });

  const workers = [];
  for (let i = 0; i < actualConcurrency; i++) {
    workers.push(worker(i + 1, browser, tasks, locationUpdates, stats));
  }

  await Promise.all(workers);

  // Flush remaining updates
  if (locationUpdates.length > 0) {
    await flushLocationUpdates(locationUpdates);
  }

  await browser.close();

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 Location Scraping Summary`);
  console.log(`   Concurrency: ${actualConcurrency} tabs`);
  console.log(`   Total:       ${companies.length}`);
  console.log(`   Success:     ${stats.success}`);
  console.log(`   Failed:      ${stats.failed}`);
  console.log(`${'═'.repeat(50)}`);
}

async function flushLocationUpdates(updates) {
  const batch = updates.splice(0, updates.length); // drain the array
  console.log(`\n   📤 Sending ${batch.length} location updates to API...`);
  try {
    const res = await api.patch('/api/admin/companies/bulk/locations', {
      locations: batch,
    });
    console.log(`   ✅ Updated: ${res.data.updated}, Created: ${res.data.created}\n`);
  } catch (err) {
    console.error(`   ❌ Batch update failed: ${err.response?.data?.error || err.message}`);
  }
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
