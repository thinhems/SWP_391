import { useState } from 'react';
import { useCars } from '../../../contexts/CarsContext';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function ManagerCarsPage() {
  const [activeTab, setActiveTab] = useState('available');
  const { carsData, loading, refreshCars } = useCars();

  // Phân loại xe theo trạng thái
  const organizedCars = {
    available: carsData.getCarsByStatus('available'),
    pending_approval: carsData.getCarsByStatus('pending_approval'),
    pending_contract: carsData.getCarsByStatus('pending_contract'),
    booked: carsData.getCarsByStatus('booked'),
    rented: carsData.getCarsByStatus('rented')
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

  const handleRefresh = () => {
    refreshCars();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
        <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsSection cars={organizedCars} onRefresh={handleRefresh} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={organizedCars} />
      <ListCarsSection cars={filteredCars} activeTab={activeTab} />
    </div>
  );
}