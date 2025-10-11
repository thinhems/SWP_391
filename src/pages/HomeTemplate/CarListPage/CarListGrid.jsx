import React, { useState } from 'react';
import CarCard from './CarCard';

export default function CarListGrid({ cars, onSelectCar, activeTab }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const carsPerPage = 9; // Số xe hiển thị mỗi trang

  // Sắp xếp và lọc xe dựa trên tùy chọn đã chọn
  const sortedCars = (() => {
    let filtered = [...cars];
    // Nếu chọn "available", chỉ hiển thị xe còn trống
    if (sortBy === 'available') {
      filtered = filtered.filter(car => car.availability === 'available');
    }
    // Sắp xếp theo giá
    const currentPrice = activeTab || 'daily';
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price[currentPrice] - b.price[currentPrice]);
      case 'price-high':
        return filtered.sort((a, b) => b.price[currentPrice] - a.price[currentPrice]);
      default:
        return filtered;
    }
  })();

  // Logic phân trang
  const totalPages = Math.ceil(sortedCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = sortedCars.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render các nút phân trang
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    // Nút trang trước
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-all duration-300"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ← Trước
        </button>
      );
    }
    // Các số trang
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-green-600 text-white border-2 border-green-600'
              : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }
    // Nút trang sau
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-all duration-300"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Sau →
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="max-w-6xl mx-auto px-5">
      {/* Header kết quả */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-100">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Danh sách xe cho thuê
          </h2>
          <p className="text-gray-600 text-lg">
            Tìm thấy {sortedCars.length} xe phù hợp
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700 whitespace-nowrap">
            Sắp xếp theo:
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white text-gray-700 font-medium cursor-pointer focus:outline-none focus:border-green-500 transition-colors duration-300"
          >
            <option value="default">Mặc định</option>
            <option value="available">Xe trống</option>
            <option value="price-low">Giá thấp đến cao</option>
            <option value="price-high">Giá cao đến thấp</option>
          </select>
        </div>
      </div>
      {/* Grid hiển thị xe */}
      {currentCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentCars.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              onSelectCar={onSelectCar}
              activeTab={activeTab}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl my-10">
          <div className="text-6xl mb-5 opacity-60">🚗</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Không tìm thấy xe phù hợp
          </h3>
          <p className="text-gray-600 text-lg">
            Hãy thử thay đổi bộ lọc tìm kiếm để xem thêm kết quả
          </p>
        </div>
      )}
      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-8 border-t-2 border-gray-100">
          <div className="text-gray-600 font-medium">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, sortedCars.length)} trong {sortedCars.length} xe
          </div>
          <div className="flex gap-2">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
    </div>
  );
};