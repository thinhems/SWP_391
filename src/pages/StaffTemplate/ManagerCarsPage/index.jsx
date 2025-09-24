import { useState, useEffect } from 'react';
import { mockCars } from './mockCars';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function ManagerCarsPage()  {
  const [activeTab, setActiveTab] = useState('available'); //set state tab mặc định là 'available'
  const [cars, setCars] = useState({ available: [], booked: [], rented: [] }); //set state danh sách xe
  const [reload, setTrigger] = useState(0); // set state để reload
  const [loading, setLoading] = useState(false); // set state loading

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 500);
  }, [reload]);

  const handleRefresh = () => {
    setTrigger((prev) => prev + 1);
  };

  const handleAddCar = () => {
    alert('Thêm xe mới (demo)');
  };

  const handleHandover = (car) => {
    setSelectedCar(car);
    setShowHandoverModal(true);
  };

  return (
    <div className="space-y-6">
      <StatsSection cars={cars} onRefresh={handleRefresh} onAddCar={handleAddCar} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={cars} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
          <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <ListCarsSection cars={cars[activeTab]} activeTab={activeTab} onHandover={handleHandover} />
      )}
    </div>
  );
};

