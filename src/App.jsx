import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/admin/index.jsx';
import Staff from './pages/staff/index.jsx';
import Customer from './pages/customer/index.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import RequireRole from './components/RequireRole.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />

              <Route
                path="/admin"
                element={
                  <RequireRole roles={["Admin"]}>
                    <Admin />
                  </RequireRole>
                }
              />

              <Route
                path="/staff"
                element={
                  <RequireRole roles={["Staff"]}>
                    <Staff />
                  </RequireRole>
                }
              />

              <Route
                path="/customer"
                element={
                  <RequireRole roles={["Customer"]}>
                    <Customer />
                  </RequireRole>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
