const express = require('express');
const router = express.Router();
const Drug = require('../models/Drug');

router.get('/', async (req, res) => {
  const drugs = await Drug.find({});
  res.json(drugs);
});

// Search route
router.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === '') {
    return res.json([]);
  }

  try {
    const results = await Drug.find({
      name: { $regex: query.trim(), $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
