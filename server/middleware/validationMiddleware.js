import { body, validationResult } from 'express-validator';

// Validation middleware to check for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for user registration
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Name must be between 2 and 30 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Validation rules for user login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for product creation/update
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('brand')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  body('category')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  body('countInStock')
    .isInt({ min: 0 })
    .withMessage('Count in stock must be a non-negative integer')
];

// Validation rules for cart operations
const validateCart = [
  body('productId')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

// Validation rules for order operations
const validateOrder = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('orderItems.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required for each item'),
  body('orderItems.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1 for each item'),
  body('orderItems.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number for each item'),
  body('shippingAddress.address')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Shipping address must be at least 5 characters'),
  body('shippingAddress.city')
    .trim()
    .isLength({ min: 2 })
    .withMessage('City must be at least 2 characters'),
  body('shippingAddress.postalCode')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Postal code must be at least 3 characters'),
  body('shippingAddress.country')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Country must be at least 2 characters'),
  body('paymentMethod')
    .trim()
    .isIn(['Credit Card', 'PayPal', 'Stripe', 'Cash on Delivery', 'Bank Transfer'])
    .withMessage('Payment method must be Credit Card, PayPal, Stripe, Cash on Delivery, or Bank Transfer')
];

export { 
  validateRegister, 
  validateLogin, 
  validateProduct,
  validateCart,
  validateOrder,
  handleValidationErrors 
};