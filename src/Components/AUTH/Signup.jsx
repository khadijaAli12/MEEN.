import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setUser({ username, email });
    // Redirect to account page after signup
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#3E2723] flex items-center justify-center py-20">
      <div className="w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Join meen</span>
          <h1 className="text-4xl sm:text-5xl font-light text-[#EFEBE9] mt-6 mb-4">Create Account</h1>
          <div className="w-24 h-[1px] bg-[#A1887F] mx-auto" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 space-y-6">
          <div>
            <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider block mb-2">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#6D4C41]/50 focus:border-[#A1887F] focus:outline-none transition-colors duration-500 text-[#EFEBE9] text-lg font-light placeholder:text-[#8D6E63]/40"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#6D4C41]/50 focus:border-[#A1887F] focus:outline-none transition-colors duration-500 text-[#EFEBE9] text-lg font-light placeholder:text-[#8D6E63]/40"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider block mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#6D4C41]/50 focus:border-[#A1887F] focus:outline-none transition-colors duration-500 text-[#EFEBE9] text-lg font-light placeholder:text-[#8D6E63]/40"
              required
              minLength="6"
            />
          </div>

          <div>
            <label className="text-sm text-[#A1887F] font-light uppercase tracking-wider block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#6D4C41]/50 focus:border-[#A1887F] focus:outline-none transition-colors duration-500 text-[#EFEBE9] text-lg font-light placeholder:text-[#8D6E63]/40"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-12 py-5 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-[#EFEBE9] font-light tracking-[0.3em] uppercase text-sm hover:from-[#6D4C41] hover:to-[#5D4037] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-[#BCAAA4] font-light mt-6">
            Already have an account? <Link to="/login" className="text-[#A1887F] hover:text-[#D7CCC8] transition-colors">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
