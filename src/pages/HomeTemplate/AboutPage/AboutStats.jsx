import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faLocationDot, faSmile } from '@fortawesome/free-solid-svg-icons';

export default function AboutStats() {
  const stats = [
    {
      number: '1000+',
      label: 'Khách Hàng Tin Tưởng',
      icon: faUsers
    },
    {
      number: '150+',
      label: 'Xe Điện Hiện Đại',
      icon: faCar
    },
    {
      number: '6+',
      label: 'Trạm Cho Thuê',
      icon: faLocationDot
    },
    {
      number: '99%',
      label: 'Độ Hài Lòng',
      icon: faSmile
    }
  ];

  return (
    <div className="pt-32 pb-20 mb-0 relative overflow-hidden" style={{ backgroundColor: '#188f49' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white">
                  <FontAwesomeIcon icon={stat.icon} className="text-green-600 text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 text-white">
                {stat.number}
              </div>
              <div className="text-white/80 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Sẵn Sàng Trải Nghiệm Chưa?
          </h3>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Hãy bắt đầu hành trình xanh của bạn ngay hôm nay với dịch vụ cho thuê xe điện hàng đầu
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/model-rental"
              className="bg-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer inline-block"
              style={{ color: '#188f49' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f5e9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Đặt Xe Ngay
            </a>
          </div>
        </div>
      </div>

      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f0fdf4"/>
        </svg>
      </div>
    </div>
  );
}
