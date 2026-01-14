import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error.message);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error.message);
    res.status(500).json({ message: 'Server error retrieving user' });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error('Update user error:', error.message);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await User.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Get all products error:', error.message);
    res.status(500).json({ message: 'Server error retrieving products' });
  }
};

// @desc    Create product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error.message);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Delete product error:', error.message);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    console.log('Fetching all orders'); // Debug log
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .populate('items.product')
      .sort({ createdAt: -1 }); // Sort by newest first
    console.log('Fetched orders:', orders); // Debug log
    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error.message);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
};

// @desc    Get order by ID
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
const getOrderById = async (req, res) => {
  try {
    console.log('Fetching order ID:', req.params.id); // Debug log
    const order = await Order.findById(req.params.id)
      .populate('user', 'id name email')
      .populate('items.product')
      .select('-paymentResult');
    
    console.log('Fetched order:', order); // Debug log
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error.message);
    res.status(500).json({ message: 'Server error retrieving order' });
  }
};

// @desc    Update order
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status || order.status;
    
    const updatedOrder = await order.save();
    
    // Populate the updated order before returning
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('user', 'id name email')
      .populate('items.product')
      .select('-paymentResult');
    
    res.json(populatedOrder);
  } catch (error) {
    console.error('Update order error:', error.message);
    res.status(500).json({ message: 'Server error updating order' });
  }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await Order.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Order removed' });
  } catch (error) {
    console.error('Delete order error:', error.message);
    res.status(500).json({ message: 'Server error deleting order' });
  }
};

// @desc    Create user
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the pre-save middleware in the User model
    });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Create user error:', error.message);
    res.status(500).json({ message: 'Server error creating user' });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get counts for users, products, and orders
    const userCount = await User.countDocuments({});
    const productCount = await Product.countDocuments({});
    const orderCount = await Order.countDocuments({});
    
    // Calculate total revenue from paid orders
    const paidOrders = await Order.find({ isPaid: true });
    const totalRevenue = paidOrders.reduce((sum, order) => {
      return sum + order.totalPrice;
    }, 0);
    
    res.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      revenue: totalRevenue
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error.message);
    res.status(500).json({ message: 'Server error retrieving dashboard stats' });
  }
};

// @desc    Get recent activity
// @route   GET /api/admin/activity
// @access  Private/Admin
const getRecentActivity = async (req, res) => {
  try {
    // Get recent users (last 7 days)
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent products (last 7 days)
    const recentProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent orders (last 7 days)
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Combine and sort all activities by date
    const activities = [];
    
    recentUsers.forEach(user => {
      activities.push({
        type: 'user',
        action: 'New user registered',
        description: `${user.name} joined the platform`,
        timestamp: user.createdAt,
        user: user.name
      });
    });
    
    recentProducts.forEach(product => {
      activities.push({
        type: 'product',
        action: 'New product added',
        description: `${product.name} added to inventory`,
        timestamp: product.createdAt,
        product: product.name
      });
    });
    
    recentOrders.forEach(order => {
      activities.push({
        type: 'order',
        action: 'Order placed',
        description: `Order #${order._id} placed by ${order.user?.name || 'Customer'}`,
        timestamp: order.createdAt,
        order: order._id,
        user: order.user?.name || 'Customer'
      });
    });
    
    // Sort by timestamp, most recent first, and take top 5
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
    
    res.json(sortedActivities);
  } catch (error) {
    console.error('Get recent activity error:', error.message);
    res.status(500).json({ message: 'Server error retrieving recent activity' });
  }
};

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getDashboardStats,
  getRecentActivity
};