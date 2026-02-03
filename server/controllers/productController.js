import Product from '../models/Product.js';
import { getCache, setCache } from '../utils/cache.js';

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy = 'name', order = 'asc' } = req.query;
    
    // Build search query
    let query = {};
    
    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Build sort object
    let sort = {};
    const sortField = sortBy === 'price' ? 'price' : 
                     sortBy === 'rating' ? 'rating' : 
                     sortBy === 'date' ? 'createdAt' : 'name';
    sort[sortField] = order === 'desc' ? -1 : 1;
    
    const products = await Product.find(query).sort(sort);
    
    res.json({
      products,
      totalCount: products.length,
      query: { q, category, minPrice, maxPrice, sortBy, order }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'products_list';
    const cachedProducts = getCache(cacheKey);
    
    if (cachedProducts) {
      return res.json(cachedProducts);
    }
    
    const products = await Product.find({});
    
    // Cache the results for 5 minutes
    setCache(cacheKey, products, 300000);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Check cache first
    const cacheKey = `product_${productId}`;
    const cachedProduct = getCache(cacheKey);
    
    if (cachedProduct) {
      return res.json(cachedProduct);
    }
    
    const product = await Product.findById(productId);

    if (product) {
      // Cache the product for 10 minutes
      setCache(cacheKey, product, 600000);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, searchProducts };