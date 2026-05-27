<p align="center">
  <h1 align="center">🗺️ JobMap</h1>
  <p align="center">
    Discover tech jobs on an interactive map — scrape, search, explore.
  </p>
  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-data-pipeline">Data Pipeline</a> •
    <a href="#-api-reference">API Reference</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</p>

---

JobMap is a full-stack platform that automatically discovers company career pages, scrapes job listings from ATS platforms and custom career sites, and displays them on a real-time interactive map with high-performance fuzzy search powered by Meilisearch.

## ✨ Features

- 🗺️ **Interactive Map UI** — Browse jobs geographically with Leaflet, custom markers, and glassmorphism dark-mode design
- 🔍 **Instant Fuzzy Search** — Typo-tolerant, sub-millisecond search via Meilisearch with auto-suggestions
- 🤖 **AI-Powered Career Discovery** — Uses Qwen3 LLM (deployed on Modal) to research and validate company career page URLs
- 🕷️ **Multi-Strategy Scraping** — Greenhouse, Lever, Ashby APIs + Playwright-rendered generic career pages
- 📍 **Auto Location Enrichment** — Scrapes Google Maps for company office coordinates
- 🔐 **Authorized Admin API** — Token-protected bulk endpoints for the entire data lifecycle
- 🔄 **Real-Time Indexing** — Jobs and companies are indexed in Meilisearch the moment they're inserted

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         JobMap Platform                         │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   Client     │   Server     │   Scraper    │  Infrastructure    │
│   (React)    │   (Express)  │   (Node.js)  │   (Docker)         │
├──────────────┼──────────────┼──────────────┼────────────────────┤
│ • Vite       │ • REST API   │ • Playwright │ • PostgreSQL 16    │
│ • Leaflet    │ • Knex ORM   │ • Axios      │ • Redis 7          │
│ • Dark mode  │ • Admin Auth │ • Cheerio    │ • Meilisearch v1.12│
│ • SearchBar  │ • Meilisearch│ • LLM Agent  │ • PostGIS          │
└──────────────┴──────────────┴──────────────┴────────────────────┘
```

| Layer | Stack | Description |
|-------|-------|-------------|
| **Client** | React 18, Vite, Leaflet, CSS | Interactive map UI with search, filters, and city selector |
| **Server** | Node.js, Express, Knex, Meilisearch | REST API + authorized admin endpoints for data ingestion |
| **Scraper** | Playwright, Axios, Cheerio | Multi-strategy job scraper with AI-powered career page discovery |
| **AI Agent** | Python, Modal.com, Qwen3-14B | Cloud-deployed LLM that researches career page URLs |
| **Infra** | Docker Compose | PostgreSQL (PostGIS), Redis, Meilisearch — all containerized |

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **Docker** & Docker Compose
- **Python** ≥ 3.10 *(only for career URL research)*

### 1. Clone & Configure

```bash
git clone https://github.com/ShubhanshuPandey05/job-seek.git
cd job-seek

# Copy environment template and configure
cp .env.example .env
# Edit .env — set your ADMIN_API_TOKEN (any random string), API keys, etc.
```

### 2. Start Infrastructure

```bash
# Start PostgreSQL, Redis, and Meilisearch containers
docker-compose up -d
```

### 3. Setup Server

```bash
cd server
npm install

# Run database migrations
npm run migrate

# Start the API server
npm run dev
```

The server starts at `http://localhost:3001`. On startup, it automatically syncs existing data to Meilisearch.

### 4. Setup Client

```bash
cd client
npm install
npm run dev
```

The UI is live at `http://localhost:5173`.

### 5. Setup Scraper *(optional — for data ingestion)*

```bash
cd scraper
npm install

# Install Playwright browsers (needed for location & job scraping)
npx playwright install chromium
```

## 📊 Data Pipeline

The data flows through 4 sequential stages. Each stage reads from and writes to the database via the **authorized Admin API** — no direct DB access from scraper scripts.

```
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │  1. Seed     │──▶ │ 2. Locations │ ──▶ │ 3. Career    │ ──▶│ 4. Jobs      │
 │  Companies   │     │  (Google     │     │    URLs      │     │  (Scrape     │
 │  (JSON→API)  │     │   Maps)      │     │  (LLM Agent) │     │   careers)   │
 └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       ↓                     ↓                    ↓                    ↓
   POST /bulk          PATCH /bulk/         PATCH /:id/          POST /jobs/
   companies           locations            career-url            bulk
       ↓                     ↓                    ↓                    ↓
  ┌────────────────────────────────────────────────────────────────────────────┐
  │                     PostgreSQL + Meilisearch (auto-indexed)               │
  └────────────────────────────────────────────────────────────────────────────┘
```

### Stage 1: Seed Companies

Place your company data in `scraper/data/all-companies.json` (supports both raw and pre-formatted structures):

```bash
cd scraper
npm run seed:api
```

This bulk-inserts companies + offices into the DB and indexes them in Meilisearch. The script auto-detects raw TechBehemoths format and transforms it via `formatCompanyData.js`.

### Stage 2: Enrich Locations

Scrapes Google Maps for companies missing office coordinates:

```bash
cd scraper
npm run findlocations
```

Reads companies without coordinates from the API, scrapes Google Maps using Playwright, and batch-updates coordinates.

### Stage 3: Discover Career URLs

Uses a cloud-deployed LLM agent (Qwen3 on Modal) to research career pages:

```bash
cd scraper/modal.com
python run_career_search.py
```

Fetches companies without career URLs from the API, sends each to the LLM agent, and updates the DB one-by-one as URLs are found.

### Stage 4: Scrape Jobs

Scrapes job listings from career pages and ATS platforms:

```bash
cd scraper
npm run orchestrate
```

Reads companies with career URLs from the API, scrapes jobs via Playwright/ATS APIs, and bulk-inserts them with automatic Meilisearch indexing.

## 📡 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search?q=react` | Fuzzy search jobs & companies via Meilisearch |
| `GET` | `/api/jobs` | List jobs with filters (city, industry, work_type) |
| `GET` | `/api/companies` | List companies with office data |
| `GET` | `/api/companies/:id` | Get company details with jobs |
| `GET` | `/api/filters` | Get available filter values (cities, industries) |
| `GET` | `/api/health` | Health check |

### Admin Endpoints *(require `Authorization: Bearer <ADMIN_API_TOKEN>`)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/companies/bulk` | Bulk upsert companies + offices |
| `PATCH` | `/api/admin/companies/bulk/locations` | Batch update office coordinates |
| `PATCH` | `/api/admin/companies/:id/career-url` | Update career_url (by ID or slug) |
| `GET` | `/api/admin/companies/without-coordinates` | List companies missing coordinates |
| `GET` | `/api/admin/companies/without-career-url` | List companies missing career URL |
| `GET` | `/api/admin/companies/with-career-url` | List companies with career URL |
| `POST` | `/api/admin/jobs/bulk` | Bulk insert jobs + Meilisearch index |

### Example: Bulk Insert Companies

```bash
curl -X POST http://localhost:3001/api/admin/companies/bulk \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"companies": [{"name": "Acme Corp", "website": "https://acme.com", "offices": [{"city": "Mumbai", "state": "Maharashtra"}]}]}'
```

## 🗂️ Project Structure

```
job-seek/
├── client/                      # React frontend (Vite)
│   └── src/
│       ├── components/          # MapView, SearchBar, Sidebar, etc.
│       ├── App.jsx              # Main layout
│       └── index.css            # Design system (dark glassmorphism)
│
├── server/                      # Express API
│   ├── migrations/              # Knex database migrations
│   └── src/
│       ├── config/              # DB, Meilisearch, Knex config
│       ├── middleware/          # adminAuth.js (Bearer token auth)
│       ├── routes/              # companies, jobs, search, filters, admin
│       └── services/            # meiliSync.js (Postgres ↔ Meilisearch)
│
├── scraper/                     # Data ingestion pipeline
│   ├── data/                    # all-companies.json (canonical data)
│   ├── modal.com/               # Python AI agent (Modal + Qwen3)
│   │   └── run_career_search.py # Career URL researcher
│   └── src/
│       ├── scrapers/            # findLocations.js, greenhouse, lever, etc.
│       ├── utils/               # formatCompanyData.js, logger, browser-pool
│       ├── orchestrator.js      # Job scraping orchestrator
│       └── seed-companies-api.js# Company seeder via admin API
│
├── docker-compose.yml           # PostgreSQL, Redis, Meilisearch
├── .env.example                 # Environment template
└── LICENSE                      # Apache 2.0
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5433` |
| `DB_NAME` | Database name | `jobmap` |
| `DB_USER` | Database user | `jobmap` |
| `DB_PASSWORD` | Database password | `jobmap_secret_123` |
| `MEILI_HOST` | Meilisearch URL | `http://localhost:7700` |
| `MEILI_MASTER_KEY` | Meilisearch API key | `jobmap_meili_master_key_123` |
| `ADMIN_API_TOKEN` | Token for admin API routes | *(generate random)* |
| `API_BASE_URL` | Server URL (for scraper scripts) | `http://localhost:3001` |
| `PORT` | Server port | `3001` |
| `GEMINI_API_KEY` | Google Gemini API key | *(optional)* |
| `TAVILY_API` | Tavily search API key | *(optional, for career research)* |

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the **Apache License 2.0** — see [LICENSE](LICENSE) for details.

Copyright © 2026 Shubhanshu Pandey
