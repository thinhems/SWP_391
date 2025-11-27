import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm kiểm tra token có hết hạn không
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
      const payload = jwtDecode(token);
      const expiry = payload.exp;
      
      if (!expiry) return false; // Nếu không có exp thì coi như không hết hạn
      
      const now = Math.floor(Date.now() / 1000);
      return now >= expiry;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true; // Nếu có lỗi thì coi như hết hạn
    }
  };

  // Hàm kiểm tra và logout nếu token hết hạn
  const checkTokenExpiry = () => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      console.log('Token đã hết hạn, đang logout...');
      logout();
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      // Không có token -> chưa đăng nhập
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      // Kiểm tra token có hết hạn không
      if (isTokenExpired(token)) {
        console.log('Token đã hết hạn');
        authService.logout();
        setUser(null);
        setLoading(false);
        return;
      }
      // Token hợp lệ -> decode và set user
      try {
        const payload = jwtDecode(token);
        const userFromToken = {
          id: payload.userId,
          role: payload.role.toLowerCase(),
          name: payload.unique_name || '',
          address: payload.address || '',
          email: payload.email,
          station: payload.stationId ? parseInt(payload.stationId, 10) : null,
          verifiedStatus: payload.verifiedStatus ? parseInt(payload.verifiedStatus, 10) : null
        };
        setUser(userFromToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        authService.logout();
        setUser(null);
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Kiểm tra token mỗi phút
    const intervalId = setInterval(() => {
      checkTokenExpiry();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    if (result.success) {
      const token = result.data.token;
      const payload = jwtDecode(token);
      console.log('Decoded JWT payload:', payload); 
      setUser({
        id: payload.userId,
        role: payload.role.toLowerCase(),
        name: payload.unique_name || '',
        address: payload.address || '',
        email: payload.email,
        station: payload.stationId ? parseInt(payload.stationId, 10) : null,
        verifiedStatus: payload.verifiedStatus ? parseInt(payload.verifiedStatus, 10) : null
      });
    }
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const verifyAccount = async (userId, verificationData) => {
    try {
      await authService.sendVerificationInfo(userId, verificationData);
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      throw error;
    }
  }

  const updateProfile = async (userId, profileData) => {
    try {
      await authService.updateProfile(userId, profileData);
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      throw error;
    }
  }

  const getProfile = async (userId) => {
    try {
      setLoading(true);
      await authService.getProfile(userId);
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const changePassword = async (userId, passwordData) => {
    try {
      await authService.changePassword(userId, passwordData);
    } catch (error) {
      throw error;
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    verifyAccount,
    updateProfile,
    getProfile,
    changePassword,
    checkTokenExpiry,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
