/**
 * Normalization Layer
 * Standardizes job titles, locations, skills, and work types
 */

// ─── Title Normalization ──────────────────────────────
const TITLE_SYNONYMS = {
  'software engineer': ['software developer', 'sde', 'software dev', 'sw engineer', 'sw developer'],
  'frontend engineer': ['front end engineer', 'front-end engineer', 'frontend developer', 'front end developer', 'ui engineer', 'ui developer'],
  'backend engineer': ['back end engineer', 'back-end engineer', 'backend developer', 'back end developer', 'server engineer'],
  'fullstack engineer': ['full stack engineer', 'full-stack engineer', 'fullstack developer', 'full stack developer'],
  'devops engineer': ['devops', 'site reliability engineer', 'sre', 'platform engineer', 'infrastructure engineer'],
  'data scientist': ['data science', 'ml engineer', 'machine learning engineer', 'ai engineer', 'ai/ml engineer'],
  'data analyst': ['data analytics', 'business analyst', 'bi analyst'],
  'product manager': ['product management', 'pm', 'product lead', 'product owner'],
  'engineering manager': ['eng manager', 'engineering lead', 'tech lead', 'technical lead', 'team lead engineering'],
  'qa engineer': ['quality assurance', 'test engineer', 'sdet', 'quality engineer', 'automation tester'],
};

// ─── Skill Normalization ──────────────────────────────
const SKILL_SYNONYMS = {
  'react': ['reactjs', 'react.js', 'react js'],
  'node.js': ['nodejs', 'node js', 'node'],
  'vue': ['vuejs', 'vue.js', 'vue js'],
  'angular': ['angularjs', 'angular.js', 'angular js'],
  'typescript': ['ts'],
  'javascript': ['js'],
  'python': ['python3', 'python 3'],
  'java': ['java8', 'java 8', 'java11', 'java 11', 'java17'],
  'go': ['golang'],
  'rust': ['rustlang'],
  'kubernetes': ['k8s'],
  'docker': ['containerization'],
  'aws': ['amazon web services'],
  'gcp': ['google cloud', 'google cloud platform'],
  'azure': ['microsoft azure'],
  'postgresql': ['postgres', 'psql'],
  'mongodb': ['mongo'],
  'redis': ['redis cache'],
  'elasticsearch': ['elastic search', 'elastic'],
  'graphql': ['graph ql'],
  'rest api': ['restful api', 'rest apis', 'restful'],
  'ci/cd': ['cicd', 'ci cd', 'continuous integration'],
  'machine learning': ['ml'],
  'deep learning': ['dl'],
  'natural language processing': ['nlp'],
  'computer vision': ['cv'],
};

// ─── Location Normalization ───────────────────────────
const CITY_ALIASES = {
  'Bangalore': ['bengaluru', 'blr', 'bangalore', 'karnataka'],
  'Surat': ['surat', 'gujarat'],
  'Mumbai': ['mumbai', 'bombay'],
  'Delhi': ['delhi', 'new delhi', 'ncr', 'noida', 'gurgaon', 'gurugram'],
  'Hyderabad': ['hyderabad', 'hyd', 'telangana'],
  'Pune': ['pune', 'maharashtra'],
  'Chennai': ['chennai', 'madras'],
  'Kolkata': ['kolkata', 'calcutta'],
  'Ahmedabad': ['ahmedabad'],
};

// ─── Department Classification ────────────────────────
function classifyDepartment(title) {
  if (!title) return 'General';
  const t = title.toLowerCase();

  if (/\b(engineer|developer|swe|software|frontend|backend|fullstack|ios|android|mobile|web dev)\b/.test(t)) return 'Engineering';
  if (/\b(data scien|machine learning|ml |ai |deep learning|nlp|computer vision)\b/.test(t)) return 'Data & AI';
  if (/\b(data analy|business analy|bi |analytics)\b/.test(t)) return 'Analytics';
  if (/\b(devops|sre|infrastructure|platform|cloud|reliability)\b/.test(t)) return 'Infrastructure';
  if (/\b(product manager|product lead|product owner|product management)\b/.test(t)) return 'Product';
  if (/\b(design|ux|ui |user experience|user interface|graphic)\b/.test(t)) return 'Design';
  if (/\b(marketing|growth|seo|content|brand|social media|digital market)\b/.test(t)) return 'Marketing';
  if (/\b(sales|account exec|business dev|revenue|commercial)\b/.test(t)) return 'Sales';
  if (/\b(hr|recruit|talent|people|human resource)\b/.test(t)) return 'People';
  if (/\b(finance|accounting|compliance|tax|treasury|audit)\b/.test(t)) return 'Finance';
  if (/\b(support|customer success|solutions|client)\b/.test(t)) return 'Customer Success';
  if (/\b(security|offensive|appsec|infosec|cybersec)\b/.test(t)) return 'Security';
  if (/\b(qa|quality|test|sdet|automation tester)\b/.test(t)) return 'QA';
  if (/\b(legal|counsel|attorney)\b/.test(t)) return 'Legal';
  if (/\b(operations|ops |strategy)\b/.test(t)) return 'Operations';
  return 'General';
}

// ─── Work Type Detection ──────────────────────────────
function detectWorkType(locationStr = '', titleStr = '', descStr = '') {
  const text = `${locationStr} ${titleStr} ${descStr}`.toLowerCase();
  if (/\b(remote|work from home|wfh|anywhere)\b/.test(text)) return 'remote';
  if (/\b(hybrid|flexible|2.?days?.?(office|onsite)|3.?days?.?(office|onsite))\b/.test(text)) return 'hybrid';
  return 'onsite';
}

// ─── City Matching ────────────────────────────────────
function matchCity(locationStr = '') {
  const loc = locationStr.toLowerCase();
  for (const [city, aliases] of Object.entries(CITY_ALIASES)) {
    if (aliases.some(a => loc.includes(a))) return city;
  }
  // Broad India match
  if (loc.includes('india')) return 'Bangalore';
  return null;
}

// ─── Experience Level Detection ───────────────────────
function detectExperienceLevel(title = '', desc = '') {
  const text = `${title} ${desc}`.toLowerCase();
  if (/\b(intern|internship|trainee|graduate|entry.?level|fresher)\b/.test(text)) return 'intern';
  if (/\b(junior|jr\.?|associate|i |level.?1)\b/.test(text)) return 'junior';
  if (/\b(senior|sr\.?|lead|principal|staff|iii|iv|level.?[345])\b/.test(text)) return 'senior';
  if (/\b(manager|director|head|vp|vice president|chief|c-level|cto|ceo)\b/.test(text)) return 'leadership';
  return 'mid';
}

// ─── Salary Parsing ───────────────────────────────────
function parseSalary(text = '') {
  if (!text) return { min: null, max: null, currency: 'INR' };
  const t = text.replace(/,/g, '');

  // INR patterns: ₹10L-20L, 10-20 LPA, 10,00,000
  let match = t.match(/(?:₹|inr|rs\.?)\s*(\d+(?:\.\d+)?)\s*(?:l|lpa|lakh)/i);
  if (match) {
    const val = parseFloat(match[1]) * 100000;
    const rangeMatch = t.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(?:l|lpa|lakh)/i);
    if (rangeMatch) {
      return { min: parseFloat(rangeMatch[1]) * 100000, max: parseFloat(rangeMatch[2]) * 100000, currency: 'INR' };
    }
    return { min: val, max: null, currency: 'INR' };
  }

  // USD patterns: $100k-$150k
  match = t.match(/\$\s*(\d+)k?\s*-\s*\$?\s*(\d+)k/i);
  if (match) {
    return { min: parseInt(match[1]) * 1000, max: parseInt(match[2]) * 1000, currency: 'USD' };
  }

  return { min: null, max: null, currency: 'INR' };
}

// ─── Main Normalize Function ──────────────────────────
function normalizeJob(raw) {
  return {
    title: raw.title?.trim() || 'Unknown Position',
    description: raw.description?.trim() || '',
    source_url: raw.source_url || '',
    external_id: raw.external_id || null,
    department: raw.department || classifyDepartment(raw.title),
    work_type: raw.work_type || detectWorkType(raw.location_raw, raw.title, raw.description),
    matched_city: raw.matched_city || matchCity(raw.location_raw || ''),
    location_raw: raw.location_raw || '',
    experience_level: raw.experience_level || detectExperienceLevel(raw.title, raw.description),
    salary: raw.salary || parseSalary(raw.salary_raw || ''),
    posted_at: raw.posted_at || new Date().toISOString(),
    ats_platform: raw.ats_platform || 'unknown',
  };
}

module.exports = {
  normalizeJob,
  classifyDepartment,
  detectWorkType,
  matchCity,
  detectExperienceLevel,
  parseSalary,
  CITY_ALIASES,
  TITLE_SYNONYMS,
  SKILL_SYNONYMS,
};
