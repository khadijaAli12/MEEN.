import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Simple health check that doesn't require DB
router.get('/health', (req, res) => {
  res.json({ status: 'Auth service running' });
});

router.post('/register', validateRegister, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);
router.get('/me', protect, getMe);

export default router;