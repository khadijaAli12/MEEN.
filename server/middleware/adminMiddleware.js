import User from '../models/User.js';

const admin = async (req, res, next) => {
  try {
    // Get user from the token (already set by protect middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized as admin' });
    }

    req.user = user; // Update user with admin status
    next();
  } catch (error) {
    console.error('Admin middleware error:', error.message);
    res.status(500).json({ message: 'Server error in admin middleware' });
  }
};

export { admin };