import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Welcome to SWP 391</h1>
          <p>Your React.js frontend application with axios integration</p>
        </div>

        <div className="row" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <div className="card" style={{ flex: '1', maxWidth: '400px' }}>
            <h3>Features</h3>
            <ul>
              <li>React.js 18 with modern hooks</li>
              <li>Axios for API communication</li>
              <li>React Router for navigation</li>
              <li>Context API for state management</li>
              <li>Responsive design</li>
              <li>Authentication system</li>
            </ul>
          </div>

          <div className="card" style={{ flex: '1', maxWidth: '400px' }}>
            <h3>Getting Started</h3>
            <p>This project includes:</p>
            <ul>
              <li>Pre-configured axios instance</li>
              <li>Authentication services</li>
              <li>Generic data services</li>
              <li>Protected routes</li>
              <li>Error handling</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-3">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <div>
              <Link to="/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
