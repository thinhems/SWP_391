import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Templates
import HomeTemplate from './pages/HomeTemplate';
import StaffTemplate from './pages/StaffTemplate';
// Import Home Pages
import Home from './pages/Home';
import LoginPage from './pages/HomeTemplate/LoginPage';
import RegisterPage from './pages/HomeTemplate/RegisterPage';
import ProfilePage from './pages/HomeTemplate/ProfilePage';
import ModelListPage from './pages/HomeTemplate/ModelListPage';
import BookingPage from './pages/HomeTemplate/BookingPage';
import Dashboard from './pages/Dashboard';
// Import Staff Pages
import OverviewPage from './pages/StaffTemplate/OverviewPage';
import ManagerCarsPage from './pages/StaffTemplate/ManagerCarsPage';
import CarDeliveryPage from './pages/StaffTemplate/CarDeliveryPage';
import CarReturnPage from './pages/StaffTemplate/CarReturnPage';
import ApprovalReviewPage from './pages/StaffTemplate/ApprovalReviewPage';
import CarInspectionPage from './pages/StaffTemplate/CarInspectionPage';
import CustomerManagementPage from './pages/StaffTemplate/CustomerManagementPage';
import CustomerVerificationPage from './pages/StaffTemplate/CustomerVerificationPage';
// Context Providers
import { AuthProvider } from './contexts/AuthContext';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* STAFF ROUTES */}
            <Route path="/staff/*" element={<StaffTemplate />}>
              <Route index element={<OverviewPage />} />
              <Route path="manage-cars" element={<ManagerCarsPage />} />
              <Route path="manage-cars/car-delivery/:carId" element={<CarDeliveryPage />} />
              <Route path="manage-cars/car-return/:carId" element={<CarReturnPage />} />
              <Route path="manage-cars/approval-review/:carId" element={<ApprovalReviewPage />} />
              <Route path="manage-cars/inspection/:carId" element={<CarInspectionPage />} />
              <Route path="manage-customer" element={<CustomerManagementPage />} />
              <Route path="manage-customer/verify/:customerId" element={<CustomerVerificationPage />} />
            </Route>
            {/* HOME ROUTES*/}
            <Route path="/*" element={<HomeTemplate />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="model-rental" element={<ModelListPage />} />
              <Route path="booking/:modelId" element={<BookingPage />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;