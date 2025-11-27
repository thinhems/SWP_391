import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import HeaderAdmin from '../../components/HeaderAdmin';
import { CarsProvider } from '../../contexts/CarsContext';
import { CustomersProvider } from '../../contexts/CustomersContext';
import { ActivitiesProvider } from '../../contexts/ActivitiesContext';
import { StationsProvider } from '../../contexts/StationsContext';
import { jwtDecode } from "jwt-decode";

export default function AdminTemplate() {
  const { loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) return null;
   // Kiểm tra token từ localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    // Decode JWT token để lấy role
    let userRole;
    try {
      const payload = jwtDecode(token);
      userRole = payload.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" replace />;
    }
  
    // Kiểm tra role từ token
    if (userRole?.toUpperCase() !== "ADMIN") {
      return <Navigate to="/" replace />;
    }
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <StationsProvider>
      <CarsProvider>
        <CustomersProvider>
          <ActivitiesProvider>
            <div className="flex h-screen bg-gray-100">
              <div className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 ease-in-out`}>
                <AdminSidebar isOpen={sidebarOpen} />
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderAdmin onToggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-6">
                  <Outlet />
                </main>
              </div>
            </div>
          </ActivitiesProvider>
        </CustomersProvider>
      </CarsProvider>
    </StationsProvider>
  );
}


