import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import HeaderAdmin from '../../components/HeaderAdmin';
import { CarsProvider } from '../../contexts/CarsContext';
import { CustomersProvider } from '../../contexts/CustomersContext';
import { ActivitiesProvider } from '../../contexts/ActivitiesContext';
import { StationsProvider } from '../../contexts/StationsContext';

export default function AdminTemplate() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

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


