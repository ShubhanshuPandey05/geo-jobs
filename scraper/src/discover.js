/**
 * ATS Board Discovery Script
 * Tries multiple slug variations for a company to find their board
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const axios = require('axios');

const GREENHOUSE_BASE = 'https://boards-api.greenhouse.io/v1/boards';

// Companies to discover board slugs for
const TARGETS = [
  { name: 'Flipkart', slugs: ['flipkart', 'flipkartprivatelimited', 'flipkartindia', 'flipkart_com', 'flipkart-internet'] },
  { name: 'Swiggy', slugs: ['swiggy', 'swiggypvtltd', 'bundl', 'swiggytechnologies'] },
  { name: 'Zomato', slugs: ['zomato', 'zomatomedia', 'zomatopvtltd', 'zomatoindia'] },
  { name: 'CRED', slugs: ['cred', 'credclub', 'credavenue', 'dreamplugtech', 'dreamplug'] },
  { name: 'Meesho', slugs: ['meesho', 'meeshoinc', 'meeshotech', 'fashnear'] },
  { name: 'Freshworks', slugs: ['freshworks', 'freshworksinc', 'freshdesk', 'freshworkstechnologies'] },
  { name: 'Zerodha', slugs: ['zerodha', 'zerodhabroking', 'zerodhatech'] },
  { name: 'ShareChat', slugs: ['sharechat', 'sharechatindia', 'mojito', 'mohalla', 'mohallatech'] },
  { name: 'Ola', slugs: ['ola', 'olacabs', 'olaelectric', 'aniolabs'] },
  { name: 'Nykaa', slugs: ['nykaa', 'nykaacom', 'nykaafashion', 'fsnetworkspvtltd'] },
  { name: 'BrowserStack', slugs: ['browserstack', 'browserstackinc', 'browserstack51'] },
  { name: 'Lenskart', slugs: ['lenskart', 'lenskartcom', 'lenskartsolutions'] },
  { name: 'Dream11', slugs: ['dream11', 'dreamsports', 'dream11fantasy'] },
  { name: 'Zoho', slugs: ['zoho', 'zohocorp', 'zohotech'] },
  { name: 'Urban Company', slugs: ['urbancompany', 'urbanclap', 'urbanclapmobilebeta'] },
  { name: 'Infosys', slugs: ['infosys', 'infosyslimited', 'infosysbpm'] },
];

async function trySlug(baseUrl, slug) {
  try {
    const { data } = await axios.get(`${baseUrl}/${slug}/jobs`, { timeout: 5000 });
    const count = data.jobs?.length || 0;
    return { found: true, count };
  } catch (err) {
    return { found: false, count: 0 };
  }
}

async function discover() {
  console.log('='.repeat(60));
  console.log('ATS Board Discovery');
  console.log('='.repeat(60));

  const results = [];

  for (const target of TARGETS) {
    console.log(`\nSearching for ${target.name}...`);
    for (const slug of target.slugs) {
      const gh = await trySlug(GREENHOUSE_BASE, slug);
      if (gh.found) {
        console.log(`  ✅ Greenhouse: ${slug} → ${gh.count} jobs`);
        results.push({ company: target.name, platform: 'greenhouse', slug, jobs: gh.count });
      } else {
        console.log(`  ❌ Greenhouse: ${slug}`);
      }
      // Rate limit
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('DISCOVERED BOARDS:');
  console.log('='.repeat(60));
  if (results.length === 0) {
    console.log('No new boards found. Companies may use different ATS platforms.');
  } else {
    results.forEach((r) => {
      console.log(`  ${r.company}: ${r.platform} → ${r.slug} (${r.jobs} jobs)`);
    });
  }
}

discover().catch(console.error);
