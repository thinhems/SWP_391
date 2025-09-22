import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Admin Panel</h1>
          <p>Welcome, {user?.name || user?.email}. Role: {user?.role}</p>
        </div>
        <div className="card">
          <h3>Admin tools</h3>
          <p>Only Admins can see this page.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;


