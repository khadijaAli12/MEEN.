import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image'
    );

    if (cart) {
      res.json(cart);
    } else {
      res.json({ items: [], totalPrice: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }

      // Calculate total price
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      // Create new cart
      const cartItems = [
        {
          product: productId,
          quantity,
          price: product.price,
        },
      ];

      const totalPrice = product.price * quantity;

      const newCart = await Cart.create({
        user: req.user._id,
        items: cartItems,
        totalPrice,
      });

      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Filter out the item to remove
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId
      );

      // Recalculate total price
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getCart, addToCart, removeFromCart };