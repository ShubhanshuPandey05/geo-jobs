require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const companiesRouter = require('./routes/companies');
const jobsRouter = require('./routes/jobs');
const searchRouter = require('./routes/search');
const filtersRouter = require('./routes/filters');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/companies', companiesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/search', searchRouter);
app.use('/api/filters', filtersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`JobMap API running on http://localhost:${PORT}`);

  // Kick off Meilisearch sync in the background (non-blocking)
  const { fullSync } = require('./services/meiliSync');
  fullSync()
    .then((result) => {
      console.log(`[Startup] Meilisearch sync complete: ${result.jobCount} jobs, ${result.companyCount} companies in ${result.elapsed}s`);
    })
    .catch((err) => {
      console.warn('[Startup] Meilisearch sync failed (search will use stale data):', err.message);
    });
});
