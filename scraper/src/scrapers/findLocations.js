/**
 * Location Scraper — API-Driven
 * 
 * Fetches companies without coordinates from the admin API,
 * scrapes their location from Google Maps using Playwright,
 * and batch-updates the coordinates via the API.
 * 
 * Usage: cd scraper && npm run findlocations
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const { chromium } = require('playwright');
const axios = require('axios');

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3001';
const TOKEN = process.env.ADMIN_API_TOKEN;
const BATCH_SIZE = 10; // Send location updates in batches of 10

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

  // Step 2: Launch browser and scrape coordinates
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const locationUpdates = []; // Buffer for batch updates
  let success = 0;
  let failed = 0;

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const progress = `[${i + 1}/${companies.length}]`;
    const city = company.offices?.[0]?.city || '';
    const state = company.offices?.[0]?.state || '';

    try {
      console.log(`${progress} 📍 ${company.name}...`);
      const coords = await getCoordinates(page, company.name, city, state);
      console.log(`   ✅ ${coords.latitude}, ${coords.longitude}`);

      locationUpdates.push({
        company_id: company.id,
        slug: company.slug,
        city: city || company.name, // fallback city name
        latitude: coords.latitude,
        longitude: coords.longitude,
        state: state || null,
      });
      success++;

      // Batch update every BATCH_SIZE companies
      if (locationUpdates.length >= BATCH_SIZE) {
        await flushLocationUpdates(locationUpdates);
      }

      // Rate limiting
      await page.waitForTimeout(1000 + Math.random() * 500);
    } catch (err) {
      console.log(`   ❌ ${err.message}`);
      failed++;
    }
  }

  // Flush remaining updates
  if (locationUpdates.length > 0) {
    await flushLocationUpdates(locationUpdates);
  }

  await browser.close();

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 Location Scraping Summary`);
  console.log(`   Total:    ${companies.length}`);
  console.log(`   Success:  ${success}`);
  console.log(`   Failed:   ${failed}`);
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
