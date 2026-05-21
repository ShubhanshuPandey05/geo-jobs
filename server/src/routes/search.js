const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/search?q=react+developer&city=Bangalore
router.get('/', async (req, res) => {
  try {
    const { q, city, work_type, page = 1, limit = 25 } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query (q) is required' });

    const offset = (page - 1) * limit;
    const tsQuery = q.split(/\s+/).join(' & ');

    const results = await db.raw(`
      SELECT j.id, j.title, j.work_type, j.department, j.salary_min, j.salary_max,
             j.experience_min, j.experience_max, j.source_url, j.posted_at,
             c.name as company_name, c.slug as company_slug, c.logo_url as company_logo,
             o.city, o.latitude, o.longitude,
             ts_rank(to_tsvector('english', COALESCE(j.title, '') || ' ' || COALESCE(j.description, '')),
                     to_tsquery('english', ?)) AS rank
      FROM jobs j
      JOIN companies c ON c.id = j.company_id
      LEFT JOIN offices o ON o.id = j.office_id
      WHERE j.is_active = true
        AND to_tsvector('english', COALESCE(j.title, '') || ' ' || COALESCE(j.description, ''))
            @@ to_tsquery('english', ?)
        ${city ? 'AND o.city = ?' : ''}
        ${work_type ? `AND j.work_type = ?` : ''}
      ORDER BY rank DESC
      LIMIT ? OFFSET ?
    `, [tsQuery, tsQuery, ...(city ? [city] : []), ...(work_type ? [work_type] : []), limit, offset]);

    res.json({ data: results.rows, query: q, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
