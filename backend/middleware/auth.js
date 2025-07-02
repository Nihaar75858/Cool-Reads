const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // adjust path to your User model

// Middleware to check if user is authenticated
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ensure JWT_SECRET is in .env
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to restrict access by roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for role: ${req.user?.role || 'unknown'}` });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
