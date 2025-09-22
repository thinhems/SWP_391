import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireRole = ({ children, roles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role || user?.roles?.[0];
  const allowed = roles.length === 0 || (userRole && roles.includes(userRole));

  if (!allowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireRole;


