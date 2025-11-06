import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useModels } from '../../../contexts/ModelsContext';
import CarOverviewSection from './CarOverviewSection';
import CarDetailsSection from './CarDetailsSection';
import LocationFormSection from './LocationFormSection';
import BookingPopup from './BookingPopup';

export default function BookingPage() {
  const { modelId } = useParams();
  const { modelsData, loading, error, selectedLocation, setSelectedLocation } = useModels();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'daily');
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  // Get model from context
  const carModel = modelsData?.getModelById?.(modelId);
  const availableCount = carModel ? carModel.availableCount : 0;
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

  // xử lý thay đổi trạm thuê xe
  const handleStationChange = (newStation) => {
    setSelectedLocation(newStation); // Cập nhật trong context
    localStorage.setItem('station', newStation); // Lưu vào localStorage
  };
  // Xử lý click nút đặt xe
  const handleBookingClick = () => {
    setShowBookingPopup(true);
  };
  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Hiển thị error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị khi không tìm thấy model
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Header */}
        <div className="overflow-hidden mb-8">
          <CarOverviewSection 
            carModel={carModel}
            activeTab={activeTab}
            selectedLocation={selectedLocation}
            availableCount={availableCount}
            handleBookingClick={handleBookingClick} 
          />
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CarDetailsSection 
              carModel={carModel} 
              activeTab={activeTab}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <LocationFormSection
                carModel={carModel}
                selectedLocation={selectedLocation}
                onStationChange={handleStationChange}
                availableCount={availableCount}
                activeTab={activeTab}
              />
            </div>
          </div>
        </div>
        {/* Booking Popup */}
        <BookingPopup 
          isOpen={showBookingPopup}
          onClose={() => setShowBookingPopup(false)}
          carModel={carModel}
          selectedLocation={selectedLocation}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};