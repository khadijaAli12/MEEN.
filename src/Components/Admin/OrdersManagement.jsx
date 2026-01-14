import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/apiService';
import UserContext from '../context/UserContext';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminAPI.getAllOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrder(orderId, { status: newStatus });
      // Refetch orders to ensure all data is up-to-date and user info is populated
      const data = await adminAPI.getAllOrders();
      setOrders(data);
      
      // Update the selected order if it's the one being viewed
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await adminAPI.deleteOrder(orderId);
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error.message);
      }
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const order = await adminAPI.getOrderById(orderId);
      // Ensure order items are properly formatted
      const formattedOrder = {
        ...order,
        orderItems: order.items || order.orderItems || [],
        status: order.status || order.orderStatus || 'Pending',
        user: order.user || {},
        shippingAddress: order.shippingAddress || {},
        totalPrice: order.totalPrice || order.total || 0,
      };
      
      // Log the actual structure for debugging
      console.log('Order data:', order);
      console.log('Available order keys:', Object.keys(order));
      console.log('Order items (order.items):', order.items);
      if (order.items && order.items.length > 0) {
        console.log('First item in order.items:', order.items[0]);
        console.log('First item product:', order.items[0].product);
        console.log('First item product keys:', order.items[0].product ? Object.keys(order.items[0].product) : 'No product');
      } else {
        console.log('Order items array is empty or does not exist');
      }
      console.log('Order items (order.orderItems):', order.orderItems);
      console.log('Formatted order items:', formattedOrder.orderItems);
      if (formattedOrder.orderItems.length > 0) {
        console.log('First item structure:', formattedOrder.orderItems[0]);
        console.log('First item keys:', formattedOrder.orderItems[0] ? Object.keys(formattedOrder.orderItems[0]) : 'No items');
      }
      
      setSelectedOrder(formattedOrder);
      setShowOrderDetails(true);
    } catch (error) {
      console.error('Error fetching order details:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <div className="text-sm text-gray-500">
            Total Orders: {orders.length}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.user?.name || order.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${order.totalPrice || order.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt || order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(order.items || order.orderItems || []).length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewOrder(order._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                <button 
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">#{selectedOrder._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedOrder.user?.name || selectedOrder.user}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrder.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-medium">${selectedOrder.totalPrice || selectedOrder.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{new Date(selectedOrder.createdAt || selectedOrder.date).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Order Items</h4>
                  <div className="border rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(selectedOrder.orderItems || []).map((item, index) => {
                          // Handle different possible structures for the order item
                          let name = 'Product';
                          let price = 0;
                          let quantity = 1;
                          
                          if (item.product && typeof item.product === 'object') {
                            // If product is properly populated
                            name = item.product.name || item.product._id || 'Product';
                            price = item.product.price || item.price || 0;
                            quantity = item.quantity || item.qty || item.product.quantity || item.product.qty || 1;
                          } else if (item.name) {
                            // Fallback to item name if available
                            name = item.name;
                            price = item.price || 0;
                            quantity = item.quantity || item.qty || 1;
                          }
                          
                          return (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="text-sm">{name}</div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="text-sm">${price}</div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="text-sm">{quantity}</div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="text-sm">${(price * quantity).toFixed(2)}</div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Shipping Address</h4>
                  <div className="text-sm">
                    <p>{selectedOrder.shippingAddress?.address || 'N/A'}</p>
                    <p>{selectedOrder.shippingAddress?.city || 'N/A'}, {selectedOrder.shippingAddress?.postalCode || 'N/A'}</p>
                    <p>{selectedOrder.shippingAddress?.country || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;