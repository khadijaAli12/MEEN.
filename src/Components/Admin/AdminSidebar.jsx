import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin" 
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin') ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/users" 
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin/users') ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/products" 
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin/products') ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive('/admin/orders') ? 'bg-gray-900 text-white' : 'hover:bg-gray-700'
                }`}
              >
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;