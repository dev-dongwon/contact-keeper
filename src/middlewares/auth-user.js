const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  // Get Token from header
  const token = req.header('X-auth-token');
  // check token
  if (!token) {
    return res.status(400).json({ msg: 'Authorization is denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authUser;
