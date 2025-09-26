// src/App.jsx - Updated

import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StaffTemplate from './pages/StaffTemplate';
import ManagerCarsPage from './pages/StaffTemplate/ManagerCarsPage';
import CarDeliveryPage from './pages/StaffTemplate/CarDeliveryPage/';
import ApprovalReviewPage from './pages/StaffTemplate/ApprovalReviewPage';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main className="main-content">
            <Routes>
              <Route path="/staff/*" element={<StaffTemplate />}>
                <Route path="manage-cars" element={<ManagerCarsPage />} />
                <Route path="manage-cars/car-delivery/:carId" element={<CarDeliveryPage />} />
                <Route path="manage-cars/approval-review/:carId" element={<ApprovalReviewPage />} />
              </Route>
              <Route path="*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </>
              }/>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;