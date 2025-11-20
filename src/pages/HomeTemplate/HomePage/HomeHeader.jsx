import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export default function HomeHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#188f49' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="inline-block">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                🌱 Thân Thiện Môi Trường
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              EV Rent
              <br />
              <span className="text-white/90">Cho Thuê Xe Điện</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Dịch vụ cho thuê xe điện hàng đầu Việt Nam. 
              Thuê xe điện VinFast linh hoạt, chi phí hợp lý, thân thiện với môi trường.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {isAuthenticated ? (
                <Link 
                  to="/model-rental" 
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{ color: '#188f49' }}
                >
                  Đặt Xe Ngay
                </Link>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ color: '#188f49' }}
                  >
                    Đăng Ký Ngay
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Đăng Nhập
                  </Link>
                </>
              )}
            </div>

          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://vinfastautodongnai.com/wp-content/uploads/2023/10/img-CE1H.png" 
                alt="Xe điện VinFast" 
                className="w-full max-w-2xl mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 -mb-1">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#ffffffff"/>
        </svg>
      </div>
    </div>
  );
}
