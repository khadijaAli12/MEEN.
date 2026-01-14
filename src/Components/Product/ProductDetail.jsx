import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/apiService';
import { cartAPI } from '../services/apiService';
import UserContext from '../context/UserContext';
import Loader from '../Loader/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    try {
      await cartAPI.addToCart({
        productId: product._id,
        quantity: parseInt(quantity)
      });
      // Optionally show a success message or redirect to cart
      alert(`${product.name} added to cart successfully!`);
    } catch (err) {
      alert('Error adding product to cart: ' + err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white">
          <div className="max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm mb-8">
              <button 
                onClick={() => navigate('/')} 
                className="text-[#3E2723] hover:text-[#6D4C41] transition-colors"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <button 
                onClick={() => navigate('/collections')} 
                className="text-[#3E2723] hover:text-[#6D4C41] transition-colors"
              >
                Collections
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">{product.name}</span>
            </div>

            {/* Product Detail */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <div className="flex flex-col-reverse">
                <div className="max-w-2xl mx-auto sm:block lg:max-w-none">
                  <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      src={product.image && product.image !== 'no-photo.jpg' ? product.image : 'https://via.placeholder.com/600x600'}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-4xl font-extralight text-[#3E2723] tracking-tight">
                  {product.name}
                </h1>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div className="text-base text-[#4E342E] font-light">
                    <p>{product.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-[#3E2723] font-extralight">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                </div>

                {/* Product details */}
                <div className="mt-10 space-y-6">
                  <div className="border-b border-[#3E2723]/20 pb-6">
                    <h3 className="text-sm font-medium text-[#3E2723] tracking-wider uppercase">Details</h3>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-[#4E342E]">
                        <span className="font-medium">Category:</span> {product.category}
                      </p>
                      <p className="text-sm text-[#4E342E]">
                        <span className="font-medium">Brand:</span> {product.brand}
                      </p>
                      <p className="text-sm text-[#4E342E]">
                        <span className="font-medium">In Stock:</span> {product.countInStock && parseInt(product.countInStock) > 0 ? `${parseInt(product.countInStock)} available` : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-10">
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="text-sm font-medium text-[#3E2723] tracking-wider uppercase mr-4">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="max-w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3E2723] focus:ring-offset-2 text-[#3E2723]"
                    >
                      {[...Array(Math.min(10, product.countInStock ? parseInt(product.countInStock) : 10)).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.countInStock <= 0}
                    className={`mt-6 w-full flex items-center justify-center py-4 px-8 border border-transparent text-base font-light tracking-[0.2em] uppercase text-[#F5F1ED] bg-[#3E2723] hover:bg-[#6D4C41] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E2723] rounded-xl transition-all duration-500 ${
                      (product.countInStock && parseInt(product.countInStock) <= 0) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {(product.countInStock && parseInt(product.countInStock) <= 0) ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;