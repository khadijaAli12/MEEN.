import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

// Load env vars
dotenv.config();

// Connect to database
let dbConnected = false;
connectDB().then((connected) => {
  dbConnected = connected;
  console.log('Database connection status:', connected ? 'Connected' : 'Not connected');
}).catch(err => {
  console.log('Database connection failed:', err.message);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

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