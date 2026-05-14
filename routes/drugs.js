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
  try {
    const results = await Drug.find({
      name: { $regex: query, $options: 'i' } // case-insensitive partial match
    });
    res.json(results); // returns full drug objects
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
