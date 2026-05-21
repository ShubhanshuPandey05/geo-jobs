const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/filters — available filter options
router.get('/', async (req, res) => {
  try {
    const [cities, industries, departments, workTypes] = await Promise.all([
      db('offices').distinct('city').whereNotNull('city').orderBy('city'),
      db('companies').distinct('industry').whereNotNull('industry').orderBy('industry'),
      db('jobs').distinct('department').whereNotNull('department').where('is_active', true).orderBy('department'),
      db('jobs').distinct('work_type').whereNotNull('work_type').where('is_active', true).orderBy('work_type'),
    ]);

    res.json({
      data: {
        cities: cities.map((r) => r.city),
        industries: industries.map((r) => r.industry),
        departments: departments.map((r) => r.department),
        work_types: workTypes.map((r) => r.work_type),
      },
    });
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

module.exports = router;
