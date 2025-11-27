import { useState, useEffect } from 'react';
import { useCars } from '../../../contexts/CarsContext';
import { useAuth } from '../../../contexts/AuthContext';
import CarStatsHeader from './CarStatsHeader';
import CarFilterSearch from './CarFilterSearch';
import CarList from './CarList';

export default function ManagerCarsPage() {
  const { carsData, loading, setUserStation } = useCars();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModel, setFilterModel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc xe theo tìm kiếm và trạng thái
  const getFilteredCars = () => {
    let cars = carsData.allCars;
    // Lọc theo trạng thái
    if (filterStatus !== 'all') {
      cars = carsData.getCarsByStatus(parseInt(filterStatus));
    }
    // Lọc theo dòng xe
    if (filterModel !== 'all') {  
      cars = carsData.getCarsByModel(parseInt(filterModel));
    }
    //tìm kiếm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      cars = cars.filter(car => 
        car.modelName?.toLowerCase().includes(query) ||
        car.plateNumber?.toLowerCase().includes(query) ||
        car.color?.toLowerCase().includes(query) ||
        car.location?.toLowerCase().includes(query)
      );
    }
    return cars;
  };
  const filteredCars = getFilteredCars();
  // Phân trang
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);
  // Set user station khi component mount
  useEffect(() => {
    if (user?.idStation) {
      setUserStation(user.idStation);
    }
  }, [user.station]);
  // Reset trang khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCars.length]);
  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-800">Đang tải danh sách xe...</p>
      </div>
    );
  }

  return (
    <>
      <CarStatsHeader carsData={carsData} />
      <CarFilterSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
      <CarList 
        cars={currentCars}
        allCarsCount={filteredCars.length}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
      />
    </>
  );
}