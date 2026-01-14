import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123456',
  },
];

const products = [
  {
    name: 'Oud Royale',
    image: 'https://plus.unsplash.com/premium_photo-1676748933022-e51183e997436?q=80&w=871&auto=format&fit=crop',
    description:
      'A magnificent blend of rare agarwood and precious resins',
    brand: 'meen',
    category: 'signature',
    price: 285.00,
    countInStock: 15,
    rating: 4.8,
  },
  {
    name: 'Velvet Rose',
    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1398&auto=format&fit=crop',
    description:
      'Delicate Damascus rose wrapped in soft suede and musk',
    brand: 'meen',
    category: 'signature',
    price: 220.00,
    countInStock: 20,
    rating: 4.6,
  },
  {
    name: 'Noir Intense',
    image: 'https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1474&auto=format&fit=crop',
    description:
      'Dark and intoxicating tobacco leaf with cognac warmth',
    brand: 'meen',
    category: 'bold',
    price: 245.00,
    countInStock: 12,
    rating: 4.7,
  },
  {
    name: 'Amber Essence',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop',
    description:
      'Warm and sensual amber with golden honey undertones',
    brand: 'meen',
    category: 'signature',
    price: 210.00,
    countInStock: 18,
    rating: 4.5,
  },
  {
    name: 'Jasmine Absolute',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&auto=format&fit=crop',
    description:
      'Pure jasmine extracted from night-blooming flowers',
    brand: 'meen',
    category: 'signature',
    price: 265.00,
    countInStock: 10,
    rating: 4.9,
  },
  {
    name: 'Leather Intense',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop',
    description:
      'Bold leather accord with smoky birch tar complexity',
    brand: 'meen',
    category: 'bold',
    price: 255.00,
    countInStock: 8,
    rating: 4.7,
  },
  {
    name: 'Sandalwood Dreams',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop',
    description:
      'Creamy Australian sandalwood with exotic spices',
    brand: 'meen',
    category: 'signature',
    price: 230.00,
    countInStock: 14,
    rating: 4.6,
  },
  {
    name: 'Black Oud Reserve',
    image: 'https://plus.unsplash.com/premium_photo-1676748933022-e51183e997436?q=80&w=871&auto=format&fit=crop',
    description:
      'Ultra-rare black oud from aged aquilaria trees',
    brand: 'meen',
    category: 'reserve',
    price: 450.00,
    countInStock: 5,
    rating: 4.9,
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}