const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/companies — list companies with optional geo filter
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 50000, city, industry, page = 1, limit = 999999 } = req.query;
    const offset = (page - 1) * limit;

    let query = db('companies as c')
      .select(
        'c.id', 'c.name', 'c.slug', 'c.website', 'c.description',
        'c.industry', 'c.logo_url', 'c.is_hiring', 'c.employee_count', 'c.founded_year',
        'o.id as office_id', 'o.city', 'o.state', 'o.address',
        'o.latitude', 'o.longitude', 'o.is_hq'
      )
      .join('offices as o', 'o.company_id', 'c.id');

    // Geo filter
    if (lat && lng) {
      query = query
        .select(db.raw(`ST_Distance(o.location, ST_MakePoint(?, ?)::geography) AS distance_m`, [lng, lat]))
        .whereRaw(`ST_DWithin(o.location, ST_MakePoint(?, ?)::geography, ?)`, [lng, lat, radius])
        .orderBy('distance_m', 'asc');
    }

    // City filter
    if (city) {
      query = query.where('o.city', city);
    }

    // Industry filter
    if (industry) {
      query = query.where('c.industry', industry);
    }

    // Add job count subquery and sort by most jobs first
    query = query
      .select(db.raw('(SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id AND j.is_active = true) as job_count'))
      .orderByRaw('(SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id AND j.is_active = true) DESC')
      .limit(limit)
      .offset(offset);

    const companies = await query;
    res.json({ data: companies, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// GET /api/companies/nearby — companies near a point
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });

    const companies = await db.raw(`
      SELECT c.id, c.name, c.slug, c.industry, c.logo_url, c.is_hiring,
             o.city, o.latitude, o.longitude, o.address,
             ST_Distance(o.location, ST_MakePoint(?, ?)::geography) AS distance_m,
             (SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id AND j.is_active = true) as job_count
      FROM companies c
      JOIN offices o ON o.company_id = c.id
      WHERE ST_DWithin(o.location, ST_MakePoint(?, ?)::geography, ?)
      ORDER BY distance_m ASC
      LIMIT 100
    `, [lng, lat, lng, lat, radius]);

    res.json({ data: companies.rows });
  } catch (err) {
    console.error('Error fetching nearby:', err);
    res.status(500).json({ error: 'Failed to fetch nearby companies' });
  }
});

// GET /api/companies/map — all company markers for map display
router.get('/map', async (req, res) => {
  try {
    const { bounds } = req.query; // "swLng,swLat,neLng,neLat"

    let query = db('companies as c')
      .select('c.id', 'c.name', 'c.slug', 'c.industry', 'c.logo_url',
        'o.latitude', 'o.longitude', 'o.city',
        db.raw('(SELECT COUNT(*) FROM jobs j WHERE j.company_id = c.id AND j.is_active = true) as job_count'))
      .join('offices as o', 'o.company_id', 'c.id');

    if (bounds) {
      const [swLng, swLat, neLng, neLat] = bounds.split(',').map(Number);
      query = query.whereRaw(`
        o.latitude BETWEEN ? AND ? AND o.longitude BETWEEN ? AND ?
      `, [swLat, neLat, swLng, neLng]);
    }

    const markers = await query;
    res.json({ data: markers });
  } catch (err) {
    console.error('Error fetching map data:', err);
    res.status(500).json({ error: 'Failed to fetch map data' });
  }
});

// GET /api/companies/:slug — company detail with jobs
router.get('/:slug', async (req, res) => {
  try {
    const company = await db('companies').where('slug', req.params.slug).first();
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const offices_data = await db('offices').where('company_id', company.id);
    const jobs = await db('jobs')
      .where('company_id', company.id)
      .where('is_active', true)
      .orderBy('posted_at', 'desc');

    res.json({ data: { ...company, offices: offices_data, jobs } });
  } catch (err) {
    console.error('Error fetching company:', err);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

module.exports = router;
