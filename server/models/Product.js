import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['electronics', 'clothing', 'books', 'home', 'sports', 'other', 'signature', 'reserve', 'bold', 'limited']
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    maxlength: [50, 'Brand cannot be more than 50 characters']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add count in stock'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);