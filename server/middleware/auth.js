
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Get user details from database
    db.get(
      'SELECT id, username, email, role, base_id FROM users WHERE id = ?',
      [decoded.userId],
      (err, user) => {
        if (err || !user) {
          return res.status(403).json({ message: 'User not found' });
        }
        req.user = user;
        next();
      }
    );
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

const authorizeBase = (req, res, next) => {
  if (req.user.role === 'Admin') {
    return next(); // Admins have access to all bases
  }

  const baseId = req.params.baseId || req.body.base_id || req.query.base_id;
  
  if (req.user.role === 'Base Commander' && req.user.base_id != baseId) {
    return res.status(403).json({ message: 'Access denied to this base' });
  }

  next();
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  authorizeBase
};
