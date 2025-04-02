app.get('/admin', piAuth, async (req, res) => {
  const Product = require('./models/Product');
  const products = await Product.find();
  res.render('admin', { products });
});
