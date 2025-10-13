import React from 'react';

export default function PersonalInfoForm({ verificationData, handleInputChange }) {
  return (
    <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
      { /* thông tin cá nhân */ }
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Thông tin cá nhân
      </h4>
      { /* Form nhập thông tin cá nhân để xác thực */ }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số CCCD *
          </label>
          <input
            type="text"
            name="cccdNumber"
            value={verificationData.cccdNumber}
            onChange={handleInputChange}
            required
            placeholder="Nhập số căn cước công dân"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số Bằng lái xe *
          </label>
          <input
            type="text"
            name="blxNumber"
            value={verificationData.blxNumber}
            onChange={handleInputChange}
            required
            placeholder="Nhập số bằng lái xe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên (theo giấy tờ) *
          </label>
          <input
            type="text"
            name="fullName"
            value={verificationData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Nhập họ và tên đầy đủ"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày sinh *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={verificationData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới tính *
          </label>
          <select
            name="gender"
            value={verificationData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
      </div>
    </div>
  );
};