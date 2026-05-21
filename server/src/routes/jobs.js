const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/jobs — list jobs with filters
router.get('/', async (req, res) => {
  try {
    const {
      city, work_type, department, salary_min, salary_max,
      experience_min, experience_max, company_id,
      page = 1, limit = 25, sort = 'posted_at'
    } = req.query;
    const offset = (page - 1) * limit;

    let query = db('jobs as j')
      .select(
        'j.*',
        'c.name as company_name', 'c.slug as company_slug', 'c.logo_url as company_logo',
        'o.city', 'o.latitude', 'o.longitude'
      )
      .join('companies as c', 'c.id', 'j.company_id')
      .leftJoin('offices as o', 'o.id', 'j.office_id')
      .where('j.is_active', true);

    if (city) query = query.where('o.city', city);
    if (work_type) query = query.where('j.work_type', work_type);
    if (department) query = query.where('j.department', department);
    if (company_id) query = query.where('j.company_id', company_id);
    if (salary_min) query = query.where('j.salary_min', '>=', salary_min);
    if (salary_max) query = query.where('j.salary_max', '<=', salary_max);
    if (experience_min) query = query.where('j.experience_min', '>=', experience_min);
    if (experience_max) query = query.where('j.experience_max', '<=', experience_max);

    const sortColumn = ['posted_at', 'salary_max', 'title'].includes(sort) ? sort : 'posted_at';
    query = query.orderBy(`j.${sortColumn}`, 'desc').limit(limit).offset(offset);

    // Count query
    let countQuery = db('jobs as j')
      .leftJoin('offices as o', 'o.id', 'j.office_id')
      .where('j.is_active', true);
    if (city) countQuery = countQuery.where('o.city', city);
    if (work_type) countQuery = countQuery.where('j.work_type', work_type);
    if (department) countQuery = countQuery.where('j.department', department);

    const [{ count }] = await countQuery.count('j.id as count');
    const jobs = await query;

    res.json({ data: jobs, total: Number(count), page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/jobs/:id — single job detail
router.get('/:id', async (req, res) => {
  try {
    const job = await db('jobs as j')
      .select('j.*', 'c.name as company_name', 'c.slug as company_slug',
        'c.logo_url as company_logo', 'c.website as company_website',
        'o.city', 'o.address', 'o.latitude', 'o.longitude')
      .join('companies as c', 'c.id', 'j.company_id')
      .leftJoin('offices as o', 'o.id', 'j.office_id')
      .where('j.id', req.params.id)
      .first();

    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ data: job });
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

module.exports = router;
