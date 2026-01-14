import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    // Check if it's a database connection error
    if (error.name === 'MongoNetworkError' || error.message.includes('database')) {
      return res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
    }
    res.status(500).json({ message: 'Server error during registration: ' + error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error.message);
    // Check if it's a database connection error
    if (error.name === 'MongoNetworkError' || error.message.includes('database')) {
      return res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
    }
    res.status(500).json({ message: 'Server error during login: ' + error.message });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Get user error:', error.message);
    // Check if it's a database connection error
    if (error.name === 'MongoNetworkError' || error.message.includes('database')) {
      return res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
    }
    res.status(500).json({ message: 'Server error retrieving user: ' + error.message });
  }
};

export { registerUser, loginUser, getMe };