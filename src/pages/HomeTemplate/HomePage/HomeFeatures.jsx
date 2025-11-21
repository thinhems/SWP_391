import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faLeaf, faWrench, faMobileScreenButton, faShieldHeart, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function HomeFeatures() {
  const features = [
    {
      icon: faBolt,
      title: 'Xe Điện Đời Mới',
      description: 'Đội xe VinFast mới nhất, công nghệ tiên tiến, hiệu suất cao',
      color: '#188f49'
    },
    {
      icon: faLeaf,
      title: 'Thân Thiện Môi Trường',
      description: 'Giảm khí thải, bảo vệ môi trường, góp phần phát triển bền vững',
      color: '#188f49'
    },
    {
      icon: faWrench,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ chuyên nghiệp, hỗ trợ toàn diện, chăm sóc tận tình',
      color: '#188f49'
    },
    {
      icon: faMobileScreenButton,
      title: 'Đặt Xe Dễ Dàng',
      description: 'Ứng dụng thông minh, thủ tục đơn giản, thanh toán nhanh chóng',
      color: '#188f49'
    },
    {
      icon: faShieldHeart,
      title: 'Bảo Hiểm Toàn Diện',
      description: 'Xe được bảo hiểm đầy đủ, an tâm mọi hành trình',
      color: '#188f49'
    },
    {
      icon: faDollarSign,
      title: 'Giá Cả Hợp Lý',
      description: 'Mức giá cạnh tranh, nhiều ưu đãi, tiết kiệm chi phí',
      color: '#188f49'
    }
  ];

  return (
    <div className="py-5 bg-gradient-to-b from-green-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn <span style={{ color: '#188f49' }}>EV Rent?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dịch vụ cho thuê xe điện hàng đầu với những ưu điểm vượt trội
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#188f49';
                e.currentTarget.style.backgroundColor = '#f8fdf9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#f3f4f6';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: '#e8f5e9' }}
                >
                  <FontAwesomeIcon 
                    icon={feature.icon} 
                    className="text-3xl" 
                    style={{ color: feature.color }}
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2" style={{ borderColor: '#188f49' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Trải Nghiệm Đẳng Cấp Cùng EV Rent
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Hơn 1000+ khách hàng đã tin tưởng và lựa chọn dịch vụ của chúng tôi
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#188f49' }}>98%</div>
                <div className="text-sm text-gray-600 mt-1">Hài Lòng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#188f49' }}>5.0</div>
                <div className="text-sm text-gray-600 mt-1">Đánh Giá</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#188f49' }}>1000+</div>
                <div className="text-sm text-gray-600 mt-1">Chuyến Đi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
