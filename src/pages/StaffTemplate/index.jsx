import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StaffSidebar from "../../components/StaffSidebar";
import HeaderStaff from "../../components/HeaderStaff";
import { useAuth } from "../../contexts/AuthContext";
import { StaffDataProvider } from "../../contexts/StaffDataContext";

export default function StaffTemplate() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "staff") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <StaffDataProvider>
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
    </StaffDataProvider>
  );
}