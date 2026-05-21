const companies = [
  { name: 'Razorpay', slug: 'razorpay', website: 'https://razorpay.com', description: 'Payment gateway and financial solutions for businesses in India.', industry: 'Fintech', ats_platform: 'greenhouse', ats_identifier: 'razorpay', is_hiring: true, employee_count: 3000, founded_year: '2014' },
  { name: 'Zerodha', slug: 'zerodha', website: 'https://zerodha.com', description: 'India\'s largest stock broker offering free equity investments.', industry: 'Fintech', is_hiring: true, employee_count: 1200, founded_year: '2010' },
  { name: 'Flipkart', slug: 'flipkart', website: 'https://flipkart.com', description: 'India\'s leading e-commerce marketplace.', industry: 'E-commerce', ats_platform: 'greenhouse', is_hiring: true, employee_count: 35000, founded_year: '2007' },
  { name: 'Swiggy', slug: 'swiggy', website: 'https://swiggy.com', description: 'Food delivery and quick commerce platform.', industry: 'Food Tech', ats_platform: 'lever', is_hiring: true, employee_count: 5000, founded_year: '2014' },
  { name: 'Zomato', slug: 'zomato', website: 'https://zomato.com', description: 'Restaurant discovery and food delivery service.', industry: 'Food Tech', is_hiring: true, employee_count: 4000, founded_year: '2008' },
  { name: 'CRED', slug: 'cred', website: 'https://cred.club', description: 'Fintech platform rewarding credit card bill payments.', industry: 'Fintech', ats_platform: 'lever', is_hiring: true, employee_count: 800, founded_year: '2018' },
  { name: 'Postman', slug: 'postman', website: 'https://postman.com', description: 'API platform for building and using APIs.', industry: 'Developer Tools', ats_platform: 'greenhouse', is_hiring: true, employee_count: 700, founded_year: '2014' },
  { name: 'Freshworks', slug: 'freshworks', website: 'https://freshworks.com', description: 'Cloud-based business software for companies of all sizes.', industry: 'SaaS', ats_platform: 'greenhouse', is_hiring: true, employee_count: 5500, founded_year: '2010' },
  { name: 'PhonePe', slug: 'phonepe', website: 'https://phonepe.com', description: 'Digital payments platform built on UPI.', industry: 'Fintech', is_hiring: true, employee_count: 6000, founded_year: '2015' },
  { name: 'Meesho', slug: 'meesho', website: 'https://meesho.com', description: 'Social commerce platform for small businesses.', industry: 'E-commerce', ats_platform: 'lever', is_hiring: true, employee_count: 2000, founded_year: '2015' },
  { name: 'Zoho', slug: 'zoho', website: 'https://zoho.com', description: 'Suite of online productivity tools and SaaS applications.', industry: 'SaaS', is_hiring: true, employee_count: 15000, founded_year: '1996' },
  { name: 'InMobi', slug: 'inmobi', website: 'https://inmobi.com', description: 'Mobile advertising and discovery platform.', industry: 'AdTech', ats_platform: 'greenhouse', is_hiring: true, employee_count: 1500, founded_year: '2007' },
  { name: 'Hasura', slug: 'hasura', website: 'https://hasura.io', description: 'Instant GraphQL APIs on your data.', industry: 'Developer Tools', ats_platform: 'lever', is_hiring: true, employee_count: 200, founded_year: '2017' },
  { name: 'Chargebee', slug: 'chargebee', website: 'https://chargebee.com', description: 'Subscription billing and revenue management platform.', industry: 'SaaS', ats_platform: 'greenhouse', is_hiring: true, employee_count: 900, founded_year: '2011' },
  { name: 'BrowserStack', slug: 'browserstack', website: 'https://browserstack.com', description: 'Cloud-based cross-browser testing platform.', industry: 'Developer Tools', ats_platform: 'lever', is_hiring: true, employee_count: 800, founded_year: '2011' },
  { name: 'Groww', slug: 'groww', website: 'https://groww.in', description: 'Investment platform for stocks, mutual funds, and more.', industry: 'Fintech', is_hiring: true, employee_count: 1000, founded_year: '2016' },
  { name: 'ShareChat', slug: 'sharechat', website: 'https://sharechat.com', description: 'Indian social media platform for regional content.', industry: 'Social Media', is_hiring: true, employee_count: 2500, founded_year: '2015' },
  { name: 'Ola', slug: 'ola', website: 'https://olacabs.com', description: 'Ride-hailing and mobility platform.', industry: 'Mobility', is_hiring: true, employee_count: 8000, founded_year: '2010' },
  { name: 'Nykaa', slug: 'nykaa', website: 'https://nykaa.com', description: 'Beauty and fashion e-commerce platform.', industry: 'E-commerce', is_hiring: true, employee_count: 3500, founded_year: '2012' },
  { name: 'Lenskart', slug: 'lenskart', website: 'https://lenskart.com', description: 'Omnichannel eyewear retailer.', industry: 'Retail', is_hiring: true, employee_count: 10000, founded_year: '2010' },
];

// Offices across Bangalore, Pune, Hyderabad with real-ish coordinates
const offices = [
  { company_slug: 'razorpay', city: 'Bangalore', state: 'Karnataka', address: 'SJR Cyber, Hosur Road, Bangalore', latitude: 12.9170, longitude: 77.6230, is_hq: true },
  { company_slug: 'zerodha', city: 'Bangalore', state: 'Karnataka', address: '#153/154, 4th Cross, J.P Nagar, Bangalore', latitude: 12.9070, longitude: 77.5856, is_hq: true },
  { company_slug: 'flipkart', city: 'Bangalore', state: 'Karnataka', address: 'Embassy Tech Village, Outer Ring Road, Bangalore', latitude: 12.9352, longitude: 77.6245, is_hq: true },
  { company_slug: 'swiggy', city: 'Bangalore', state: 'Karnataka', address: 'Helios Business Park, Kadabeesanahalli, Bangalore', latitude: 12.9380, longitude: 77.6920, is_hq: true },
  { company_slug: 'zomato', city: 'Bangalore', state: 'Karnataka', address: 'Indiranagar, Bangalore', latitude: 12.9784, longitude: 77.6408 },
  { company_slug: 'cred', city: 'Bangalore', state: 'Karnataka', address: 'HSR Layout, Bangalore', latitude: 12.9116, longitude: 77.6474, is_hq: true },
  { company_slug: 'postman', city: 'Bangalore', state: 'Karnataka', address: 'Koramangala, Bangalore', latitude: 12.9279, longitude: 77.6271, is_hq: true },
  { company_slug: 'freshworks', city: 'Bangalore', state: 'Karnataka', address: 'Prestige Loka, Brunton Road, Bangalore', latitude: 12.9700, longitude: 77.6090 },
  { company_slug: 'phonepe', city: 'Bangalore', state: 'Karnataka', address: 'Salarpuria Softzone, Bellandur, Bangalore', latitude: 12.9250, longitude: 77.6760, is_hq: true },
  { company_slug: 'meesho', city: 'Bangalore', state: 'Karnataka', address: 'Helios Business Park, Bangalore', latitude: 12.9365, longitude: 77.6900, is_hq: true },
  // Pune offices
  { company_slug: 'freshworks', city: 'Pune', state: 'Maharashtra', address: 'Hinjewadi IT Park, Pune', latitude: 18.5912, longitude: 73.7390, is_hq: false },
  { company_slug: 'flipkart', city: 'Pune', state: 'Maharashtra', address: 'Kharadi, Pune', latitude: 18.5520, longitude: 73.9400 },
  { company_slug: 'swiggy', city: 'Pune', state: 'Maharashtra', address: 'Kalyani Nagar, Pune', latitude: 18.5465, longitude: 73.9020 },
  { company_slug: 'browserstack', city: 'Pune', state: 'Maharashtra', address: 'Balewadi, Pune', latitude: 18.5790, longitude: 73.7690 },
  { company_slug: 'lenskart', city: 'Pune', state: 'Maharashtra', address: 'Baner, Pune', latitude: 18.5590, longitude: 73.7868 },
  // Hyderabad offices
  { company_slug: 'zomato', city: 'Hyderabad', state: 'Telangana', address: 'HITEC City, Hyderabad', latitude: 17.4435, longitude: 78.3772, is_hq: false },
  { company_slug: 'phonepe', city: 'Hyderabad', state: 'Telangana', address: 'Gachibowli, Hyderabad', latitude: 17.4401, longitude: 78.3489 },
  { company_slug: 'sharechat', city: 'Hyderabad', state: 'Telangana', address: 'Madhapur, Hyderabad', latitude: 17.4484, longitude: 78.3908 },
  { company_slug: 'zoho', city: 'Hyderabad', state: 'Telangana', address: 'Kondapur, Hyderabad', latitude: 17.4590, longitude: 78.3574 },
  { company_slug: 'inmobi', city: 'Hyderabad', state: 'Telangana', address: 'Nanakramguda, Hyderabad', latitude: 17.4186, longitude: 78.3810 },
];

const sampleJobs = [
  { title: 'Senior Frontend Engineer', department: 'Engineering', work_type: 'hybrid', salary_min: 2000000, salary_max: 3500000, experience_min: 3, experience_max: 6 },
  { title: 'Backend Developer (Node.js)', department: 'Engineering', work_type: 'onsite', salary_min: 1500000, salary_max: 2800000, experience_min: 2, experience_max: 5 },
  { title: 'Full Stack Developer', department: 'Engineering', work_type: 'hybrid', salary_min: 1800000, salary_max: 3200000, experience_min: 2, experience_max: 5 },
  { title: 'DevOps Engineer', department: 'Infrastructure', work_type: 'remote', salary_min: 2200000, salary_max: 4000000, experience_min: 3, experience_max: 7 },
  { title: 'Product Manager', department: 'Product', work_type: 'hybrid', salary_min: 2500000, salary_max: 4500000, experience_min: 4, experience_max: 8 },
  { title: 'Data Scientist', department: 'Data', work_type: 'hybrid', salary_min: 2000000, salary_max: 3800000, experience_min: 2, experience_max: 5 },
  { title: 'Machine Learning Engineer', department: 'AI/ML', work_type: 'onsite', salary_min: 2500000, salary_max: 5000000, experience_min: 3, experience_max: 6 },
  { title: 'UX Designer', department: 'Design', work_type: 'hybrid', salary_min: 1200000, salary_max: 2500000, experience_min: 2, experience_max: 5 },
  { title: 'QA Engineer', department: 'Engineering', work_type: 'onsite', salary_min: 1000000, salary_max: 2000000, experience_min: 1, experience_max: 4 },
  { title: 'iOS Developer (Swift)', department: 'Engineering', work_type: 'hybrid', salary_min: 1800000, salary_max: 3200000, experience_min: 2, experience_max: 5 },
  { title: 'Android Developer (Kotlin)', department: 'Engineering', work_type: 'hybrid', salary_min: 1800000, salary_max: 3200000, experience_min: 2, experience_max: 5 },
  { title: 'Site Reliability Engineer', department: 'Infrastructure', work_type: 'remote', salary_min: 2500000, salary_max: 4500000, experience_min: 4, experience_max: 8 },
  { title: 'React Developer', department: 'Engineering', work_type: 'hybrid', salary_min: 1500000, salary_max: 2800000, experience_min: 1, experience_max: 4 },
  { title: 'Technical Lead', department: 'Engineering', work_type: 'onsite', salary_min: 3500000, salary_max: 6000000, experience_min: 7, experience_max: 12 },
  { title: 'Security Engineer', department: 'Security', work_type: 'onsite', salary_min: 2200000, salary_max: 4000000, experience_min: 3, experience_max: 7 },
];

exports.seed = async function (knex) {
  await knex('jobs').del();
  await knex('offices').del();
  await knex('companies').del();

  // Insert companies
  const insertedCompanies = await knex('companies').insert(companies).returning(['id', 'slug']);

  const slugToId = {};
  insertedCompanies.forEach((c) => { slugToId[c.slug] = c.id; });

  // Insert offices
  const officeRows = offices.map((o) => ({
    company_id: slugToId[o.company_slug],
    city: o.city,
    state: o.state,
    country: 'India',
    address: o.address,
    latitude: o.latitude,
    longitude: o.longitude,
    is_hq: o.is_hq || false,
  }));

  const insertedOffices = await knex('offices').insert(officeRows).returning(['id', 'company_id']);

  // Insert jobs — 3-5 random jobs per company per office
  const jobRows = [];
  const now = new Date();
  insertedOffices.forEach((office) => {
    const numJobs = 3 + Math.floor(Math.random() * 3);
    const shuffled = [...sampleJobs].sort(() => Math.random() - 0.5).slice(0, numJobs);
    shuffled.forEach((job) => {
      const daysAgo = Math.floor(Math.random() * 30);
      const postedAt = new Date(now.getTime() - daysAgo * 86400000);
      jobRows.push({
        company_id: office.company_id,
        office_id: office.id,
        title: job.title,
        description: `We are looking for a ${job.title} to join our team. This is an exciting opportunity to work on challenging problems at scale.`,
        source_url: `https://example.com/jobs/${office.company_id}-${job.title.toLowerCase().replace(/\s+/g, '-')}`,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        salary_currency: 'INR',
        experience_min: job.experience_min,
        experience_max: job.experience_max,
        work_type: job.work_type,
        department: job.department,
        is_active: true,
        posted_at: postedAt,
      });
    });
  });

  await knex('jobs').insert(jobRows);
};
