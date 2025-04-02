// placeholder for Pi identity signature check
// for advanced Pi Wallet flow using real signature auth

module.exports = async function validatePiUser(req, res, next) {
  const { pi_user, signature } = req.body;

  if (!pi_user || !signature) {
    return res.status(401).json({ error: 'Missing Pi auth credentials' });
  }

  // TODO: Validate the signature w/ Pi SDK public key (if needed)
  // For now, just pass through
  req.pi_user = pi_user;
  next();
};
