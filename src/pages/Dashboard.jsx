import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Example API call - replace with your actual endpoint
      const result = await dataService.getAll('/users');
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newItem) => {
    try {
      const result = await dataService.create('/users', newItem);
      if (result.success) {
        setData(prev => [...prev, result.data]);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create item');
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      const result = await dataService.update('/users', id, updatedItem);
      if (result.success) {
        setData(prev => prev.map(item => 
          item.id === id ? result.data : item
        ));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const result = await dataService.delete('/users', id);
        if (result.success) {
          setData(prev => prev.filter(item => item.id !== id));
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || user?.email}!</p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="card">
          <h3>API Integration Example</h3>
          <p>This dashboard demonstrates how to use the axios services:</p>
          
          <div className="mb-3">
            <button 
              onClick={fetchData} 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading data...</div>
          ) : (
            <div>
              <h4>Data from API:</h4>
              {data.length > 0 ? (
                <ul>
                  {data.map((item, index) => (
                    <li key={index}>
                      {JSON.stringify(item)}
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-secondary"
                        style={{ marginLeft: '10px', padding: '5px 10px' }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available. Make sure your backend API is running.</p>
              )}
            </div>
          )}
        </div>

        <div className="card">
          <h3>Available Services</h3>
          <ul>
            <li><strong>authService:</strong> Login, register, logout, token management</li>
            <li><strong>dataService:</strong> Generic CRUD operations for any endpoint</li>
            <li><strong>api:</strong> Configured axios instance with interceptors</li>
          </ul>
        </div>

        <div className="card">
          <h3>Environment Configuration</h3>
          <p>Set your API URL in the environment variables:</p>
          <code>REACT_APP_API_URL=http://localhost:3001/api</code>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
