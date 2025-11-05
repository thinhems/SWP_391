import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModels } from '../../../contexts/ModelsContext';
import SearchFilterSection from './SearchFilterSection';
import CarModelCarousel from './CarModelCarousel';

export default function ModelListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'daily');
  const { modelsData, loading, error, selectedLocation, setSelectedLocation } = useModels();
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
  // Xử lý chọn model cần thuê từ carousel
  const handleModelSelect = (modelId) => {
    navigate(`/booking/${modelId}?tab=${activeTab}`);
  };
  // Xử lý tìm kiếm - cập nhật location và cuộn đến carousel
  const handleSearch = (newLocation) => {
    setSelectedLocation(newLocation);
    const carouselSection = document.querySelector('.car-model-carousel');
    if (carouselSection) {
      carouselSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }
  // Hiển thị error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div>
        {/* Search & Filter Section */}
        <SearchFilterSection
          activeTab={activeTab}
          onSearch={handleSearch}
          selectedLocation={selectedLocation}
        />
        {/* Car Models Display */}
        <div className="">
          <CarModelCarousel 
            selectedLocation={selectedLocation}
            onModelSelect={handleModelSelect}
            activeTab={activeTab}
            modelsData={modelsData}
          />
        </div>
      </div>
    </div>
  );
}
