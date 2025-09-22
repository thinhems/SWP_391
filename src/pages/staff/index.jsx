import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Staff = () => {
  const { user } = useAuth();
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Staff Dashboard</h1>
          <p>Welcome, {user?.name || user?.email}. Role: {user?.role}</p>
        </div>
        <div className="card">
          <h3>Staff tools</h3>
          <p>Only Staff can see this page.</p>
        </div>
      </div>
    </div>
  );
};

export default Staff;


