const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied' });
    }
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
