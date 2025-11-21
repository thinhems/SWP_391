import { useState, useEffect } from 'react';
import { useCars } from '../../../contexts/CarsContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function ManagerCarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'available');
  const { carsData, loading, setUserStation } = useCars();
  const { user } = useAuth();
  // Cập nhật station của user vào CarsContext khi component mount
  useEffect(() => {
    setUserStation(user.station);
  }, [user.station]);

  // xử lý đồng bộ tab với URL 
  useEffect(() => {
    if (tabFromUrl) {
      if (tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
      }
    } else {
      const tabToSet = activeTab || 'available';
      setSearchParams({ tab: tabToSet }, { replace: true });
    }
  }, [tabFromUrl]);
  // Phân loại xe theo trạng thái (đã được lọc theo station trong CarsContext)
  const organizedCars = {
    available: carsData.getCarsByStatus(0),
    pending_approval: carsData.getCarsByStatus(1),
    pending_contract: carsData.getCarsByStatus(2),
    pending_handover: carsData.getCarsByStatus(3),
    rented: carsData.getCarsByStatus(4)
  };
  
  // Priority cho việc sắp xếp ưu tiên render xe chờ phê duyệt trước
  const priority = {
    pending_approval: 1,
    pending_contract: 2
  };

  // Lọc và sắp xếp xe theo tab
  const filteredCars = activeTab === 'pending_approval'
    ? [...organizedCars.pending_approval, ...organizedCars.pending_contract]
        .sort((a, b) => (priority[a.status] || 99) - (priority[b.status] || 99))
    : organizedCars[activeTab];


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải dữ liệu xe</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý xe</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin và trạng thái các xe trong hệ thống</p>
        </div>
      </div>
      
      <StatsSection cars={organizedCars} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={organizedCars} />
      <ListCarsSection cars={filteredCars} activeTab={activeTab} />
    </div>
  );
}