Okay for now just impliment the playwright for the scrapping part using 

Playwright, BullMQ, PostgreSQL, and Redis.

The goal is to aggregate startup/company job openings from:

Greenhouse
Lever
Ashby
custom career pages
startup websites

Scraping Strategy

IMPORTANT:
Do NOT use Playwright for every request.

Implement hybrid scraping:

Step 1:

Try simple HTTP fetch using Axios
Parse HTML using Cheerio

Step 2:

If page requires JavaScript rendering
fallback to Playwright

Examples:

SPA websites
React apps
dynamically rendered job lists
infinite scrolling pages
Queue Architecture

Use BullMQ.

Implement:

scraper queue
retry logic
concurrency control
job prioritization
delayed retries

Worker flow:

Receive URL
↓
Detect source type
↓
Try fetch()
↓
If static → parse with Cheerio
↓
Else use Playwright
↓
Extract jobs
↓
Normalize data
↓
Store in PostgreSQL

Playwright Optimization

VERY IMPORTANT:

Reuse browser instances
Reuse contexts
Avoid launching browser per request

Implement:

browser pool
context reuse
graceful shutdown

Add:

request blocking for images/fonts/videos
network optimization
timeout handling

Normalization Layer

Normalize:

locations
titles
salaries
skills

Examples:
ReactJS
React.js
React

→ React

Software Engineer
Software Developer

→ Software Engineer

Scraper Modules

Implement separate modular scrapers:

Greenhouse scraper
Lever scraper
Ashby scraper
Generic career page scraper

Each scraper should:

expose standardized interfaces
return normalized data
support pagination
Generic Career Page Scraper

Build AI-independent heuristic extraction system.

Detect:

careers pages
job cards
apply buttons
title patterns
location patterns

Support:

Next.js
React
Vue
Webflow
Notion career pages
Discovery System

Implement company discovery logic:

sitemap.xml parsing
robots.txt parsing
career keyword detection
crawl depth limiting

Detect URLs like:

/careers
/jobs
/join-us
/work-with-us
Error Handling

Implement:

structured logging
retry logic
dead-letter queue
failed page screenshots
scraper metrics
Anti-Bot Friendly Practices

Implement:

randomized delays
rotating user agents
viewport randomization
rate limiting

DO NOT implement:

LinkedIn scraping
CAPTCHA bypass
illegal bypass systems
Performance Goals

Target:

5–20 concurrent Playwright workers
50k+ ATS pages/day
5k–20k dynamic pages/day

Docker Setup

Edit:

docker-compose.yml
Scraper worker container

so every local companies in the cities could be also explored.