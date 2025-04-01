const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create new product
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const product = new Product({ name, description, price, imageUrl });
    await product.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Error creating product');
  }
});

// Delete product
router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;
