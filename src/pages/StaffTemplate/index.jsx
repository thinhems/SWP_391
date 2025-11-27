import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StaffSidebar from "../../components/StaffSidebar";
import HeaderStaff from "../../components/HeaderStaff";
import { useAuth } from "../../contexts/AuthContext";
import { BookingsProvider } from '../../contexts/BookingsContext';
import { CarsProvider } from "../../contexts/CarsContext";
import { CustomersProvider } from "../../contexts/CustomersContext";
import { ActivitiesProvider } from "../../contexts/ActivitiesContext";

export default function StaffTemplate() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Kiểm tra token từ localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode JWT token để lấy role
  let userRole;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userRole = payload.role || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role từ token
  if (userRole?.toUpperCase() !== "STAFF") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <CarsProvider>
      <CustomersProvider>
        <ActivitiesProvider>
          <BookingsProvider>
            <div className="flex h-screen bg-gray-100">
            <div className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 ease-in-out`}>
              <StaffSidebar isOpen={sidebarOpen} />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <HeaderStaff onToggleSidebar={toggleSidebar} />
              <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
              </main>
            </div>
          </div>
        </BookingsProvider>
      </ActivitiesProvider>
    </CustomersProvider>
  </CarsProvider>
);
}