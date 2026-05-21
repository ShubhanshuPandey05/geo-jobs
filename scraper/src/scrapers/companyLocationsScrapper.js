const { chromium } = require('playwright');
const fs = require('fs');

const companies = [
  {
    name: 'DigiEn InfoSoft LLP',
    slug: 'digien-infosoft-llp',
    website: 'https://www.digien.in/',
    description: 'A tech company working on digitalization of enterprises.',
    industry: 'Custom Software Development',
    employee_count: 2,
    founded_year: '2017',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'MonkDA',
    slug: 'monkda',
    website: 'https://monkda.com/',
    description: 'Empowering Startups and Businesses to Grow and innovate with Technological Expertise.',
    industry: 'Mobile App Development',
    employee_count: 10,
    founded_year: '2018',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'BRIGHTEN SOLUTIONS PVT LTD',
    slug: 'brighten-solutions-pvt-ltd',
    website: 'https://brightensolutions.com/',
    description: 'Custom Software & Websites That Scale with You from Surat, Gujarat.',
    industry: 'Custom Software Development',
    employee_count: 10,
    founded_year: '2016',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'U & I Resources Pvt. Ltd',
    slug: 'u-i-resources-pvt-ltd',
    website: 'https://uandibrandsolutions.com/',
    description: 'U & I Resources Pvt. Ltd is one stop solution provider for your advertising, branding, marketing, events, exhibition & MICE needs, based in Surat.',
    industry: 'Advertising',
    employee_count: 10,
    founded_year: '2003',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Limpid Systems',
    slug: 'limpid-systems',
    website: 'https://www.limpidsystems.com/',
    description: 'A software development company having expertise in web, app, custom software development, ecommerce, AI automation, and Chrome extension development.',
    industry: 'Web Development',
    employee_count: 10,
    founded_year: '2019',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'VBS Global',
    slug: 'vbs-global',
    website: 'https://vbsglobal.co/',
    description: 'VBS Global offers outsourced bookkeeping, payroll, tax processing, and virtual CFO services for businesses in USA, UK & Australia.',
    industry: 'Finance & Accounting Outsourcing',
    employee_count: 50,
    founded_year: '2016',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'SEO Professionals',
    slug: 'seo-professionals',
    website: 'https://seoprofessionals.in/',
    description: 'Result Oriented Digital Marketing Agency.',
    industry: 'SEO',
    employee_count: 10,
    founded_year: '2008',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'DashStack',
    slug: 'dashstack-infotech-ai-powered-cross-platform-full-stack-app-development',
    website: 'https://www.dashstack.tech/',
    description: 'We build scalable Flutter apps with AI, IoT, and cloud integrations to deliver high-performance cross-platform solutions.',
    industry: 'Mobile App Development',
    employee_count: 2,
    founded_year: '2022',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'ADPenguin',
    slug: 'adpenguin',
    website: 'https://adpenguin.in/',
    description: 'AdPenguin is a digital marketing agency in Surat specializing in SEO, social media, and ads to boost brand visibility and drive business growth.',
    industry: 'SEO',
    employee_count: 2,
    founded_year: '2024',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Codeline Infotech LLP',
    slug: 'codeline-infotech-llp',
    website: 'https://www.codelineinfotech.com/',
    description: "Innovative solutions for tomorrow's technology.",
    industry: 'Mobile App Development',
    employee_count: 10,
    founded_year: '2018',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Verloop Web',
    slug: 'verloop-web',
    website: 'https://verloopweb.com',
    description: 'Verloop Web - Web Development Company | SEO Services | Digital Marketing.',
    industry: 'Web Development',
    employee_count: 10,
    founded_year: '2013',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Astha Technology Solutions Private Limited',
    slug: 'astha-technology-solutions-private-limited',
    website: 'https://asthatechnology.com',
    description: 'Astha Technology Solutions Pvt. Ltd. provides professional management with 13+ years of experience in Internet Marketing.',
    industry: 'Pay Per Click',
    employee_count: 10,
    founded_year: '2008',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Qbits9',
    slug: 'qbits9',
    website: 'https://qbits9.com',
    description: 'Leading Technology Solutions.',
    industry: 'E-Commerce Development',
    employee_count: 10,
    founded_year: '2024',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'SetBlue',
    slug: 'setblue',
    website: 'https://www.setblue.com/',
    description: 'Setting Brands Globally.',
    industry: 'E-Commerce Development',
    employee_count: 10,
    founded_year: '2004',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Codeyes Infotech',
    slug: 'codeyes-infotech',
    website: 'https://codeyesinfotech.com/',
    description: 'Codeyes offers top-notch software, mobile apps, website development, and CRM solutions to meet client needs.',
    industry: 'E-Commerce Development',
    employee_count: 10,
    founded_year: '2018',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Meritorious Global',
    slug: 'meritorious-global',
    website: 'https://meritorious.global',
    description: '8+ Years Experience — with years of experience and a team of highly skilled professionals.',
    industry: 'Mobile App Development',
    employee_count: 10,
    founded_year: '2016',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Sevlex Cybersecurity',
    slug: 'sevlex-cybersecurity',
    website: 'http://www.sevlex.com',
    description: 'Sevlex Cybersecurity has simplified security by creating 3 models for small grade business to enterprise grade, making it less complicated for SMBs.',
    industry: 'Cybersecurity',
    employee_count: 2,
    founded_year: '2025',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Tech Innovators',
    slug: 'tech-innovators-2',
    website: 'https://techinnovators.co.in',
    description: 'We are Innovators — One of the most Versatile Team on Planet. Technology In Our Expertise.',
    industry: 'Custom Software Development',
    employee_count: 10,
    founded_year: '2019',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Tracely Tag',
    slug: 'tracely-tag',
    website: 'https://www.tracelytag.com/',
    description: 'TracelyTag is a secure traceability and brand protection platform combining SaaS, IoT, and smart tagging to protect your supply chain.',
    industry: 'Web Development',
    employee_count: 10,
    founded_year: '2025',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'SEODigitalBoost',
    slug: 'seodigitalboost',
    website: 'https://seodigitalboost.com/',
    description: 'SEODigitalBoost is a Digital Marketing Agency combining AI and data science to deliver faster rankings, higher organic traffic & real business growth.',
    industry: 'Advertising',
    employee_count: 2,
    founded_year: '2021',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Triveni Global Software Services LLP',
    slug: 'triveni-global-software-services-llp',
    website: 'https://triveniglobalsoft.com/',
    description: 'Creating a culture of Dedication, Passion & Goals.',
    industry: 'Web Development',
    employee_count: 50,
    founded_year: '2013',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Fortune Analytica',
    slug: 'fortune-analytica',
    website: 'https://fortuneanalytica.com/',
    description: '360-degree digital marketing agency in India.',
    industry: 'B2B Lead Generation',
    employee_count: 10,
    founded_year: '2020',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'santhyaseo',
    slug: 'santhyaseo',
    website: 'https://www.santhyainfotech.com/',
    description: 'Santhya Infotech offers SEO, ads, and social media marketing solutions to help businesses grow online with measurable results and lasting impact.',
    industry: 'SEO',
    employee_count: 2,
    founded_year: '2024',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
  {
    name: 'Cinesta - Video Production Company',
    slug: 'cinesta-video-production-company',
    website: 'https://cinesta.in/',
    description: 'Cinesta Video Production creates high-quality commercials and advertisements.',
    industry: 'Video Production',
    employee_count: 10,
    founded_year: '2017',
    offices: [
      { city: 'Surat', state: 'Gujarat', is_hq: true },
    ],
  },
];

async function getCoordinates(page, city, state, country = 'India', name) {
    const query = encodeURIComponent(`${name}`);
    await page.goto(`https://www.google.com/maps/search/${query}`, {
        waitUntil: 'domcontentloaded',  // ← change this from 'networkidle'
        timeout: 30000
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

function formatOutput(companies) {
    const lines = companies.map((company, i) => {
        const isLast = i === companies.length - 1;
        const office = company.offices[0];
        return `  {
    name: '${company.name}',
    slug: '${company.slug}',
    website: '${company.website}',
    description: '${company.description.replace(/'/g, "\\'")}',
    industry: '${company.industry}',
    employee_count: ${company.employee_count},
    founded_year: '${company.founded_year}',
    offices: [
      { city: '${office.city}', state: '${office.state}', latitude: ${office.latitude}, longitude: ${office.longitude}, is_hq: ${office.is_hq} },
    ],
  }${isLast ? '' : ','}`;
    });

    return `[\n${lines.join('\n')}\n]`;
}

(async () => {
    console.log('🚀 Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Cache: since all companies are in Surat, fetch coords only once
    // const coordCache = {};
    const enriched = [];

    for (const company of companies) {
        const office = company.offices[0];
        // const cacheKey = `${office.city}-${office.state}`;

        try {
            // if (!coordCache[cacheKey]) {
            console.log(`📍 Fetching coordinates for ${company.name}...`);
            let coords = await getCoordinates(page, office.city, office.state, "", company.name);
            console.log(`   ✅ Got: ${coords.latitude}, ${coords.longitude}`);
            await page.waitForTimeout(1000);
            // }


            enriched.push({
                ...company,
                offices: [{
                    ...office,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }],
            });

            console.log(`✅ ${company.name}`);
        } catch (err) {
            console.error(`❌ Failed for ${company.name}: ${err.message}`);
            enriched.push(company); // push without coords if failed
        }
    }

    await browser.close();

    const output = formatOutput(enriched);
    fs.writeFileSync('companies.js', `const companies = ${output};\n\nmodule.exports = companies;\n`);
    console.log('\n🎉 Done! File saved as companies.js');
})();