import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { cartAPI } from '../services/apiService';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartAPI.getCart();
      setCartItems(cartData.items || []);
    } catch (err) {
      setError(err.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      setCartItems(prevItems => prevItems.filter(item => item.product && item.product._id !== productId));
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-2xl text-[#3E2723]">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3E2723] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5F1ED] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-8 py-3 bg-[#3E2723]">
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Your Selection</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#3E2723] mt-6 mb-8">Shopping Cart</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-2xl text-[#3E2723] mb-6">Your cart is empty</div>
            <Link 
              to="/collections" 
              className="inline-block px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {cartItems.filter(item => item.product).map((item) => (
                    <div key={item.product._id || item._id} className="flex items-center gap-6 bg-[#F5F1ED] border border-[#3E2723]/20 p-6 rounded-2xl">
                      <div className="w-24 h-24 bg-white border border-[#3E2723]/20 rounded-xl overflow-hidden">
                        <img 
                          src={item.product?.image || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&auto=format&fit=crop"} 
                          alt={item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-extralight text-[#3E2723] mb-2">{item.product?.name || 'Product'}</h3>
                        <p className="text-sm text-[#6D4C41] font-light mb-3">{item.product?.description || 'No description available'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-extralight text-[#3E2723]">${item.product?.price || 0}</span>
                          <span className="text-lg font-extralight text-[#3E2723]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => item.product && removeFromCart(item.product._id)}
                        className="text-[#6D4C41] hover:text-[#3E2723] transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl sticky top-24">
                  <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-[#3E2723] font-light">Subtotal</span>
                      <span className="text-[#3E2723] font-light">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3E2723] font-light">Shipping</span>
                      <span className="text-[#3E2723] font-light">$15.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#3E2723] font-light">Tax</span>
                      <span className="text-[#3E2723] font-light">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-[#3E2723]/20 pt-4">
                      <div className="flex justify-between">
                        <span className="text-[#3E2723] font-light">Total</span>
                        <span className="text-[#3E2723] font-light">${(getTotalPrice() + 15 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/checkout" 
                    className="block w-full text-center px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full"
                  >
                    Proceed to Checkout
                  </Link>
                  
                  <Link 
                    to="/collections" 
                    className="block text-center mt-6 text-[#3E2723] hover:text-[#6D4C41] font-light transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}