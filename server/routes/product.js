import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, searchProducts } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateProduct, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, validateProduct, handleValidationErrors, createProduct);
router.route('/search').get(searchProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, validateProduct, handleValidationErrors, updateProduct);

export default router;