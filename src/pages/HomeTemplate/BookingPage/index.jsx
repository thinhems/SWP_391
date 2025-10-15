import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { mockListModels } from '../../../data/mockListModels';
import { mockCars } from '../../../data/mockCars';
import CarOverview from './CarOverview';
import CarDetailsSection from './CarDetailsSection';
import BookingForm from './BookingForm';
import BookingPopup from './BookingPopup';

export default function BookingPage() {
  const { modelId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'daily');
  const [selectedStation, setSelectedStation] = useState(localStorage.getItem('station') || '');
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  // xử lý đồng bộ tab với URL đảm bảo luôn có tab trong URL
  useEffect(() => {
      if (tabFromUrl) {
        if (tabFromUrl !== activeTab) {
          setActiveTab(tabFromUrl);
        }
      } else {
        const tabToSet = activeTab || 'daily';
        setSearchParams({ tab: tabToSet }, { replace: true });
      }
    }, [tabFromUrl]);
  // Tìm model dựa trên modelId
  const carModel = mockListModels.find(model => model.id === modelId);
  // xử lý thay đổi trạm thuê xe
  const handleStationChange = (newStation) => {
    setSelectedStation(newStation);
    if (newStation) {
      localStorage.setItem('station', newStation);
    }
  };
  // Xử lý click nút đặt xe
  const handleBookingClick = () => {
    setShowBookingPopup(true);
  };
  // Tính toán số lượng xe có sẵn tại địa điểm đã chọn
  const getAvailableCount = () => {
    if (!selectedStation) return 0;
    
    const modelNumber = carModel.id.replace('VF', 'VF ');
    const modelName = `VinFast ${modelNumber}`;
    
    return mockCars.filter(car => 
      car.model === modelName && 
      car.status === 'available' && 
      car.station === selectedStation
    ).length;
  };
  if (!carModel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy xe</h1>
          <p className="text-gray-600">Xe bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  } 
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header*/}
        <div className="overflow-hidden mb-8">
          <CarOverview 
            carModel={carModel}
            activeTab={activeTab}
            selectedStation={selectedStation}
            getAvailableCount={getAvailableCount}
            handleBookingClick={handleBookingClick} 
          />
        </div>
        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CarDetailsSection carModel={carModel} activeTab={activeTab}/>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm 
                carModel={carModel}
                selectedStation={selectedStation}
                onStationChange={handleStationChange}
                getAvailableCount={getAvailableCount}
              />
            </div>
          </div>
          {/* Booking Popup */}
          <BookingPopup 
            isOpen={showBookingPopup}
            onClose={() => setShowBookingPopup(false)}
            carModel={carModel}
            selectedStation={selectedStation}
          />
        </div>
      </div>
    </div>
  );
};