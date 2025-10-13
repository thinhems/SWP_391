import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Dynamic imports for templates
const HomeTemplate = React.lazy(() => import('./pages/HomeTemplate'));
const StaffTemplate = React.lazy(() => import('./pages/StaffTemplate'));

// Dynamic imports for Home Pages
const Home = React.lazy(() => import('./pages/Home'));
const LoginPage = React.lazy(() => import('./pages/HomeTemplate/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/HomeTemplate/RegisterPage'));
const ProfilePage = React.lazy(() => import('./pages/HomeTemplate/ProfilePage'));
const CarListPage = React.lazy(() => import('./pages/HomeTemplate/CarListPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Dynamic imports for Staff Pages
const OverviewPage = React.lazy(() => import('./pages/StaffTemplate/OverviewPage'));
const ManagerCarsPage = React.lazy(() => import('./pages/StaffTemplate/ManagerCarsPage'));
const CarDeliveryPage = React.lazy(() => import('./pages/StaffTemplate/CarDeliveryPage'));
const CarReturnPage = React.lazy(() => import('./pages/StaffTemplate/CarReturnPage'));
const ApprovalReviewPage = React.lazy(() => import('./pages/StaffTemplate/ApprovalReviewPage'));
const CarInspectionPage = React.lazy(() => import('./pages/StaffTemplate/CarInspectionPage'));
const CustomerManagementPage = React.lazy(() => import('./pages/StaffTemplate/CustomerManagementPage'));
const CustomerVerificationPage = React.lazy(() => import('./pages/StaffTemplate/CustomerVerificationPage'));

import './App.css';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
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
                <Route path="cars-rental" element={<CarListPage />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;