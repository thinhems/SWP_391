import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModels } from '../../../contexts/ModelsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar, faBatteryFull, faSuitcase } from "@fortawesome/free-solid-svg-icons";

export default function HomeModels() {
  const navigate = useNavigate();
  const { modelsData, loading } = useModels();
  const [activeTab] = useState('daily');
  const [currentIndex, setCurrentIndex] = useState(2);

  const models = modelsData?.allModels || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải dữ liệu model</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi...</p>
        </div>
      </div>
    );
  }

  const handleModelSelect = (modelId) => {
    navigate(`/model-rental?tab=${activeTab}&selected=${modelId}`);
  };

  const goToNext = () => {
    if (models.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === models.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    if (models.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleModels = () => {
    if (!models || models.length === 0) return [];
    const visibleModels = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = models.length + index;
      if (index >= models.length) index = index - models.length;
      visibleModels.push({ ...models[index], position: i });
    }
    return visibleModels;
  };

  const visibleModels = getVisibleModels();

  return (
    <div className="pb-5 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dòng Xe <span style={{ color: '#188f49' }}>VinFast</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập xe điện VinFast hiện đại, thân thiện với môi trường
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-20">
          <div className="flex justify-center items-center gap-10 mb-12">
            {visibleModels.map((model, idx) => {
              const isCenter = model.position === 0;
              const imgSrc = (model.images && model.images.length > 0) ? model.images[0] : 'https://via.placeholder.com/600x400?text=No+Image';
              const specs = model.specifications || {};
              
              return (
                <div
                  key={`${model.id}-${idx}`}
                  className={`
                    relative bg-white rounded-3xl cursor-pointer transition-all duration-300 shadow-lg border
                    ${isCenter 
                      ? 'scale-110 z-10 shadow-2xl p-8 hover:scale-115' 
                      : 'scale-100 opacity-90 hover:opacity-100 hover:scale-105 p-6'
                    }
                  `}
                  onClick={() => handleModelSelect(model.id)}
                  style={{
                    width: isCenter ? '520px' : '460px',
                    height: isCenter ? '480px' : '430px',
                    borderColor: isCenter ? '#188f49' : '#e5e7eb'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#188f49'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = isCenter ? '#188f49' : '#e5e7eb'}
                >
                  {/* Model Name & Price */}
                  <div className="text-center mb-6">
                    <h3 className={`text-gray-800 font-bold mb-3 ${isCenter ? 'text-3xl' : 'text-2xl'}`}>
                      {model.name}
                    </h3>
                    <div className={`font-bold ${isCenter ? 'text-2xl' : 'text-xl'}`} style={{ color: '#188f49' }}>
                      {model.price && model.price[activeTab] ? model.price[activeTab].toLocaleString('vi-VN') : 'N/A'}₫ 
                      <span className="text-gray-500 font-normal text-base ml-1">
                        /{activeTab === 'daily' ? 'ngày' : activeTab === 'weekly' ? 'tuần' : 'tháng'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Car Image */}
                  <div 
                    className="flex justify-center items-center mb-6" 
                    style={{ height: isCenter ? '200px' : '170px' }}
                  >
                    <img 
                      src={imgSrc} 
                      alt={model.name}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Specifications */}
                  <div className={`${isCenter ? 'space-y-4' : 'space-y-3'}`}>
                    <div className={`grid grid-cols-2 gap-4 text-gray-600 ${isCenter ? 'text-base' : 'text-sm'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`} style={{ backgroundColor: '#e8f5e9' }}>
                          <FontAwesomeIcon icon={faCar} style={{ color: '#188f49' }} />
                        </div>
                        <span className="font-medium text-slate-700">{model.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`} style={{ backgroundColor: '#e8f5e9' }}>
                          <FontAwesomeIcon icon={faBatteryFull} style={{ color: '#188f49' }} />
                        </div>
                        <span className="font-medium text-slate-700">{specs.range ?? 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`} style={{ backgroundColor: '#e8f5e9' }}>
                          <FontAwesomeIcon icon={faUser} style={{ color: '#188f49' }} />
                        </div>
                        <span className="font-medium text-slate-700">{specs.seats ?? 'N/A'} chỗ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`} style={{ backgroundColor: '#e8f5e9' }}>
                          <FontAwesomeIcon icon={faSuitcase} style={{ color: '#188f49' }} />
                        </div>
                        <span className="font-medium text-slate-700">Cốp {specs.trunkCapacity ?? 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mb-4">
            {models.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === currentIndex 
                    ? 'w-8 h-3 scale-125 shadow-lg' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-green-300'
                  }
                `}
                style={{ backgroundColor: index === currentIndex ? '#188f49' : undefined }}
              />
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute -left-11 top-1/2 transform -translate-y-1/2 bg-white hover:bg-green-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border z-20 group"
            style={{ borderColor: '#e8f5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#188f49'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e8f5e9'}
          >
            <svg className="w-6 h-6 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-11 top-1/2 transform -translate-y-1/2 bg-white hover:bg-green-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border z-20 group"
            style={{ borderColor: '#e8f5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#188f49'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e8f5e9'}
          >
            <svg className="w-6 h-6 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
