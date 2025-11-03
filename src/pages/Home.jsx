import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModels } from '../contexts/ModelsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar, faBatteryFull, faSuitcase } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { modelsData, loading } = useModels();
  const [activeTab] = useState('daily');

  // Xử lý chọn model
  const handleModelSelect = (modelId) => {
    navigate(`/booking/${modelId}?tab=${activeTab}`);
  };

  // Carousel logic
  const models = modelsData?.allModels || [];
  const [currentIndex, setCurrentIndex] = useState(2); // bắt đầu ở giữa (VF7)

  // Show loading state if data is not ready
  if (loading) {
    return (
      <div className="homepage">
        <div className="container">
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        
        <div className="hero-content">
          
          <div className="hero-text">
            <h1 className="hero-title">
              EV Rent
              <span className="highlight"> Cho Thuê Xe Điện</span>
            </h1>
            <p className="hero-subtitle">
              Dịch vụ cho thuê xe điện hàng đầu Việt Nam. 
              Thuê xe điện VinFast linh hoạt, chi phí hợp lý, thân thiện với môi trường.
            </p>
            
            <div className="hero-buttons">
              
              {isAuthenticated ? (
                <Link to="/model-rental" className="btn btn-primary btn-large">
                Đặt xe ngay
              </Link>
              ) : (
                <div className="button-group">
                  <Link to="/register" className="btn btn-primary btn-large">
                    Đăng ký ngay
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-large">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="electric-car-illustration">
            <img src="https://greenfuture.tech/_next/image?url=%2Fimages%2Frents%2Fvf9_mb.webp&w=1080&q=75" alt="Xe điện minh họa" className="w-full max-w-lg object-contain drop-shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Car Models Carousel */}
      <section className="car-model-carousel">
        <div className="container">
          <div className="section-header">
            <h2>Dòng xe điện VinFast</h2>
            <p>Khám phá bộ sưu tập xe điện VinFast hiện đại, thân thiện với môi trường</p>
          </div>
          
          <div className="relative pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              {/* Carousel Container */}
              <div className="relative px-20">
                <div className="flex justify-center items-center gap-10 mb-12">
                  {visibleModels.map((model, idx) => {
                    const isCenter = model.position === 0;
                    // Safe image and specification access to avoid runtime errors when API returns incomplete items
                    const imgSrc = (model.images && model.images.length > 0) ? model.images[0] : 'https://via.placeholder.com/600x400?text=No+Image';
                    const specs = model.specifications || {};
                    return (
                      <div
                        key={`${model.id}-${idx}`}
                        className={`
                          relative bg-white/70 backdrop-blur-sm rounded-3xl cursor-pointer transition-all duration-300 shadow-lg border hover:bg-white/90
                          ${isCenter 
                            ? 'scale-110 z-10 shadow-2xl ring-2 ring-green-400/20 border-green-200/60 p-8 shadow-green-100/50 bg-white/85 hover:scale-115 hover:ring-green-400/40 hover:shadow-3xl' 
                            : 'scale-100 opacity-95 hover:opacity-100 hover:scale-105 hover:shadow-xl border-gray-200/60 hover:border-green-200/50 p-6 hover:shadow-green-50/40'
                          }
                        `}
                        onClick={() => handleModelSelect(model.id)}
                        style={{
                          width: isCenter ? '520px' : '460px',
                          height: isCenter ? '480px' : '430px'
                        }}
                      >
                        {/* Tình trạng xe */}
                        <div className="absolute top-6 right-2">
                          {model.availableCount > 0 ? (
                            <span className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg ${isCenter ? 'px-4 py-2 text-base' : 'px-3 py-1.5 text-sm'}`}>
                              Còn xe
                            </span>
                          ) : (
                            <span className={`bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-lg ${isCenter ? 'px-4 py-2 text-base' : 'px-3 py-1.5 text-sm'}`}>
                              Hết xe
                            </span>
                          )}
                        </div>
                        
                        {/* Model Name & Price */}
                        <div className="text-center mb-6">
                          <h3 className={`text-gray-800 font-bold mb-3 ${isCenter ? 'text-3xl' : 'text-2xl'}`}>
                            {model.name}
                          </h3>
                          <div className={`text-emerald-600 font-bold ${isCenter ? 'text-2xl' : 'text-xl'}`}>
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
                        
                        {/* Thông số model */}
                        <div className={`mb-6 ${isCenter ? 'space-y-4' : 'space-y-3'}`}>
                          <div className={`grid grid-cols-2 gap-4 text-gray-600 ${isCenter ? 'text-base' : 'text-sm'}`}>
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full bg-emerald-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
                                <FontAwesomeIcon icon={faCar} />
                              </div>
                              <span className="font-medium text-slate-700">{model.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full bg-teal-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
                                <FontAwesomeIcon icon={faBatteryFull} />
                              </div>
                              <span className="font-medium text-slate-700">{specs.range ?? 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full bg-cyan-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
                                <FontAwesomeIcon icon={faUser} />
                              </div>
                              <span className="font-medium text-slate-700">{specs.seats ?? 'N/A'} chỗ</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full bg-blue-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
                                <FontAwesomeIcon icon={faSuitcase} />
                              </div>
                              <span className="font-medium text-slate-700">Cốp {specs.trunkCapacity ?? 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pagination dots */}
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
                
                {/* Navigation buttons */}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Tại sao chọn EV Rent?</h2>
            <p>Dịch vụ cho thuê xe điện hàng đầu với những ưu điểm vượt trội</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Xe điện đời mới</h3>
              <p>Đội xe VinFast mới nhất, công nghệ tiên tiến, hiệu suất cao</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Thân thiện môi trường</h3>
              <p>Giảm khí thải, bảo vệ môi trường, góp phần phát triển bền vững</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ chuyên nghiệp, hỗ trợ toàn diện, chăm sóc tận tình</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Đặt xe dễ dàng</h3>
              <p>Ứng dụng thông minh, thủ tục đơn giản, thanh toán nhanh chóng</p>
            </div>
            
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng trải nghiệm xe điện?</h2>
            <p>Tham gia cùng hàng nghìn khách hàng đã tin tưởng EV Rent</p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Link to="/model-rental" className="btn btn-white btn-large">
                  Đặt xe ngay
                </Link>
              ) : (
                <Link to="/register" className="btn btn-white btn-large">
                  Đăng ký ngay
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
