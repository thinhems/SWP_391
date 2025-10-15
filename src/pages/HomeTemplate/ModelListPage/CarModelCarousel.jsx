import { useState } from 'react';
import { mockCars } from '../../../data/mockCars';
import { mockListModels } from '../../../data/mockListModels';
import CarModelCard from './CarModelCard';

export default function CarModelCarousel({ selectedLocation, onModelSelect, activeTab = 'daily' }) {
  const [currentIndex, setCurrentIndex] = useState(2); // Bắt đầu từ giữa (VF7)
  // console.log('currentIndex:', currentIndex);
  // Tính số xe available cho mỗi model tại station được chọn
  const getAvailableCount = (modelId) => {
    const modelNumber = modelId.replace('VF', 'VF ');
    const modelName = `VinFast ${modelNumber}`;
    return mockCars.filter(car => 
      car.model === modelName && 
      car.status === 'available' && 
      car.station === selectedLocation
    ).length;
  };

  // Xử lý nút tiến
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockListModels.length - 1 ? 0 : prevIndex + 1
    );
  };
  // xử lý nút lùi
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockListModels.length - 1 : prevIndex - 1
    );
  };
  // Xử lý chọn slide trực tiếp
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Lấy 3 model để hiển thị (trước, hiện tại, sau)
  const getVisibleModels = () => {
    const models = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = mockListModels.length + index;
      if (index >= mockListModels.length) index = index - mockListModels.length;
      models.push({ ...mockListModels[index], position: i });
    }
    return models;
  };

  const visibleModels = getVisibleModels();
  // console.log('Visible Models:', visibleModels);
  return (
    <div className="relative pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative px-20">
          <div className="flex justify-center items-center gap-10 mb-12 ">
            {visibleModels.map((model, idx) => {
              const availableCount = getAvailableCount(model.id);
              const isCenter = model.position === 0;
              return (
                <CarModelCard
                  key={`${model.id}-${idx}`}
                  model={model}
                  isCenter={isCenter}
                  availableCount={availableCount}
                  activeTab={activeTab}
                  onModelSelect={onModelSelect}
                />
              );
            })}
          </div>
          {/* nút tiến */}
          <div className="flex justify-center gap-3 mb-4">
            {mockListModels.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === currentIndex 
                    ? 'w-8 h-3 bg-gradient-to-r from-green-500 to-emerald-500 scale-125 shadow-lg' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-green-300'
                  }
                `}
              />
            ))}
          </div>
          {/* nút lùi */}
          <button
            onClick={goToPrevious}
            className="cursor-pointer absolute -left-11 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-green-100 z-20 group"
          >
            <svg className="w-6 h-6 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="cursor-pointer absolute -right-11 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-green-100 z-20 group"
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