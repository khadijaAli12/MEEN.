import './App.css'
import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Routes from './Routes'
import { Home, About, Contact, User } from "./Components/index.js"
import Collections from './Components/Collections/Collections'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Cart/Checkout'
import OrderConfirmation from './Components/Cart/OrderConfirmation'
import Profile from './Components/AUTH/Profile'
import Login from './Components/AUTH/LOGIN'
import Signup from './Components/AUTH/Signup'
import UserContextProvider from './Components/context/UserContextProvider'
import Loader from './Components/Loader/Loader'
import { AdminRoutes, AdminDashboard, UsersManagement, ProductsManagement, OrdersManagement } from './AdminRoutes'
import ProductDetail from './Components/Product/ProductDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Routes />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'collections', element: <Collections /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order/:id', element: <OrderConfirmation /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },
      { path: 'account', element: <User /> },
      { path: 'product/:id', element: <ProductDetail /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminRoutes />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <UsersManagement /> },
      { path: 'products', element: <ProductsManagement /> },
      { path: 'orders', element: <OrdersManagement /> }
    ]
  }
])

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <UserContextProvider>
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      {!loading && <RouterProvider router={router} />}
    </UserContextProvider>
  )
}

export default App
