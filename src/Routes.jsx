import React from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function Routes() {
  const location = useLocation();
  
  // Hide footer on login and signup pages
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <>
      <Header />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  )
}

export default Routes