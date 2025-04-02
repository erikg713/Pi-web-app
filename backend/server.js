const express = require('express');
const router = express.Router();

// Endpoint to receive payment notifications
router.post('/webhook', (req, res) => {
  const payment = req.body;
  console.log('Received payment webhook:', payment);
  // TODO: verify and process payment
  res.status(200).send('OK');
});

module.exports = router;const express = require('express');
const router = express.Router();

// Endpoint to receive payment notifications
router.post('/webhook', (req, res) => {
  const payment = req.body;
  console.log('Received payment webhook:', payment);
  // TODO: verify and process payment
  res.status(200).send('OK');
});

module.exports = router;1. createPayment: Your app's frontend creates the payment. The Payment Flow UI opens, but cannot be interacted with until the payment is approved by your server.
2. onReadyForServerApproval: The JS SDK has obtained the payment identifier (PaymentID) and is passing it to your app for Server-Side approval.
Your app's frontend sends the PaymentID to your app's server. This implementation is your responsibility.
3. Server-Side Approval: Your app's server approves the payment with Pi Servers through the /approve API call. This enables the Pioneer to submit the blockchain transaction (as explained in Phase II below).const express = require('express'); const mongoose = require('mongoose'); const cors = require('cors'); const bodyParser = require('body-parser'); require('dotenv').config();

const path = require('path'); const productRoutes = require('./routes/products'); const adminRoutes = require('./routes/admin'); const paymentRoutes = require('./routes/payment');

const app = express();

app.use(cors()); app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true })); app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected')) .catch(err => console.error('MongoDB error:', err));

app.use('/api/products', productRoutes); app.use('/api/admin', adminRoutes); app.use('/api/payment', paymentRoutes);

app.set('view engine', 'ejs'); app.set('views', './views');

app.get('/admin', async (req, res) => { const Product = require('./models/Product'); const products = await Product.find(); res.render('admin', { products }); });

// Serve frontend app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

const PORT = process.env.PORT || 5000; app.listen(PORT, () => console.log(Server running on port ${PORT}));

