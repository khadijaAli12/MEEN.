// API Service for connecting to backend
// In development, Vite proxies /api to http://localhost:5000
// In production, this should be set to the actual API URL
const API_BASE_URL = '/api';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add token to headers if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Handle network errors
    if (!response) {
      throw new Error('Network error - API not reachable');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle service unavailable (503) when DB is not connected
      if (response.status === 503) {
        throw new Error('Service temporarily unavailable. Database connection failed.');
      }
      // For validation errors (400), return the full error data
      if (response.status === 400) {
        throw new Error(JSON.stringify(data));
      }
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the API. Please make sure both the frontend and backend servers are running. Frontend should be accessible at http://localhost:5173 and backend at http://localhost:5000');
    }
    throw new Error(error.message || 'Network error');
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('auth/me'),
};

// Product API
export const productAPI = {
  getProducts: () => apiRequest('products'),
  
  getProductById: (id) => apiRequest(`products/${id}`),
  
  createProduct: (productData) => apiRequest('products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  updateProduct: (id, productData) => apiRequest(`products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  deleteProduct: (id) => apiRequest(`products/${id}`, {
    method: 'DELETE',
  }),
};

// Cart API
export const cartAPI = {
  getCart: () => apiRequest('cart'),
  
  addToCart: (itemData) => apiRequest('cart', {
    method: 'POST',
    body: JSON.stringify(itemData),
  }),
  
  removeFromCart: (productId) => apiRequest(`cart/${productId}`, {
    method: 'DELETE',
  }),
};

// Order API
export const orderAPI = {
  createOrder: (orderData) => apiRequest('orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getOrderById: (id) => apiRequest(`orders/${id}`),
  
  getMyOrders: () => apiRequest('orders/myorders'),
  
  payOrder: (id, paymentResult) => apiRequest(`orders/${id}/pay`, {
    method: 'PUT',
    body: JSON.stringify(paymentResult),
  }),
};

// Admin API
export const adminAPI = {
  // User management
  getAllUsers: () => apiRequest('admin/users'),
  
  getUserById: (id) => apiRequest(`admin/users/${id}`),
  
  updateUser: (id, userData) => apiRequest(`admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  deleteUser: (id) => apiRequest(`admin/users/${id}`, {
    method: 'DELETE',
  }),
  
  createUser: (userData) => apiRequest('admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  // Product management
  getAllProducts: () => apiRequest('admin/products'),
  
  createProduct: (productData) => apiRequest('admin/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  updateProduct: (id, productData) => apiRequest(`admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  deleteProduct: (id) => apiRequest(`admin/products/${id}`, {
    method: 'DELETE',
  }),
  
  // Order management
  getAllOrders: () => apiRequest('admin/orders'),
  
  getOrderById: (id) => apiRequest(`admin/orders/${id}`),
  
  updateOrder: (id, orderData) => apiRequest(`admin/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData),
  }),
  
  deleteOrder: (id) => apiRequest(`admin/orders/${id}`, {
    method: 'DELETE',
  }),
  
  // Dashboard stats
  getDashboardStats: () => apiRequest('admin/stats'),
  
  getRecentActivity: () => apiRequest('admin/activity'),
};