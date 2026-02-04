import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [localError, setLocalError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = useAuthStore.getState().user;
      const from = location.state?.from?.pathname;
      
      // Determine redirect based on user role
      if (from) {
        navigate(from, { replace: true });
      } else if (user?.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/secret-dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
    setLocalError('');
  }, [clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user types
    if (error || localError) {
      clearError();
      setLocalError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    const result = await login(formData);

    if (result.success) {
      // Get token and user from response
      const token = result.data?.data?.token;
      const user = result.data?.data?.user;
      
      // Ensure token is stored in localStorage
      if (token) {
        localStorage.setItem('token', token);
        console.log('Login: Token stored in localStorage');
      } else {
        console.warn('Login: No token in response!');
      }
      
      // Small delay to ensure Zustand persist middleware syncs
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get user from store (might be more up-to-date)
      const storeState = useAuthStore.getState();
      const currentUser = storeState.user || user;
      
      console.log('Login: Store state after login:', {
        hasToken: !!storeState.token,
        hasUser: !!storeState.user,
        isAuthenticated: storeState.isAuthenticated,
        userRole: currentUser?.role
      });
      
      const from = location.state?.from?.pathname;
      
      // Determine redirect based on user role - prioritize admin dashboard for admin users
      if (from && from !== '/admin-dashboard' && from !== '/secret-dashboard') {
        // If there's a specific redirect path (and it's not a dashboard), use it
        navigate(from, { replace: true });
      } else if (currentUser?.role === 'admin') {
        // Admin users always go to admin dashboard
        console.log('Login: Redirecting admin user to admin dashboard');
        navigate('/admin-dashboard', { replace: true });
      } else {
        // Regular users go to secret dashboard
        console.log('Login: Redirecting regular user to secret dashboard');
        navigate('/secret-dashboard', { replace: true });
      }
    } else {
      setLocalError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">Login</h1>
            <p className="text-white/70 text-sm">Access your secret dashboard</p>
          </div>

          {/* Error Message */}
          {(error || localError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
            >
              {error || localError}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0F172A]/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-[#D4AF37] hover:text-[#F5A623] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#D4AF37] hover:text-[#F5A623] font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-white/50 hover:text-white/70 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
