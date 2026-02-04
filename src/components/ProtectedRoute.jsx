import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, error, user } = useAuthStore();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Add logging to track the issue
  useEffect(() => {
    console.log('🛡️ ProtectedRoute - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'user:', user?.email);
  }, [isAuthenticated, isLoading, user]);

  // Set timeout for loading state
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setTimeoutReached(true);
      }, 12000); // 12 seconds timeout

      return () => clearTimeout(timer);
    } else {
      setTimeoutReached(false);
    }
  }, [isLoading]);

  // Show loading state while checking authentication
  // FIXED: Don't show loading if we have user data, even if isLoading is still true
  if (isLoading && !timeoutReached && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if timeout reached or connection error
  if (timeoutReached || (error && (error.includes('timeout') || error.includes('Cannot connect') || error.includes('Network error') || error.includes('ERR_INSUFFICIENT_RESOURCES')))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
        <div className="bg-[#1E293B]/80 backdrop-blur-md border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Backend Server Not Available</h2>
          <p className="text-white/70 mb-6">
            Cannot connect to the backend server. Please ensure the backend is running on http://localhost:5000
          </p>
          <div className="space-y-3">
            <p className="text-white/50 text-sm">To fix this:</p>
            <ol className="text-white/70 text-sm text-left space-y-2 list-decimal list-inside">
              <li>Navigate to: <code className="bg-[#0F172A] px-2 py-1 rounded">Backend</code> folder</li>
              <li>Run: <code className="bg-[#0F172A] px-2 py-1 rounded">npm start</code></li>
              <li>Ensure the server starts on port 5000</li>
            </ol>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#D4AF37] text-[#0F172A] font-bold rounded-lg hover:bg-[#F5A623] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FIXED: Only redirect if not authenticated AND not loading AND no user data
  if (!isAuthenticated && !isLoading && !user) {
    console.log('🚫 ProtectedRoute: Redirecting to login - not authenticated, no loading, no user');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  console.log('✅ ProtectedRoute: Rendering children');
  return children;
};

export default ProtectedRoute;
