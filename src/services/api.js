import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // This will be proxied in development
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Kiểm tra token có hết hạn không
      try {
        const payload = jwtDecode(token);
        const expiry = payload.exp;
        
        if (expiry) {
          const now = Math.floor(Date.now() / 1000);
          if (now >= expiry) {
            // Token hết hạn, xóa và chuyển về login
            console.log('Token hết hạn, đang logout...');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(new Error('Token đã hết hạn'));
          }
        }
      } catch (error) {
        console.error('Error checking token in interceptor:', error);
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
