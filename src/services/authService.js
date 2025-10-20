import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: response.data };
    } catch (error) {
      // fake login for staff/admin/customer, xóa khi có backend
      const { email, password } = credentials;
      // Admin account (fake)
      if (email === 'admin@gmail.com' && password === '123456') {
        const user = {
          name: 'Admin User',
          email: 'admin@gmail.com',
          phone: '0888888888',
          role: 'admin',
          station: null,
          isVerified: "verified",
        };
        const token = 'fake-jwt-token-admin';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, data: { token, user } };
      }
      if (email === 'staff@gmail.com' && password === '123456') {
        // Tạo user giả lập
        const user = {
          name: 'Staff User',
          email: 'staff@gmail.com',
          phone: '0123456789',
          role: 'staff',
          station: 'Quận 1',
          isVerified: "verified",
        };
        const token = 'fake-jwt-token'; // token giả

        // Lưu vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, data: { token, user } };
      } else if (email === 'mdtrong1305@gmail.com' && password === '123456') {
        const user = {
          name: 'Trọng',
          email: 'mdtrong1305@gmail.com',
          phone: '0999999999',
          role: 'customer',
          station: null,
          isVerified: "verified",
        };
        const token = 'fake-jwt-token-admin'; // token giả

        // Lưu vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, data: { token, user } };
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      localStorage.setItem('token', token);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Token refresh failed' 
      };
    }
  }
};
