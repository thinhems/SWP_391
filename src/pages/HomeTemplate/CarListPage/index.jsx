import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchFilterSection from './SearchFilterSection';
import CarListGrid from './CarListGrid';
import { mockListCars } from '../../../data/mockListCars';

export default function CarListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // State cho tìm kiếm và filter
  const [selectedLocation, setSelectedLocation] = useState('Quận 1');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [activeTab, setActiveTab] = useState('daily');
  const [filteredCars, setFilteredCars] = useState(mockListCars);
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi tab thuê và cập nhật URL
  const handleRentalPeriodChange = (periodId) => {
    setActiveTab(periodId);
    setSearchParams({ tab: periodId });
  };

  // Khởi tạo ngày mặc định (luôn là 8h sáng theo múi giờ UTC+7)
  useEffect(() => {
    // Tạo ngày theo múi giờ Việt Nam (UTC+7)
    const now = new Date();
    
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0); // Đặt giờ là 8:00 sáng
    
    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);
    dayAfterTomorrow.setHours(8, 0, 0, 0); // Đặt giờ là 8:00 sáng

    // Format theo múi giờ địa phương để hiển thị đúng
    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setPickupDate(formatDateTime(tomorrow));
    setReturnDate(formatDateTime(dayAfterTomorrow));
  }, []);

  // Lấy tab từ URL khi component mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['daily', 'weekly', 'monthly'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Lọc xe dựa trên tiêu chí đã chọn - mặc định lọc theo Quận 1
  useEffect(() => {
    let filtered = [...mockListCars];
    // Lọc theo địa điểm mặc định (Quận 1)
    filtered = filtered.filter(car => car.location === selectedLocation);
    setFilteredCars(filtered);
  }, []);

  // đảm bảo luôn có tab trong URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (!tabFromUrl) {
      setSearchParams({ tab: 'daily' }, { replace: true });
    }
  }, []);

  const handleSearch = () => {
    setLoading(true);
    
    // Mô phỏng API call với logic lọc
    setTimeout(() => {
      // Kiểm tra tính hợp lệ của ngày
      if (pickupDate && returnDate) {
        const pickup = new Date(pickupDate);
        const returnCar = new Date(returnDate);
        if (pickup >= returnCar) {
          alert('Ngày trả xe phải sau ngày nhận xe');
          setLoading(false);
          return;
        }
      }

      // Thực hiện lọc xe khi nhấn tìm kiếm
      let filtered = [...mockListCars];
      
      // Lọc theo địa điểm
      if (selectedLocation !== 'Tất cả') {
        filtered = filtered.filter(car => car.location === selectedLocation);
      }
      
      setFilteredCars(filtered);

      // Cuộn đến kết quả
      const resultsSection = document.querySelector('.car-list-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleSelectCar = (car) => {
    // Tính toán chi tiết thuê xe
    const pickup = new Date(pickupDate);
    const returnCar = new Date(returnDate);
    let days = Math.ceil((returnCar - pickup) / (1000 * 60 * 60 * 24));
    
    // Điều chỉnh tính toán dựa trên loại thuê
    let period = 1;
    let periodUnit = 'ngày';
    
    switch(activeTab) {
      case 'weekly':
        period = Math.ceil(days / 7);
        periodUnit = 'tuần';
        break;
      case 'monthly':
        period = Math.ceil(days / 30);
        periodUnit = 'tháng';
        break;
      default:
        period = days;
        periodUnit = 'ngày';
    }
    
    const rentalDetails = {
      car,
      pickupDate,
      returnDate,
      location: selectedLocation,
      rentalPeriod: activeTab,
      period,
      periodUnit,
      pricePerPeriod: car.price[activeTab],
      totalCost: car.price[activeTab] * period,
      deposit: car.price[activeTab] * 2 // Tiền cọc bằng 2 kỳ thuê
    };
    
    // Chuyển đến trang booking (cần tạo trang này)
    navigate('/booking', { state: { rentalDetails } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Phần tìm kiếm và filter */}
      <SearchFilterSection
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        activeTab={activeTab}
        onRentalPeriodChange={handleRentalPeriodChange}
        onSearch={handleSearch}
      />
      {/* Overlay loading đẹp hơn */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl border border-green-100 max-w-sm mx-4">
            {/* Loading spinner với hiệu ứng gradient */}
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-3 border-transparent border-t-green-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
            
            {/* Loading text với hiệu ứng */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800">Đang tìm kiếm xe</h3>
              <p className="text-gray-600">Chúng tôi đang tìm kiếm những chiếc xe phù hợp nhất cho bạn...</p>
              
              {/* Progress dots */}
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Danh sách xe */}
      <div className="car-list-results">
        <CarListGrid 
          cars={filteredCars} 
          onSelectCar={handleSelectCar}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};
