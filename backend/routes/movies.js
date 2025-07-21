// backend/routes/movies.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/movies?name=Frozen
router.get('/', (req, res) => {
  const search = req.query.name;

  if (!search) {
    return res.status(400).json({ message: 'No search term provided.' });
  }

  const query = `SELECT * FROM movies WHERE name LIKE ?`;
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
