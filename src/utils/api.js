import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Include cookies in requests
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - Clear token
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Note: Auth store will handle clearing its state when it receives the 401 error
    }
    
    // Handle network errors and timeouts
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        error.message = 'Request timeout. Please check if the backend server is running.';
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
        error.message = 'Cannot connect to server. Please ensure the backend is running on http://localhost:5000';
      } else {
        error.message = 'Network error. Please check your connection and ensure the backend server is running.';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
