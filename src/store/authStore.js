import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      },

      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', userData);
          const { user, token } = response.data.data;
          
          console.log('Register: Response received:', {
            hasUser: !!user,
            hasToken: !!token,
            tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
          });
          
          // Store token in localStorage for Authorization header (cookie is also set by backend)
          if (token) {
            localStorage.setItem('token', token);
            console.log('Register: Token stored in localStorage');
          } else {
            console.error('Register: No token in response!', response.data);
          }
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('Register: Zustand state updated');
          return { success: true, data: response.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
          console.error('Register: Error:', errorMessage, error);
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          const { user, token } = response.data.data;
          
          console.log('Login: Response received:', {
            hasUser: !!user,
            hasToken: !!token,
            tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
          });
          
          // Store token in localStorage for Authorization header (cookie is also set by backend)
          if (token) {
            localStorage.setItem('token', token);
            console.log('Login: Token stored in localStorage');
          } else {
            console.error('Login: No token in response!', response.data);
          }
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('Login: Zustand state updated');
          return { success: true, data: response.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          console.error('Login: Error:', errorMessage, error);
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Logout
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },

      // Get current user
      getCurrentUser: async () => {
        const state = get();
        // Prevent multiple simultaneous calls - but allow if it's been stuck for too long
        if (state.isLoading) {
          // If loading has been stuck for more than 15 seconds, allow a new call
          const loadingStartTime = state.loadingStartTime || Date.now();
          const timeSinceStart = Date.now() - loadingStartTime;
          
          if (timeSinceStart < 15000) {
            console.log('getCurrentUser: Request already in progress, skipping...');
            return { success: false, error: 'Request already in progress' };
          } else {
            console.warn('getCurrentUser: Previous request stuck, allowing new call');
            // Reset loading state
            set({ isLoading: false, loadingStartTime: null });
          }
        }
        
        // Check if we have a token before making the request
        const token = state.token || localStorage.getItem('token');
        if (!token) {
          console.warn('getCurrentUser: No token found in state or localStorage');
          set({ isLoading: false, isAuthenticated: false, user: null, error: 'No authentication token found' });
          return { success: false, error: 'No authentication token found. Please login again.' };
        }
        
        console.log('getCurrentUser: Making request with token:', token.substring(0, 20) + '...');
        
        set({ isLoading: true, error: null, loadingStartTime: Date.now() });
        try {
          // Add timeout to prevent hanging requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          const response = await api.get('/auth/me', {
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          const user = response.data.data.user;
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            loadingStartTime: null,
          });
          
          console.log('getCurrentUser: Successfully fetched user:', user.email);
          return { success: true, data: user };
        } catch (error) {
          // Handle abort/timeout
          if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
            const errorMessage = 'Request timeout. Backend server may not be responding.';
            console.error('getCurrentUser: Request timeout');
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
          
          const errorMessage = error.response?.data?.message || error.message || 'Failed to get user';
          const statusCode = error.response?.status;
          
          console.error('getCurrentUser: Error fetching user:', {
            status: statusCode,
            message: errorMessage,
            response: error.response?.data,
            token: token ? 'Token exists' : 'No token',
            errorName: error.name,
            errorCode: error.code
          });
          
          // If 401, clear auth state
          if (statusCode === 401) {
            console.warn('getCurrentUser: 401 Unauthorized - clearing auth state');
            set({ 
              isLoading: false, 
              isAuthenticated: false, 
              user: null, 
              token: null,
              error: 'Session expired. Please login again.',
              loadingStartTime: null,
            });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          } else {
            set({ isLoading: false, error: errorMessage, loadingStartTime: null });
          }
          
          return { success: false, error: errorMessage };
        }
      },

      // Verify token
      verifyToken: async () => {
        try {
          const response = await api.get('/auth/verify');
          return { success: true, data: response.data };
        } catch (error) {
          set({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return { success: false, error: error.message };
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
