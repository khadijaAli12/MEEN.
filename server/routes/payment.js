import express from 'express';
import { createPaymentIntent, handleWebhook, getPaymentStatus } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Payment routes
router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/status/:orderId', protect, getPaymentStatus);

// Webhook route (no auth middleware as it comes from Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;