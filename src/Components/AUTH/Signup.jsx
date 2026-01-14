import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    // Basic client-side validation to provide immediate feedback
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setError("Name must contain only letters and spaces");
      return;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (password.length < 6 || !passwordRegex.test(password)) {
      setError("Password must be at least 6 characters with uppercase, lowercase, and number");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await register(name, email, password);
      // Redirect to account page after signup
      navigate('/account');
    } catch (err) {
      // Handle validation errors from backend
      if (err.message.includes('Validation failed')) {
        try {
          const validationError = JSON.parse(err.message);
          if (validationError.errors && validationError.errors.length > 0) {
            setError(validationError.errors[0].msg || 'Validation failed');
            return;
          }
        } catch (parseError) {
          // If parsing fails, use the original error message
          setError('Validation failed: ' + err.message);
          return;
        }
      }
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
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
            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Join meen</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extralight text-[#3E2723] mt-6 mb-4">Create Account</h1>
          <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Modern Signup Form */}
        <form onSubmit={handleSubmit} className="bg-[#F5F1ED] border border-[#3E2723]/20 p-8 rounded-2xl shadow-xl space-y-6">
          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
              minLength="6"
            />
            <p className="text-xs text-[#6D4C41] mt-1 font-light">Password must contain at least 6 characters, with uppercase, lowercase, and number</p>
          </div>

          <div>
            <label className="text-sm text-[#3E2723] font-light uppercase tracking-wider block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-colors duration-500 text-[#3E2723] text-lg font-light placeholder:text-[#6D4C41]/50"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-8 px-12 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#6D4C41] transition-all duration-500 rounded-full shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-[#6D4C41] font-light mt-6">
            Already have an account? <Link to="/login" className="text-[#3E2723] hover:text-[#6D4C41] transition-colors">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}