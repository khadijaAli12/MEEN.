import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

function User() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
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
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Your Account</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#3E2723] mt-6 mb-8">My Account</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
        </div>

        {/* Account Sections - Modern Design */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#3E2723] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#F5F1ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extralight text-[#3E2723]">Profile</h2>
                <p className="text-sm text-[#6D4C41] font-light">Manage your personal information</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider">Full Name</label>
                <p className="text-lg text-[#3E2723] font-light mt-1">{user.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider">Email</label>
                <p className="text-lg text-[#3E2723] font-light mt-1">{user.email || 'N/A'}</p>
              </div>
              <button className="mt-6 px-8 py-3 border border-[#3E2723] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#3E2723] hover:text-[#F5F1ED] transition-all duration-500 rounded-full">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <h2 className="text-2xl font-extralight text-[#3E2723] mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="text-center py-8">
                <p className="text-[#6D4C41] font-light">No orders yet</p>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[#3E2723] hover:text-[#6D4C41] text-sm font-light transition-colors mt-4"
              >
                <span className="tracking-wider uppercase">Start Shopping</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <h2 className="text-2xl font-extralight text-[#3E2723] mb-4">Wishlist</h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <p className="text-[#6D4C41] font-light">Your wishlist is empty</p>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[#3E2723] hover:text-[#6D4C41] text-sm font-light transition-colors mt-4"
              >
                <span className="tracking-wider uppercase">Browse Collection</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <h2 className="text-2xl font-extralight text-[#3E2723] mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#3E2723]/20">
                <div>
                  <p className="text-[#3E2723] font-light">Newsletter</p>
                  <p className="text-sm text-[#6D4C41] font-light">Receive updates and offers</p>
                </div>
                <div className="w-12 h-6 bg-[#3E2723] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#F5F1ED] rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#3E2723]/20">
                <div>
                  <p className="text-[#3E2723] font-light">SMS Notifications</p>
                  <p className="text-sm text-[#6D4C41] font-light">Order and delivery updates</p>
                </div>
                <div className="w-12 h-6 bg-[#6D4C41]/30 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-[#F5F1ED] rounded-full" />
                </div>
              </div>
              <button className="mt-4 px-8 py-3 border border-[#3E2723] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#3E2723] hover:text-[#F5F1ED] transition-all duration-500 rounded-full w-full">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Sign Out - Modern Design */}
        <div className="mt-12 text-center">
          <button 
            onClick={handleSignOut}
            className="px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default User