
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
const router = require('express').Router();
const axios = require('axios');

router.post('/initiate', async (req, res) => {
  const { username, amount, memo } = req.body;

  const paymentData = {
    amount,
    memo,
    metadata: { username },
  };

  try {
    const response = await axios.post(
      'https://api.minepi.com/v2/payments',
      paymentData,
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY_TEST}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Payment initiation failed', details: err.message });
  }
});

router.post('/verify', async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await axios.get(
      `https://api.minepi.com/v2/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY_TEST}`,
        },
      }
    );

    if (response.data.status === 'completed') {
      res.json({ status: 'verified', transaction: response.data });
    } else {
      res.status(400).json({ status: 'unverified', message: 'Payment not complete' });
    }

  } catch (err) {
    res.status(500).json({ error: 'Verification failed', details: err.message });
  }
});

module.exports = router;
