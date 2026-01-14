import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';

// Load env vars
dotenv.config();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Connect to database
let dbConnected = false;
connectDB().then((connected) => {
  dbConnected = connected;
  console.log('Database connection status:', connected ? 'Connected' : 'Not connected');
}).catch(err => {
  console.log('Database connection failed:', err.message);
});

const app = express();

// Security middleware
app.use(helmet());
app.use(limiter); // Apply rate limiting to all requests
app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
  res.json({ 
    message: 'API Running...', 
    databaseConnected: dbConnected,
    status: dbConnected ? 'All systems operational' : 'Running in limited mode - database disconnected'
  });
});

// Health check endpoint that verifies database connection
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    databaseConnected: dbConnected
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});