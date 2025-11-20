import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cảm ơn ${formData.name}! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất.`);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="py-5 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
            Để Lại <span style={{ color: '#188f49' }}>Lời Nhắn</span>
          </h2>
          <p className="text-lg text-gray-600">
            Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong 24 giờ
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-green-300 p-8 md:p-12">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: '#188f49' }}
                  onFocus={(e) => e.target.style.borderColor = '#188f49'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#188f49'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#188f49'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="0123456789"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chủ Đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  onFocus={(e) => e.target.style.borderColor = '#188f49'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Tư vấn thuê xe"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nội Dung <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                onFocus={(e) => e.target.style.borderColor = '#188f49'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="Nhập nội dung tin nhắn của bạn..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                style={{ backgroundColor: '#188f49' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#146b39'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#188f49'}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Gửi Tin Nhắn</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
