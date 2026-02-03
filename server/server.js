import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { apiLimiter, authLimiter, sanitizeInput, xssProtection, setCSP } from './middleware/securityMiddleware.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payment.js';
import imageRoutes from './routes/image.js';

// Load env vars
dotenv.config();

const app = express();

// Connect to database
let dbConnected = false;
connectDB().then((connected) => {
  dbConnected = connected;
  console.log('Database connection status:', connected ? 'Connected' : 'Not connected');
}).catch(err => {
  console.log('Database connection failed:', err.message);
});

// Apply security middleware
app.use(setCSP);
app.use(xssProtection);
app.use(sanitizeInput);

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Apply rate limiting to auth routes
app.use('/api/auth', authLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Running...', 
    databaseConnected: dbConnected,
    status: dbConnected ? 'All systems operational' : 'Running in limited mode - database disconnected'
  });
});

// Health check endpoint that verifies database connection
app.get('/api/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    databaseConnected: dbConnected,
    environment: process.env.NODE_ENV || 'development'
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).json(healthcheck);
  }
});

// Comprehensive health check
app.get('/api/health/comprehensive', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    databaseConnected: dbConnected,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    memory: process.memoryUsage(),
    cpu: process.cpuUsage ? process.cpuUsage() : 'CPU usage not available'
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).json(healthcheck);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});