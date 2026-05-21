# JobMap

JobMap is a high-performance platform that scrapes enterprise and startup job listings from ATS platforms and custom career pages, displaying them on an interactive map UI.

## Architecture overview
- **Client (React/Vite)**: The frontend user interface.
- **Server (Node.js/Express)**: The backend API that serves data to the UI.
- **Scraper (Node.js/BullMQ/Playwright)**: A background worker system that intelligently discovers and scrapes job postings.
- **Infrastructure (Docker)**: PostgreSQL (Database) and Redis (Task Queue).

---

## 🛠️ First-Time Setup
*Run these steps only once when setting up the project on a new machine.*

**1. Start the Infrastructure (Docker)**
Start your PostgreSQL database, Redis queue, and the background scraper worker container.
```bash
docker-compose up -d --build
```

**2. Initialize the Database**
Before anything can be saved, you need to create the database tables.
```bash
cd server
npm install
npm run migrate
```
*(Note: You do not need to run `npm run seed` here unless you just want fake mock data).*

**3. Install Frontend & Scraper Dependencies**
```bash
# Install frontend dependencies
cd ../client
npm install

# Install scraper dependencies (needed to trigger jobs locally)
cd ../scraper
npm install
```

---

## 🚀 Starting the Project (Every Time)
*Whenever you sit down to work on or run the project, open your terminal and run these processes.*

**1. Start Infrastructure & Background Worker**
Make sure your database, Redis, and scraper worker are running in the background.
```bash
docker-compose up -d
```

**2. Start the Backend API**
Open a new terminal tab/window:
```bash
cd server
npm run dev
```

**3. Start the Frontend UI**
Open a new terminal tab/window:
```bash
cd client
npm run dev
```

Your app is now live! The UI is available at `http://localhost:5173` and the API at `http://localhost:3001`.

---

## 🏗️ Managing Companies & Triggering the Scraper

The Docker container `jobmap-scraper` runs continuously in the background, but it stays idle until you tell it to scrape.

**To add new companies:**
1. Open `scraper/src/companies.js`
2. Add a new company object to the array. (e.g., provide the `website` and `name`, and the worker will intelligently try to auto-discover their career page for you).

**To trigger the scraper and seed the database:**
Whenever you add a new company or just want to refresh the job listings, run the scraper seeder.
Open a terminal and run:
```bash
cd scraper
npm run scrape
```

This script reads your `companies.js` file, registers any new companies in your Postgres database, and immediately enqueues them into BullMQ. Your background Docker worker will instantly pick them up and start scraping!

*(Tip: You can monitor the background worker's live scraping progress by running `docker logs -f jobmap-scraper`).*
