const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("Admin token received:", token.substring(0, 20) + "...");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded admin ID:", decoded.id);
      req.admin = await Admin.findById(decoded.id).select('-password');
      console.log("Admin found:", req.admin ? req.admin.email : "NOT FOUND");
      if (!req.admin) return res.status(403).json({ message: 'Not authorized as admin' });
      return next();
    } catch (error) {
      console.log("Admin auth error:", error.message);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect, protectAdmin };