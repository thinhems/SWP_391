import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
        </div>
        <div className="card">
          <p>
            Try a different page or go back to the home page.
          </p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;


