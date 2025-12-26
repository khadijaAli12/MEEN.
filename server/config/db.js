import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in environment variables');
      return false;
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('⚠️  MongoDB connection failed. Starting server without database connection.');
    return false;
    // Continue without DB connection for development
  }
};

export default connectDB;