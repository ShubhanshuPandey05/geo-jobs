const { chromium } = require('playwright');

// Quick debug: log ALL network requests to rest.techbehemoths.com
async function debugNetworkCalls() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Log every request to the rest API
    page.on('request', (request) => {
        if (request.url().includes('rest.techbehemoths.com')) {
            console.log(`\n>> REQUEST: ${request.method()} ${request.url()}`);
            console.log('   Headers:', JSON.stringify(request.headers(), null, 2));
        }
    });

    page.on('response', async (response) => {
        if (response.url().includes('rest.techbehemoths.com')) {
            console.log(`\n<< RESPONSE: ${response.status()} ${response.url()}`);
            try {
                const body = await response.text();
                // Print first 500 chars
                console.log('   Body (first 500 chars):', body.substring(0, 500));
            } catch (e) {
                console.log('   Could not read body');
            }
        }
    });

    console.log('Navigating to techbehemoths.com/companies/surat ...');
    await page.goto('https://techbehemoths.com/companies/surat', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });

    // Wait for XHR calls to complete
    await page.waitForTimeout(10000);
    console.log('\n--- Done waiting. Closing browser. ---');
    await browser.close();
}

debugNetworkCalls();
