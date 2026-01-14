import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const listProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find all products
    const products = await Product.find({});
    
    if (products.length === 0) {
      console.log('No products found in the database');
    } else {
      console.log(`Found ${products.length} product(s):`);
      products.forEach((product, index) => {
        console.log(`${index + 1}. ID: ${product._id}`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Description: ${product.description}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Category: ${product.category}`);
        console.log(`   Brand: ${product.brand}`);
        console.log(`   In Stock: ${product.countInStock}`);
        console.log('---');
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error listing products:', error.message);
    process.exit(1);
  }
};

listProducts();