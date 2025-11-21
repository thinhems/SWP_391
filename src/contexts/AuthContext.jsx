import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

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

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    if (result.success) {
      setUser(result.data.user);
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
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
