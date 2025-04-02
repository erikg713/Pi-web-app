const adminAuth = require('./middleware/auth');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const piAuth = require('./middleware/piAuth');
const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payment');

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.get('/admin', piAuth, async (req, res) => {
  const Product = require('./models/Product');
  const products = await Product.find();
  res.render('admin', { products });
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
