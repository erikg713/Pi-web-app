const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
