import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Routes from './Routes.jsx'
import { Home, About, Contact, User } from "./Components/index.js"
import Collections from './Components/Collections/Collections.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Checkout from './Components/Cart/Checkout.jsx'
import OrderConfirmation from './Components/Cart/OrderConfirmation.jsx'
import Profile from './Components/AUTH/Profile.jsx'
import Login from './Components/AUTH/LOGIN.jsx'
import Signup from './Components/AUTH/Signup.jsx'
import UserContextProvider from './Components/context/UserContextProvider.jsx'
import Loader from './Components/Loader/Loader.jsx'
import { AdminRoutes, AdminDashboard, UsersManagement, ProductsManagement, OrdersManagement } from './AdminRoutes.jsx'
import ProductDetail from './Components/Product/ProductDetail.jsx'

// const router = createBrowserRouter([
//   {
//     path : `/`,
//     element : <Routes />,
//     children : [
//       {
//         path : `/`,
//         element:<Home />
//       },{
//         path:`/about`,
//         element : <About />
//       },
//       {
//         path : `/contact`,
//         element : <Contact />
//       },
//       {
//         path : `/user`,
//         element : <User />
//       },
//       {
//         path : `/github`,
//         element : <Github />,
//         loader : githubloader
//       }
//     ]
//   }
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Routes />}>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='collections' element={<Collections />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='order/:id' element={<OrderConfirmation />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='account' element={<User />} />
        <Route path='product/:id' element={<ProductDetail />} />
      </Route>
      <Route path='/admin' element={<AdminRoutes />}>
        <Route index element={<AdminDashboard />} />
        <Route path='users' element={<UsersManagement />} />
        <Route path='products' element={<ProductsManagement />} />
        <Route path='orders' element={<OrdersManagement />} />
      </Route>
    </>
  )
)

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <StrictMode>
      <UserContextProvider>
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
        {!loading && <RouterProvider router={router} />}
      </UserContextProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />)
