import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const updateAdminUser = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in environment variables');
      console.log('Current working directory:', process.cwd());
      console.log('MONGO_URI:', process.env.MONGO_URI);
      process.exit(1);
    }
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find your user by email (replace with your actual email)
    const userEmail = process.argv[2]; // Pass email as command line argument
    
    if (!userEmail) {
      console.log('Please provide an email address: node updateUserToAdmin.js your@email.com');
      process.exit(1);
    }

    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log('User not found with that email');
      process.exit(1);
    }

    // Update the user to admin
    user.isAdmin = true;
    await User.findByIdAndUpdate(user._id, { isAdmin: true }, { new: true });
    
    console.log(`User ${userEmail} has been updated to admin status`);
    console.log(`User ID: ${user._id}`);
    console.log(`Admin status: ${user.isAdmin}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating user:', error.message);
    process.exit(1);
  }
};

updateAdminUser();