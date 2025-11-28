import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Templates
import HomeTemplate from './pages/HomeTemplate';
import StaffTemplate from './pages/StaffTemplate';
import AdminTemplate from './pages/AdminTemplate';
// Import Home Pages
import HomePage from './pages/HomeTemplate/HomePage';
import LoginPage from './pages/HomeTemplate/LoginPage';
import RegisterPage from './pages/HomeTemplate/RegisterPage';
import ProfilePage from './pages/HomeTemplate/ProfilePage';
import ModelListPage from './pages/HomeTemplate/ModelListPage';
import BookingPage from './pages/HomeTemplate/BookingPage';
import MyContractsPage from './pages/HomeTemplate/MyContractsPage';
import ContractDetailPage from './pages/HomeTemplate/ContractDetailPage';
import ConfirmSignaturePage from './pages/HomeTemplate/ConfirmSignaturePage';
import PaymentResultPage from './pages/HomeTemplate/PaymentResultPage';
import AboutPage from './pages/HomeTemplate/AboutPage';
import ContactPage from './pages/HomeTemplate/ContactPage';
import EmailVerifyPage from './pages/HomeTemplate/EmailVerifyPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminTemplate/Dashboard';
import FleetOverview from './pages/AdminTemplate/FleetOverview';
import Revenue from './pages/AdminTemplate/Revenue';
import Stations from './pages/AdminTemplate/Stations';
import StaffManagement from './pages/AdminTemplate/StaffManagement';
// Import Staff Pages
import OverviewPage from './pages/StaffTemplate/OverviewPage';
import ManagerBookingPage from './pages/StaffTemplate/ManagerBookingPage';
import ManagerCarsPage from './pages/StaffTemplate/ManagerCarsPage';
import AdminManagerCarsPage from './pages/AdminTemplate/ManagerCarsPage';
import ContractHandoverPage from './pages/StaffTemplate/ManagerBookingPage/ContractHandoverPage';
import ComplatedHandoverPage from './pages/StaffTemplate/ManagerBookingPage/ComplatedHandoverPage';
import ApprovalBookingPage from './pages/StaffTemplate/ManagerBookingPage/ApprovalBookingPage';
import CarInspectionPage from './pages/StaffTemplate/ManagerCarsPage/CarInspectionPage';
import ManagerCustomerPage from './pages/StaffTemplate/ManagerCustomerPage';
import AdminCustomerManagementPage from './pages/AdminTemplate/CustomerManagementPage';
import CustomerVerificationPage from './pages/StaffTemplate/ManagerCustomerPage/CustomerVerificationPage';
// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* ADMIN ROUTES */}
            <Route path="/admin/*" element={<AdminTemplate />}>
              <Route index element={<AdminDashboard />} />
              <Route path="fleet" element={<FleetOverview />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="stations" element={<Stations />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="manage-cars" element={<AdminManagerCarsPage />} />
              <Route path="manage-cars/car-delivery/:carId" element={<ContractHandoverPage />} />
              <Route path="manage-cars/car-return/:carId" element={<ComplatedHandoverPage />} />
              <Route path="manage-cars/approval-review/:carId" element={<ApprovalBookingPage />} />
              <Route path="manage-cars/inspection/:carId" element={<CarInspectionPage />} />
              <Route path="manage-customer" element={<AdminCustomerManagementPage />} />
            </Route>
            {/* STAFF ROUTES */}
            <Route path="/staff/*" element={<StaffTemplate />}>
              <Route index element={<OverviewPage />} />
              <Route path="manage-bookings" element={<ManagerBookingPage />} />
              <Route path="manage-bookings/car-delivery/:bookingId" element={<ContractHandoverPage />} />
              <Route path="manage-bookings/car-return/:bookingId" element={<ComplatedHandoverPage />} />
              <Route path="manage-bookings/approval-review/:bookingId" element={<ApprovalBookingPage />} />
              <Route path="manage-bookings/inspection/:bookingId" element={<CarInspectionPage />} />
              <Route path="manage-cars" element={<ManagerCarsPage />} />
              <Route path="manage-cars/inspection/:carId" element={<CarInspectionPage />} />
              <Route path="manage-customer" element={<ManagerCustomerPage />} />
              <Route path="manage-customer/verify/:customerId" element={<CustomerVerificationPage />} />
            </Route>
            {/* HOME ROUTES*/}
            <Route path="/*" element={<HomeTemplate />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verify" element={<EmailVerifyPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="model-rental" element={<ModelListPage />} />
              <Route path="booking/:modelId" element={<BookingPage />} />
              <Route path="my-contracts" element={<MyContractsPage />} />
              <Route path="contract-detail/:id" element={<ContractDetailPage />} />
              <Route path="confirm-signature" element={<ConfirmSignaturePage />} />
              <Route path="payment/result" element={<PaymentResultPage />} />
              <Route path="payment-result" element={<PaymentResultPage />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;