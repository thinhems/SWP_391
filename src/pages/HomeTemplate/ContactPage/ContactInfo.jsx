import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ContactInfo() {
  const contactItems = [
    {
      icon: faPhone,
      title: 'Số Điện Thoại',
      content: '+84 123 456 789',
      subContent: 'Gọi ngay để được tư vấn',
      color: '#188f49'
    },
    {
      icon: faEnvelope,
      title: 'Email',
      content: 'support@support.vn',
      subContent: 'Gửi email cho chúng tôi',
      color: '#188f49'
    },
    {
      icon: faLocationDot,
      title: 'Địa Chỉ',
      content: 'Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh',
      subContent: 'Ghé thăm văn phòng',
      color: '#188f49'
    },
    {
      icon: faClock,
      title: 'Giờ Làm Việc',
      content: 'Thứ 2 - Chủ Nhật',
      subContent: '7:00 AM - 10:00 PM',
      color: '#188f49'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
            Kết Nối <span style={{ color: '#188f49' }}>Với Chúng Tôi</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nhiều cách để liên hệ, chọn cách phù hợp nhất với bạn
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e8f5e9'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#188f49' }}>
                  <FontAwesomeIcon icon={item.icon} className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="font-semibold mb-2" style={{ color: '#188f49' }}>
                {item.content}
              </p>
              <p className="text-sm text-gray-600">
                {item.subContent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
