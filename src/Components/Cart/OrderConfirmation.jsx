import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../services/apiService';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderData = await orderAPI.getOrderById(id);
      setOrder(orderData);
    } catch (err) {
      setError(err.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="text-2xl text-[#3E2723]">Loading order details...</div>
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

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Success Message */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-8 py-3 bg-[#3E2723]">
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Order Confirmed</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#3E2723] mt-6 mb-8">Thank You!</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
          
          <div className="mt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl text-[#3E2723] mt-6 font-light">
              Your order has been placed successfully
            </p>
            <p className="text-lg text-[#6D4C41] mt-2 font-light">
              Order #{order?._id?.substring(0, 8)}
            </p>
          </div>
        </div>

        {order && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Order Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Shipping Address</h3>
                  <p className="text-[#3E2723] font-light">{order.shippingAddress.address}</p>
                  <p className="text-[#3E2723] font-light">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p className="text-[#3E2723] font-light">{order.shippingAddress.country}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Payment Method</h3>
                  <p className="text-[#3E2723] font-light">{order.paymentMethod}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-[#3E2723] font-light uppercase tracking-wider mb-2">Order Date</h3>
                  <p className="text-[#3E2723] font-light">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Items Ordered</h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-[#3E2723]/20">
                    <div>
                      <p className="text-[#3E2723] font-light">{item.product.name}</p>
                      <p className="text-sm text-[#6D4C41] font-light">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[#3E2723] font-light">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#3E2723] font-light">Subtotal</span>
                    <span className="text-[#3E2723] font-light">${order.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#3E2723] font-light">Shipping</span>
                    <span className="text-[#3E2723] font-light">${order.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#3E2723] font-light">Tax</span>
                    <span className="text-[#3E2723] font-light">${order.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#3E2723]/20">
                    <span className="text-[#3E2723] font-light">Total</span>
                    <span className="text-[#3E2723] font-light">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        <div className="text-center mt-16">
          <Link 
            to="/collections" 
            className="inline-block px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}