import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import useGalleryStore from '../store/galleryStore';
import GalleryManager from '../components/GalleryManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, getCurrentUser, isLoading: authLoading, error: authError } = useAuthStore();
  const { images, fetchImages, isLoading: galleryLoading, error: galleryError } = useGalleryStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' or 'gallery'
  const hasLoadedRef = useRef(false); // Track if we've already loaded data
  const isLoadingRef = useRef(false); // Track if we're currently loading
  const errorLoggedRef = useRef(false); // Track if we've already logged the error

  // Track initLoading changes
  useEffect(() => {
    console.log('🔄 initLoading changed to:', initLoading, 'at:', new Date().toISOString());
  }, [initLoading]);

  // Track component mount/unmount
  useEffect(() => {
    console.log('🏗️ AdminDashboard MOUNTED at:', new Date().toISOString());
    return () => {
      console.log('💥 AdminDashboard UNMOUNTED at:', new Date().toISOString());
    };
  }, []);

  // Separate effect to handle authentication redirect
  useEffect(() => {
    console.log('🔐 Auth redirect effect triggered', {
      isAuthenticated,
      user: user?.email,
      timestamp: new Date().toISOString()
    });
    
    if (!isAuthenticated) {
      console.log('🚫 Not authenticated, redirecting to login');
      navigate('/login', { state: { from: { pathname: '/admin-dashboard' } } });
    } else {
      console.log('✅ User is authenticated');
    }
  }, [isAuthenticated, navigate]);

  // Main effect to load data - runs only once when authenticated
  useEffect(() => {
    console.log('🔄 AdminDashboard useEffect triggered', {
      isAuthenticated,
      hasLoadedRef: hasLoadedRef.current,
      timestamp: new Date().toISOString()
    });
    
    // Check authentication status
    if (!isAuthenticated) {
      console.log('❌ AdminDashboard: Not authenticated, returning');
      return;
    }

    // Prevent multiple loads
    if (hasLoadedRef.current) {
      console.log('⚠️ AdminDashboard: Already loaded, skipping');
      return;
    }

    console.log('✅ AdminDashboard: Proceeding with data load');
    
    // Set loaded flag immediately
    hasLoadedRef.current = true;

    // Fetch data
    const loadData = async () => {
      console.log('📊 AdminDashboard: Starting data load...');
      
      try {
        const results = await Promise.allSettled([
          getCurrentUser(),
          fetchImages({ active: 'true' })
        ]);
        
        const authResult = results[0];
        const authSuccess = authResult.status === 'fulfilled' && authResult.value?.success;
        
        const galleryResult = results[1];
        const gallerySuccess = galleryResult.status === 'fulfilled' && galleryResult.value?.success;
        
        console.log('📈 Admin dashboard data loaded successfully', {
          authSuccess,
          gallerySuccess,
          authResult: authResult.status,
          galleryResult: galleryResult.status
        });
        
        // Stop loading when auth succeeds
        setInitLoading(false);
        console.log('✅ setInitLoading(false) called - loading should stop now');
        
        // Debug: Log the full authResult structure
        console.log('🔍 Debug - Full authResult:', authResult);
        if (authResult.status === 'fulfilled') {
          console.log('🔍 Debug - authResult.value:', authResult.value);
          console.log('🔍 Debug - authResult.value?.data:', authResult.value?.data);
          console.log('🔍 Debug - user role:', authResult.value?.data?.role);
        }
        
        // Check if user is admin - FIXED: access role directly from data
        if (authResult.status === 'fulfilled' && authResult.value?.data?.role !== 'admin') {
          console.log('👤 User is not admin, redirecting to user dashboard');
          navigate('/secret-dashboard', { replace: true });
        } else {
          console.log('👑 User is admin, staying on admin dashboard');
        }
      } catch (error) {
        console.error('💥 Error loading admin dashboard data:', error);
        setInitLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, getCurrentUser, fetchImages, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  // Show error if timeout reached or backend is not available (only for auth errors, not gallery)
  if (loadingTimeout || authError) {
    const errorMessage = authError || 'Connection timeout';
    const isBackendError = errorMessage.includes('timeout') || 
                          errorMessage.includes('Cannot connect') || 
                          errorMessage.includes('Network error') || 
                          errorMessage.includes('ERR_INSUFFICIENT_RESOURCES') ||
                          loadingTimeout;

    if (isBackendError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
          <div className="bg-[#1E293B]/80 backdrop-blur-md border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Backend Server Not Available</h2>
            <p className="text-white/70 mb-6">
              {loadingTimeout 
                ? 'Request timed out. The backend server may not be running.'
                : errorMessage || 'Cannot connect to the backend server. Please ensure the backend is running on http://localhost:5000'}
            </p>
            <div className="space-y-3">
              <p className="text-white/50 text-sm">To fix this:</p>
              <ol className="text-white/70 text-sm text-left space-y-2 list-decimal list-inside">
                <li>Navigate to the Backend folder</li>
                <li>Run: <code className="bg-[#0F172A] px-2 py-1 rounded">npm start</code> or <code className="bg-[#0F172A] px-2 py-1 rounded">node server.js</code></li>
                <li>Ensure the server starts on port 5000</li>
                <li>Check that MongoDB and Redis connections are successful</li>
              </ol>
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors"
              >
                Retry
              </motion.button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Show loading state
  console.log('🔍 Loading check - initLoading:', initLoading, 'user:', user?.email, 'user.role:', user?.role);
  
  // Force stop loading if we have auth data showing admin role (aggressive fallback)
  const shouldStopLoading = user?.role === 'admin' || user?.email === 'eswar@gmail.com';
  if (shouldStopLoading && initLoading) {
    console.log('🛑 Force stopping loading - admin user detected');
    setInitLoading(false);
  }
  
  if (initLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-white/70">Loading admin dashboard...</p>
          <p className="text-white/50 text-sm mt-2">This may take a few seconds</p>
          <motion.button
            onClick={() => setInitLoading(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors"
          >
            Force Stop Loading
          </motion.button>
        </div>
      </div>
    );
  }

  // Show loading or redirect if not admin
  if (user.role !== 'admin') {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Header */}
      <div className="bg-[#1E293B]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#D4AF37]">Admin Dashboard</h1>
              <p className="text-white/70 text-sm">Welcome back, {user.username || user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate('/secret-dashboard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-colors"
              >
                User Dashboard
              </motion.button>
              <motion.button
                onClick={handleLogout}
                disabled={isLoggingOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-[#1E293B]/50 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('overview')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              activeSection === 'overview'
                ? 'bg-[#D4AF37] text-[#0F172A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Overview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('gallery')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              activeSection === 'gallery'
                ? 'bg-[#D4AF37] text-[#0F172A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Gallery Manager
          </motion.button>
        </div>

        {/* Admin Badge */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#D4AF37]/20 to-[#F5A623]/20 border border-[#D4AF37]/50 rounded-2xl p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <span className="text-2xl">👑</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#D4AF37]">Administrator Access</h2>
                <p className="text-white/70 text-sm">You have full access to manage the portfolio</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content based on active section */}
        {activeSection === 'overview' ? (
          <div className="space-y-8">
            {/* User Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-[#D4AF37] mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">Username</p>
                  <p className="text-white font-medium">{user.username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Email</p>
                  <p className="text-white font-medium">{user.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Role</p>
                  <p className="text-[#D4AF37] font-medium capitalize">{user.role || 'user'}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Account Status</p>
                  <p className={`font-medium ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Gallery Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-[#D4AF37] mb-4">Gallery Statistics</h2>
              {galleryLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4AF37]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                    <p className="text-white/50 text-sm mb-1">Total Images</p>
                    <p className="text-2xl font-bold text-[#D4AF37]">{images.length}</p>
                  </div>
                  <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                    <p className="text-white/50 text-sm mb-1">Active Images</p>
                    <p className="text-2xl font-bold text-green-400">
                      {images.filter(img => img.isActive).length}
                    </p>
                  </div>
                  <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                    <p className="text-white/50 text-sm mb-1">Categories</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {new Set(images.map(img => img.category)).size}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          <GalleryManager />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
