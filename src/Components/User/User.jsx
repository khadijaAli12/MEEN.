import React from 'react'
import { Link } from 'react-router-dom'

function User() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#3E2723] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Account</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-8">My Account</h1>
          <div className="w-24 h-[1px] bg-[#A1887F] mx-auto" />
        </div>

        {/* Account Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 hover:border-[#A1887F]/50 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-full" />
              <div>
                <h2 className="text-2xl font-light text-[#EFEBE9]">Profile</h2>
                <p className="text-sm text-[#BCAAA4] font-light">Manage your personal information</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider">Full Name</label>
                <p className="text-lg text-[#EFEBE9] font-light mt-1">Guest User</p>
              </div>
              <div>
                <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider">Email</label>
                <p className="text-lg text-[#EFEBE9] font-light mt-1">guest@meen.com</p>
              </div>
              <button className="mt-6 px-8 py-3 border border-[#A1887F] text-[#D7CCC8] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#8D6E63]/20 transition-all duration-500">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 hover:border-[#A1887F]/50 transition-all duration-500">
            <h2 className="text-2xl font-light text-[#EFEBE9] mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="border-b border-[#6D4C41]/30 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#EFEBE9] font-light">Order #12345</p>
                    <p className="text-sm text-[#8D6E63] font-light">Oud Royale - 50ml</p>
                  </div>
                  <span className="text-sm text-[#A1887F] font-light">$180</span>
                </div>
                <p className="text-xs text-[#BCAAA4] font-light">Delivered on Dec 1, 2025</p>
              </div>
              <div className="border-b border-[#6D4C41]/30 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#EFEBE9] font-light">Order #12344</p>
                    <p className="text-sm text-[#8D6E63] font-light">Velvet Rose - 100ml</p>
                  </div>
                  <span className="text-sm text-[#A1887F] font-light">$220</span>
                </div>
                <p className="text-xs text-[#BCAAA4] font-light">Delivered on Nov 28, 2025</p>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[#D7CCC8] hover:text-[#EFEBE9] text-sm font-light transition-colors mt-4"
              >
                <span className="tracking-wider uppercase">View All Orders</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 hover:border-[#A1887F]/50 transition-all duration-500">
            <h2 className="text-2xl font-light text-[#EFEBE9] mb-4">Wishlist</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#4E342E] border border-[#6D4C41]/30" />
                <div className="flex-1">
                  <p className="text-[#EFEBE9] font-light">Noir Intense</p>
                  <p className="text-sm text-[#8D6E63] font-light">$195</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#4E342E] border border-[#6D4C41]/30" />
                <div className="flex-1">
                  <p className="text-[#EFEBE9] font-light">Amber Essence</p>
                  <p className="text-sm text-[#8D6E63] font-light">$165</p>
                </div>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[#D7CCC8] hover:text-[#EFEBE9] text-sm font-light transition-colors mt-4"
              >
                <span className="tracking-wider uppercase">Browse Collection</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 hover:border-[#A1887F]/50 transition-all duration-500">
            <h2 className="text-2xl font-light text-[#EFEBE9] mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#6D4C41]/30">
                <div>
                  <p className="text-[#EFEBE9] font-light">Newsletter</p>
                  <p className="text-sm text-[#8D6E63] font-light">Receive updates and offers</p>
                </div>
                <div className="w-12 h-6 bg-[#8D6E63] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#EFEBE9] rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#6D4C41]/30">
                <div>
                  <p className="text-[#EFEBE9] font-light">SMS Notifications</p>
                  <p className="text-sm text-[#8D6E63] font-light">Order and delivery updates</p>
                </div>
                <div className="w-12 h-6 bg-[#6D4C41]/30 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-[#EFEBE9] rounded-full" />
                </div>
              </div>
              <button className="mt-4 px-8 py-3 border border-[#A1887F] text-[#D7CCC8] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#8D6E63]/20 transition-all duration-500 w-full">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="mt-12 text-center">
          <button className="px-12 py-5 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-[#EFEBE9] font-light tracking-[0.3em] uppercase text-sm hover:from-[#6D4C41] hover:to-[#5D4037] transition-all duration-500">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default User