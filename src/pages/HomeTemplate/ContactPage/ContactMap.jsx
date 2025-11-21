import React from 'react';

export default function ContactMap() {
  return (
    <div className="pt-32 pb-20 mb-0 relative overflow-hidden" style={{ backgroundColor: '#188f49' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-block">
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">
            Tìm <span style={{ color: '#ffffffff' }}>Chúng Tôi</span>
          </h2>
          <p className="text-lg text-gray-100">
            Ghé thăm văn phòng chúng tôi để trải nghiệm dịch vụ tốt nhất
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305103!2d106.80730807570961!3d10.841132857995288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1732161234567!5m2!1sen!2s"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-2">Trụ Sở Chính</div>
            <div className="text-white/80 text-sm">Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-2">Chi Nhánh Quận 9</div>
            <div className="text-white/80 text-sm">Vinhome Grand Park,Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, TP.HCM</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-white mb-2">Chi Nhánh Bình Dương</div>
            <div className="text-white/80 text-sm">Nhà văn hóa sinh viên, Đại học Thủ Dầu Một, Phú Hòa, Thủ Dầu Một, Bình Dương</div>
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
