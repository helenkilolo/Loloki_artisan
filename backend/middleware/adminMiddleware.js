// /middleware/adminMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (user && user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { adminProtect };
