import stripe from 'stripe';
import Order from '../models/Order.js';

// Initialize Stripe only if API key is provided
let stripeInstance;
if (process.env.STRIPE_SECRET_KEY) {
  stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn('Stripe secret key not provided. Payment functionality will be disabled.');
  // Create a mock stripe instance for development
  stripeInstance = {
    paymentIntents: {
      create: () => {
        throw new Error('Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.');
      }
    },
    webhooks: {
      constructEvent: () => {
        throw new Error('Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.');
      }
    }
  };
}

// @desc    Create payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', orderId } = req.body;

    // Validate order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to pay for this order' });
    }

    // Create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        orderId: orderId,
        userId: req.user.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};

// @desc    Handle webhook events
// @route   POST /api/payment/webhook
// @access  Public
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handleSuccessfulPayment(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      await handleFailedPayment(failedPaymentIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Handle successful payment
const handleSuccessfulPayment = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata.orderId;
    const order = await Order.findById(orderId);
    
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        email_address: paymentIntent.charges?.data[0]?.billing_details?.email
      };
      
      await order.save();
      console.log(`Order ${orderId} marked as paid`);
    }
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
};

// Handle failed payment
const handleFailedPayment = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata.orderId;
    console.log(`Payment failed for order ${orderId}`);
    // Could send notification to user about failed payment
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
};

// @desc    Get payment status
// @route   GET /api/payment/status/:orderId
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      paymentResult: order.paymentResult
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ message: 'Failed to get payment status' });
  }
};

export { createPaymentIntent, handleWebhook, getPaymentStatus };