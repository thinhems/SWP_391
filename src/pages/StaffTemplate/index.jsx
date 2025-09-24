import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StaffSidebar from "../../components/StaffSidebar";
import HeaderStaff from "../../components/HeaderStaff";
import { useAuth } from "../../contexts/AuthContext";

export default function StaffTemplate() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "staff") {
    return <Navigate to="/" replace />;
  }
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
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
  );
};


