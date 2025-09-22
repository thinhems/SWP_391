import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          SWP 391
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={isActive('/dashboard') ? 'active' : ''}
                >
                  Dashboard
                </Link>
              </li>
              {userRole === 'Admin' && (
                <li>
                  <Link 
                    to="/admin" 
                    className={isActive('/admin') ? 'active' : ''}
                  >
                    Admin
                  </Link>
                </li>
              )}
              {userRole === 'Staff' && (
                <li>
                  <Link 
                    to="/staff" 
                    className={isActive('/staff') ? 'active' : ''}
                  >
                    Staff
                  </Link>
                </li>
              )}
              {userRole === 'Customer' && (
                <li>
                  <Link 
                    to="/customer" 
                    className={isActive('/customer') ? 'active' : ''}
                  >
                    Customer
                  </Link>
                </li>
              )}
              <li>
                <span className="navbar-text">
                  Welcome, {user?.name || user?.email}
                </span>
              </li>
              <li>
                <button 
                  onClick={logout}
                  className="btn btn-secondary"
                  style={{ margin: 0 }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={isActive('/login') ? 'active' : ''}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={isActive('/register') ? 'active' : ''}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
