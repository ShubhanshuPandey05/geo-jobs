const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const cities = ["Surat", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Gurgaon"];

let companies = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(1000 + Math.random() * 4000); // 1-5 seconds

async function scrapeCityCompanies(page, city) {
    const slug = city.toLowerCase();
    const pageUrl = `https://techbehemoths.com/companies/${slug}`;

    console.log(`\n--- [${city}] Navigating to ${pageUrl} ---`);
    await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 45000 });

    // Step 1: Get total page count from the first API call
    console.log(`[${city}] Fetching page 1 to get total pages...`);
    const firstPageData = await page.evaluate(async (url) => {
        const res = await fetch(url, {
            headers: { 'Accept': 'application/json, text/plain, */*' },
        });
        if (!res.ok) return { error: `HTTP ${res.status}` };
        return await res.json();
    }, `https://rest.techbehemoths.com/api/pages/companies/${slug}?page=1&only_winning_awards=1`);

    if (firstPageData.error) {
        console.error(`[${city}] API error: ${firstPageData.error}`);
        return;
    }

    const totalPages = firstPageData.companies.meta.last_page;
    const totalCompanies = firstPageData.companies.meta.total;
    console.log(`[${city}] Found ${totalCompanies} companies across ${totalPages} pages`);

    // Collect page 1 data
    companies = companies.concat(firstPageData.companies.data);
    console.log(`[${city}] Page 1/${totalPages} — collected ${firstPageData.companies.data.length} companies`);

    // Small delay before starting pagination
    await randomDelay();

    // Step 2: Fetch remaining pages (2 to last) from the same browser tab
    for (let i = 2; i <= totalPages; i++) {
        const apiUrl = `https://rest.techbehemoths.com/api/pages/companies/${slug}?page=${i}&only_winning_awards=1`;

        const data = await page.evaluate(async (url) => {
            const res = await fetch(url, {
                headers: { 'Accept': 'application/json, text/plain, */*' },
            });
            if (!res.ok) return { error: `HTTP ${res.status}` };
            return await res.json();
        }, apiUrl);

        if (data.error) {
            console.error(`[${city}] Page ${i} error: ${data.error}`);
            continue;
        }

        companies = companies.concat(data.companies.data);
        console.log(`[${city}] Page ${i}/${totalPages} — collected ${data.companies.data.length} companies`);

        // Delay between pages to avoid rate-limiting
        if (i < totalPages) await randomDelay();
    }
}

(async () => {
    const browser = await chromium.launch({ headless: false });

    for (const city of cities) {
        // Fresh page per city so one crash doesn't kill the rest
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await scrapeCityCompanies(page, city);
        } catch (err) {
            console.error(`[${city}] Fatal error: ${err.message}`);
        } finally {
            await context.close();
        }

        // Delay between cities
        await delay(3000);
    }

    await browser.close();

    // Save results
    const outPath = path.resolve(__dirname, '../../data/techbehemoths-companies.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(companies, null, 2));
    console.log(`\nDone! Scraped ${companies.length} companies across ${cities.length} cities.`);
    console.log(`Saved to: ${outPath}`);
})();