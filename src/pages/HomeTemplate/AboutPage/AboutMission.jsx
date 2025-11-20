import React from 'react';

export default function AboutMission() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block">
              <span className="font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded-full" style={{ color: '#188f49', backgroundColor: '#e8f5e9' }}>
                Sứ Mệnh Của Chúng Tôi
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-6">
              Định Hình Tương Lai <br />
              <span style={{ color: '#188f49' }}>Giao Thông Xanh</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Chúng tôi cam kết mang đến giải pháp di chuyển thông minh, bền vững và tiện lợi 
              cho cộng đồng. Với đội xe điện hiện đại được bảo dưỡng định kỳ, chúng tôi không 
              chỉ giúp bạn tiết kiệm chi phí mà còn góp phần bảo vệ môi trường.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mỗi chuyến đi của bạn là một bước nhỏ hướng tới tương lai xanh hơn, sạch hơn 
              cho thế hệ mai sau.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#188f49' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">100% xe điện thân thiện môi trường</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: '#e8f5e9' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#188f49' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Dịch vụ 24/7 với đội ngũ chuyên nghiệp</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: '#e8f5e9' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#188f49' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Công nghệ đặt xe thông minh, tiện lợi</p>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl h-48 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#188f49' }}>
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="font-bold text-lg">Xe Điện</p>
                  <p className="text-sm text-green-100">100% Xanh</p>
                </div>
              </div>
              <div className="bg-white border-2 border-green-100 rounded-2xl h-56 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-center text-gray-800">
                  <svg className="w-16 h-16 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="font-bold text-lg">Bảo Hiểm</p>
                  <p className="text-sm text-gray-600">Toàn Diện</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white border-2 border-green-100 rounded-2xl h-56 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-center text-gray-800">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#188f49' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold text-lg">Dịch Vụ</p>
                  <p className="text-sm text-gray-600">24/7</p>
                </div>
              </div>
              <div className="rounded-2xl h-48 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#188f49' }}>
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <p className="font-bold text-lg">Công Bằng</p>
                  <p className="text-sm text-green-100">Giá Cả Hợp Lý</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
