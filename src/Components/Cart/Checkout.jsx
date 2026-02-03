import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { cartAPI, orderAPI } from '../services/apiService';
import { paymentAPI } from '../services/apiService';

// Note: Stripe integration requires API keys to be configured
// For demo purposes, we'll skip actual payment processing
const loadStripe = async () => {
  // This is a placeholder for when Stripe is properly configured
  return null;
};

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.product && item.product.price && item.quantity) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError('Please fill in all shipping address fields');
      return;
    }
    
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    
    setOrderProcessing(true);
    setError('');
    
    try {
      // Create order items array with validation
      const validCartItems = cartItems.filter(item => item.product && item.product._id && item.quantity && item.product.price);
      
      if (validCartItems.length === 0) {
        setError('Cart is empty or items are invalid');
        return;
      }
      
      const orderItems = validCartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      console.log('Order items being sent:', orderItems); // Debug log
      
      // Calculate prices
      const itemsPrice = getTotalPrice();
      const shippingPrice = 15.00;
      const taxPrice = itemsPrice * 0.08;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      
      // Create order data
      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };
      
      console.log('Order data being sent:', orderData); // Debug log
      
      // Create order
      const order = await orderAPI.createOrder(orderData);
      
      // For now, handle all payment methods the same way
      // Stripe integration requires proper API keys and setup
      navigate(`/order/${order._id}`);
    } catch (err) {
      // Handle validation errors from backend
      if (err.message.includes('Validation failed')) {
        try {
          const validationError = JSON.parse(err.message);
          setError(validationError.message || 'Validation failed: ' + (validationError.errors ? validationError.errors[0]?.msg : 'Invalid data'));
          return;
        } catch (parseError) {
          setError('Validation failed: Invalid data provided');
          return;
        }
      }
      setError(err.message || 'Failed to process order');
    } finally {
      setOrderProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-2xl text-[#3E2723]">Loading checkout...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-2xl text-red-600">Please login to checkout</div>
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
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Checkout</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#3E2723] mt-6 mb-8">Complete Your Order</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-2xl text-[#3E2723] mb-6">Your cart is empty</div>
            <button 
              onClick={() => navigate('/collections')}
              className="inline-block px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Address */}
                <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl">
                  <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Shipping Address</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] font-light rounded-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] font-light rounded-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] font-light rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] font-light rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl">
                  <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={paymentMethod === 'Credit Card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#3E2723] border-[#3E2723]"
                      />
                      <label htmlFor="credit-card" className="ml-3 text-[#3E2723] font-light">Credit Card</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#3E2723] border-[#3E2723]"
                      />
                      <label htmlFor="paypal" className="ml-3 text-[#3E2723] font-light">PayPal</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="paymentMethod"
                        value="Bank Transfer"
                        checked={paymentMethod === 'Bank Transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#3E2723] border-[#3E2723]"
                      />
                      <label htmlFor="bank-transfer" className="ml-3 text-[#3E2723] font-light">Bank Transfer</label>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={orderProcessing}
                    className={`px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full ${
                      orderProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {orderProcessing ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl sticky top-24">
                <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  {cartItems.filter(item => item.product).map(item => (
                    <div key={item.product?._id || item._id} className="flex justify-between">
                      <div>
                        <span className="text-[#3E2723] font-light">{item.product?.name || 'Product'} × {item.quantity}</span>
                      </div>
                      <span className="text-[#3E2723] font-light">${item.product?.price && item.quantity ? (item.product.price * item.quantity).toFixed(2) : '0.00'}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-[#3E2723]/20 pt-4">
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
                    <div className="border-t border-[#3E2723]/20 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-[#3E2723] font-light">Total</span>
                        <span className="text-[#3E2723] font-light">${(getTotalPrice() + 15 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}