
import { useState, useEffect } from 'react';
import { mockCars } from '../../../data/mockCars';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function ManagerCarsPage() {
  const [activeTab, setActiveTab] = useState('available'); // set sate mặc định là 'available'
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 500);
  }, []);

  // ưu tiên hiển thị xe chờ duyệt trước xe chờ ký hợp đồng
  const priority = {
    pending_approval: 1,
    pending_contract: 2
  };

  // lọc xe theo tab hiện tại
  const filteredCars = cars.filter(car =>
    activeTab === 'pending_approval'
      ? car.status === 'pending_approval' || car.status === 'pending_contract'
      : car.status === activeTab
  ).sort((a, b) => (priority[a.status] || 99) - (priority[b.status] || 99));
  
  // phân loại xe theo trạng thái
  const carsData = {
    available: cars.filter(car => car.status === 'available'),
    pending_approval: cars.filter(car => car.status === 'pending_approval'),
    pending_contract: cars.filter(car => car.status === 'pending_contract'),
    booked: cars.filter(car => car.status === 'booked'),
    rented: cars.filter(car => car.status === 'rented')
  };
  // làm mới lại dữ liệu
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <StatsSection cars={carsData} onRefresh={handleRefresh} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={carsData} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
          <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <ListCarsSection cars={filteredCars} activeTab={activeTab} />
      )}
    </div>
  );
};