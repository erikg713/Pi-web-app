
const express = require('express');
const router = express.Router();

// Endpoint to receive payment notifications
router.post('/webhook', (req, res) => {
  const payment = req.body;
  console.log('Received payment webhook:', payment);
  // TODO: verify and process payment
  res.status(200).send('OK');
});

module.exports = router;
const router = require('express').Router();

router.post('/initiate', (req, res) => {
  res.json({ txid: 'mock_txid_12345' });
});

router.post('/verify', (req, res) => {
  res.json({ status: 'verified' });
});

module.exports = router;
