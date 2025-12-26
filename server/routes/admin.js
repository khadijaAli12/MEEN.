import express from 'express';
import { admin } from '../middleware/adminMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/adminController.js';

const router = express.Router();

// User routes
router.route('/users')
  .get(protect, admin, getAllUsers);

router.route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Product routes
router.route('/products')
  .get(protect, admin, getAllProducts)
  .post(protect, admin, createProduct);

router.route('/products/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Order routes
router.route('/orders')
  .get(protect, admin, getAllOrders);

router.route('/orders/:id')
  .get(protect, admin, getOrderById)
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

export default router;