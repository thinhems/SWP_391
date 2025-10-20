import { useState } from 'react';
import CarModelCard from './CarModelCard';

export default function CarModelCarousel({ selectedLocation, onModelSelect, activeTab = 'daily', modelsData }) {
  // Lấy dữ liệu models từ context
  const models = modelsData?.allModels || [];
  const [currentIndex, setCurrentIndex] = useState(2); // lấy index model bắt đầu ở giữa (VF7)
  // Xử lý nút tiến
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === models.length - 1 ? 0 : prevIndex + 1
    );
  };
  // xử lý nút lùi
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };
  // Xử lý chọn slide trực tiếp
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  // Lấy ra 3 model để render
  const getVisibleModels = () => {
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
    <div className="relative pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative px-20">
          <div className="flex justify-center items-center gap-10 mb-12 ">
            {visibleModels.map((model, idx) => {
              const isCenter = model.position === 0;
              return (
                <CarModelCard
                  key={`${model.id}-${idx}`}
                  model={model}
                  isCenter={isCenter}
                  availableCount={model.availableCount}
                  activeTab={activeTab}
                  onModelSelect={onModelSelect}
                />
              );
            })}
          </div>
          {/* nút tiến */}
          <div className="flex justify-center gap-3 mb-4">
            {models.map((_, index) => (
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