import React from 'react';

export default function AboutFeatures() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Đặt Xe Thông Minh',
      description: 'Ứng dụng đặt xe hiện đại, dễ sử dụng với giao diện thân thiện. Chỉ vài thao tác là bạn đã có xe.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Xe Chất Lượng Cao',
      description: 'Đội xe điện được bảo dưỡng định kỳ, kiểm tra kỹ lưỡng trước mỗi chuyến đi để đảm bảo an toàn.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Giá Cả Hợp Lý',
      description: 'Mức giá cạnh tranh với nhiều gói ưu đãi hấp dẫn. Tiết kiệm hơn so với xe xăng truyền thống.',
      color: 'from-yellow-400 to-orange-600'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi trong suốt hành trình.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Thân Thiện Môi Trường',
      description: 'Góp phần giảm khí thải, bảo vệ môi trường. Mỗi km bạn đi là một đóng góp cho trái đất xanh.',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'An Toàn Tuyệt Đối',
      description: 'Bảo hiểm toàn diện, xe được trang bị đầy đủ thiết bị an toàn hiện đại nhất.',
      color: 'from-red-400 to-red-600'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded-full" style={{ color: '#188f49', backgroundColor: '#e8f5e9' }}>
              Tính Năng Nổi Bật
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
            Tại Sao Chọn <span style={{ color: '#188f49' }}>Chúng Tôi?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi mang đến trải nghiệm thuê xe điện tốt nhất với những tính năng vượt trội
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ '--hover-border-color': '#e8f5e9' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e8f5e9'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors" style={{ '--hover-color': '#188f49' }} onMouseEnter={(e) => e.currentTarget.style.color = '#188f49'} onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
