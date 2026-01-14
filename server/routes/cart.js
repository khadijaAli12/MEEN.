import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateCart, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, validateCart, handleValidationErrors, addToCart);
router.route('/:productId').delete(protect, removeFromCart);

export default router;