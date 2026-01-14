import React from 'react';
import { Outlet } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UsersManagement from './Components/Admin/UsersManagement';
import ProductsManagement from './Components/Admin/ProductsManagement';
import OrdersManagement from './Components/Admin/OrdersManagement';
import ProtectedAdminRoute from './Components/Admin/ProtectedAdminRoute';

function AdminRoutes() {
  return (
    <ProtectedAdminRoute>
      <Admin>
        <Outlet />
      </Admin>
    </ProtectedAdminRoute>
  );
}

export { 
  AdminRoutes, 
  AdminDashboard, 
  UsersManagement, 
  ProductsManagement, 
  OrdersManagement 
};