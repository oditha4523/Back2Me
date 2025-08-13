const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Changed from './models/User' to '../models/User'

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Extract token from "Bearer <token>" format
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Verify token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Add user to request object
    req.user = decoded.user;
    
    // Optional: Get full user data from database
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;