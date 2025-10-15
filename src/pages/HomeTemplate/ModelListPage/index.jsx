import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchFilterSection from './SearchFilterSection';
import CarModelCarousel from './CarModelCarousel';

export default function ModelListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [selectedLocation, setSelectedLocation] = useState('Quận 1'); // Khu vực đã được tìm kiếm mặc định là quận 1
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'daily');
  // lưu station vào localStorage mặc định là Quận 1
  localStorage.setItem('station', selectedLocation);
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
    setSelectedLocation(newLocation); // Cập nhật location để lọc xe
    const carouselSection = document.querySelector('.car-model-carousel');
    // cập nhật location vào URL và localStorage
    localStorage.setItem('station', newLocation);
    if (carouselSection) {
      carouselSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div>
        {/* Search & Filter Section */}
        <SearchFilterSection
          activeTab={activeTab}
          onSearch={handleSearch}
        />
        {/* Car Models Display */}
        <div className="car-model-carousel">
          <CarModelCarousel 
            selectedLocation={selectedLocation}
            onModelSelect={handleModelSelect}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
}
