import { useState, useEffect } from 'react';
import { mockCars } from './mockCars';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function ManagerCarsPage()  {
  const [activeTab, setActiveTab] = useState('available');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCars = cars.filter(car => car.status === activeTab);

  const carsData = {
    available: cars.filter(car => car.status === 'available'),
    booked: cars.filter(car => car.status === 'booked'),
    rented: cars.filter(car => car.status === 'rented')
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 500);
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
      <StatsSection cars={carsData} onRefresh={handleRefresh} onAddCar={handleAddCar} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={carsData} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
          <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <ListCarsSection cars={filteredCars} activeTab={activeTab} onHandover={handleHandover} />
      )}
    </div>
  );
};