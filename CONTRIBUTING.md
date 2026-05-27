# Contributing to GeoJobs

Thank you for your interest in contributing to GeoJobs! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Adding New Companies](#adding-new-companies)
- [Adding a New Scraper](#adding-a-new-scraper)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We're building something useful together — treat every contributor the way you'd want to be treated.

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/job-seek.git
cd job-seek
```

### 2. Setup Environment

```bash
# Copy and configure environment
cp .env.example .env

# Start infrastructure
docker-compose up -d

# Setup server
cd server && npm install && npm run migrate

# Setup client
cd ../client && npm install

# Setup scraper (optional)
cd ../scraper && npm install
npx playwright install chromium
```

### 3. Start Development

You'll need **3 terminal windows**:

```bash
# Terminal 1 — Server
cd server && npm run dev

# Terminal 2 — Client
cd client && npm run dev

# Terminal 3 — Infrastructure (if not already running)
docker-compose up -d
```

- **UI**: http://localhost:5173
- **API**: http://localhost:3001
- **Meilisearch Dashboard**: http://localhost:7700

## Development Workflow

### Branching

```
main          ← production-ready code
├── feat/*    ← new features
├── fix/*     ← bug fixes
├── docs/*    ← documentation changes
└── refactor/*← code improvements
```

**Branch naming examples:**
- `feat/add-workday-scraper`
- `fix/search-results-pagination`
- `docs/update-api-reference`

### Making Changes

1. Create a branch from `main`
2. Make your changes
3. Test locally (server + client + scraper if applicable)
4. Commit with clear, descriptive messages
5. Push and open a Pull Request

## Project Structure

```
job-seek/
├── client/           # React frontend — UI, map, search
├── server/           # Express backend — API, auth, Meilisearch sync
├── scraper/          # Data pipeline — scrapers, AI agent, seeder
└── docker-compose.yml
```

### Key Files to Know

| File | What it does |
|------|-------------|
| `server/src/routes/admin.js` | Admin API — bulk insert, update endpoints |
| `server/src/middleware/adminAuth.js` | Bearer token authentication |
| `server/src/services/meiliSync.js` | Postgres ↔ Meilisearch sync |
| `scraper/src/orchestrator.js` | Main job scraping pipeline |
| `scraper/src/seed-companies-api.js` | Company seeder (reads JSON → calls API) |
| `scraper/src/utils/formatCompanyData.js` | Raw data → standard format transformer |
| `scraper/src/scrapers/findLocations.js` | Google Maps coordinate scraper |
| `client/src/components/SearchBar.jsx` | Meilisearch-powered search UI |
| `client/src/components/MapView.jsx` | Leaflet interactive map |

## Coding Standards

### JavaScript / Node.js

- Use `const` by default, `let` when reassignment is needed
- Use `async/await` over `.then()` chains
- Add JSDoc comments for exported functions
- Handle errors with try/catch and meaningful error messages
- Use descriptive variable names (`companyId` not `cId`)

### React (Client)

- Functional components with hooks
- Keep components focused — one component, one responsibility
- Use CSS modules or scoped styles (no global style leaks)
- Destructure props at the function signature level

### API Routes

- Return consistent JSON: `{ data, message, error }`
- Use proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Admin routes must use the `adminAuth` middleware
- Always index data in Meilisearch after DB writes

### Database

- All schema changes go through Knex migrations (`server/migrations/`)
- Never modify the database schema directly
- Migration files should have clear up/down functions

### Commit Messages

Use clear, imperative-mood messages:

```
✅ Good:
  feat: add Workday ATS scraper
  fix: search dropdown hidden behind map
  docs: update API reference for admin endpoints

❌ Bad:
  updated stuff
  fix bug
  changes
```

## Submitting Changes

### Pull Request Checklist

- [ ] Branch is up-to-date with `main`
- [ ] Code follows the project's coding standards
- [ ] Server starts without errors (`cd server && npm run dev`)
- [ ] Client builds without errors (`cd client && npm run build`)
- [ ] New API endpoints are documented in README
- [ ] Database changes include a migration file
- [ ] No hardcoded secrets or tokens in the code

### PR Description Template

```markdown
## What does this PR do?
Brief description of the change.

## How to test
Steps to verify the change works.

## Screenshots (if UI change)
Before/after screenshots.
```

## Adding New Companies

**Don't edit code.** Just add companies to the JSON data file and run the seeder:

1. Add company objects to `scraper/data/all-companies.json`
2. Run the seeder: `cd scraper && npm run seed:api`

### Company JSON Format

```json
{
  "name": "Company Name",
  "slug": "company-name",
  "website": "https://company.com",
  "description": "What the company does",
  "industry": "Web Development",
  "employee_count": 50,
  "founded_year": "2020",
  "career_url": "https://company.com/careers",
  "offices": [
    {
      "city": "Mumbai",
      "state": "Maharashtra",
      "latitude": 19.076,
      "longitude": 72.8777,
      "is_hq": true
    }
  ]
}
```

> **Note:** If your data is in the raw TechBehemoths format (with `headquarter`, `services`, `company_size`), the seeder will auto-detect and transform it.

## Adding a New Scraper

To add support for a new ATS platform (e.g., Workday, iCIMS):

1. Create `scraper/src/scrapers/workday.js`
2. Export a `scrape(identifier, options)` function that returns an array of jobs:

```javascript
// scraper/src/scrapers/workday.js

async function scrape(identifier, options = {}) {
  // identifier = company's Workday tenant ID
  // Fetch jobs from Workday API
  // Return array of job objects:
  return [
    {
      title: 'Software Engineer',
      description: 'Job description...',
      source_url: 'https://company.wd5.myworkdayjobs.com/...',
      work_type: 'onsite',        // onsite | remote | hybrid
      department: 'Engineering',
      salary_min: null,
      salary_max: null,
      experience_min: null,
      experience_max: null,
    }
  ];
}

module.exports = { scrape };
```

3. Register it in `scraper/src/orchestrator.js` under the `scrapeAllSources` function
4. Add the ATS platform to `TRUSTED_ATS_PLATFORMS` if the API returns structured, reliable data

## 🐛 Reporting Issues

Open an issue on GitHub with:
- **What happened** (actual behavior)
- **What you expected** (expected behavior)
- **Steps to reproduce**
- **Environment** (OS, Node version, browser)

---

Thank you for contributing! Every improvement matters. 🚀
