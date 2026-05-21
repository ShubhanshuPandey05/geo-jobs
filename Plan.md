# plan.md

# JobMap — Map Based Job Discovery Platform

## Vision

Build a platform where users can:

* Open a map
* See nearby companies
* Click on companies
* View all active openings
* Apply directly through source links

The platform acts like:

> "Google Maps for Jobs"

---

# Main Goal

Solve the discovery problem in job searching.

Current job platforms are:

* list-based
* keyword dependent
* poor for local discovery

JobMap focuses on:

* location-first discovery
* commute-aware job search
* company exploration
* startup ecosystem visibility

---

# Initial MVP Scope

DO NOT build:

* AI search
* LinkedIn scraping
* global scale
* mobile apps
* microservices

Focus only on:

* map
* companies
* ATS job aggregation
* filters
* simple search

---

# Target Audience

## Phase 1

Tech job seekers in:

* Bangalore
* Pune
* Hyderabad
* Ahmedabad
* Gurgaon
* Surat

---

# Core Features

## 1. Interactive Map

Users can:

* zoom
* pan
* click company pins
* discover nearby companies

---

## 2. Company Profiles

Each company page contains:

* logo
* description
* office location
* website
* hiring status
* active jobs

---

## 3. Job Aggregation

Aggregate jobs from:

* Greenhouse
* Lever
* Ashby
* company career pages

---

## 4. Filters

Users can filter by:

* location
* role
* salary
* remote/hybrid
* experience level
* company type

---

## 5. Search

Basic keyword search:

* React jobs
* Backend Engineer
* AI startup

Use PostgreSQL Full Text Search initially.

---

# Recommended Tech Stack

| Layer         | Technology       |
| ------------- | ---------------- |
| Frontend      | React.js         |
| Styling       | TailwindCSS      |
| Backend       | Node.js          |
| Database      | PostgreSQL       |
| Geo Queries   | PostGIS          |
| Queue         | Redis + BullMQ   |
| Scraping      | Playwright       |
| Hosting       | Self-hosted      |
| Maps          | Mapbox           |
| Reverse Proxy | Nginx            |
| SSL           | Cloudflare       |
| Deployment    | Docker Compose   |

---

# Architecture

```text
Frontend (React.js)
        ↓
Backend API (Node.js)
        ↓
PostgreSQL + PostGIS
        ↓
Redis Queue
        ↓
Scraper Workers
```

---

# Database Design

## Companies Table

```sql
companies
- id
- name
- website
- description
- industry
- logo_url
```

---

## Offices Table

```sql
offices
- id
- company_id
- latitude
- longitude
- address
```

---

## Jobs Table

```sql
jobs
- id
- company_id
- office_id
- title
- description
- source_url
- salary
- posted_at
```

---

# Data Sources

## Priority 1

### Greenhouse

Example:

```text
https://boards-api.greenhouse.io/v1/boards/company/jobs
```

Advantages:

* structured JSON
* public
* easy scraping

---

## Priority 2

### Lever

Example:

```text
https://api.lever.co/v0/postings/company
```

Advantages:

* public API
* includes salary
* includes location

---

## Priority 3

### Ashby

More difficult but still possible.

---

# What NOT To Build Initially

Avoid:

* Elasticsearch
* Kubernetes
* AI embeddings
* LinkedIn scraping
* Indeed scraping
* recommendation systems
* mobile applications

These increase:

* complexity
* infra cost
* maintenance burden

---

# Search Strategy

## Phase 1

Use PostgreSQL Full Text Search.

Advantages:

* free
* fast
* enough for MVP

---

## Phase 2

Move to:

* OpenSearch
  OR
* Elasticsearch

Only after:

* large traffic
* advanced ranking needs

---

# Map Strategy

## Recommended

### Mapbox

Reasons:

* generous free tier
* customizable
* cheaper than Google Maps

---

# Scraping Architecture

```text
Scheduler
   ↓
BullMQ Queue
   ↓
Worker Picks Task
   ↓
Scrape ATS API
   ↓
Normalize Data
   ↓
Save to PostgreSQL
```

---

# Job Normalization

Normalize:

* titles
* skills
* locations
* salaries

Example:

```text
ReactJS
React.js
React

→ React
```

---

# Deduplication Strategy

Same job may appear from:

* company website
* ATS
* aggregator

Use:

* title matching
* company matching
* content hashing

---

# Recommended MVP Goal

Goal:

```text
5,000 companies
50,000 jobs
3 Indian cities
```

---

# Success Metrics

Track:

* users/day
* searches/day
* apply clicks
* session duration
* saved jobs
* returning users

---

# Long-Term Vision

Future features:

* AI job recommendations
* hiring heatmaps
* commute optimization
* salary intelligence
* recruiter analytics
* startup discovery
* global expansion

---

# Final Recommendation

The biggest priority is NOT scale.

The biggest priority is:

> validating whether people actually prefer map-based job discovery.

Build fast.
Keep infra simple.
Avoid overengineering.
Focus on user experience.
