import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password });
    // Redirect to account page after login
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20">
      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3E2723] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5F1ED] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md px-6 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-8 py-3 bg-[#3E2723]">
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Welcome Back</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extralight text-[#3E2723] mt-6 mb-4">Login to Continue</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
        </div>

        {/* Modern Login Form */}
        <form onSubmit={handleSubmit} className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-xl space-y-6">
          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full shadow-lg hover:shadow-xl"
          >
            Login
          </button>

          <p className="text-center text-sm text-[#6D4C41] font-light mt-6">
            Don't have an account? <Link to="/signup" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}