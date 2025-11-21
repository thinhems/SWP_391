import React from 'react';

export default function PersonalInfoForm({ formik }) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số CCCD *
          </label>
          <input
            type="text"
            name="cccdNumber"
            value={formik.values.cccdNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Nhập số căn cước công dân"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              formik.touched.cccdNumber && formik.errors.cccdNumber 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
          />
          {formik.touched.cccdNumber && formik.errors.cccdNumber && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.cccdNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số Bằng lái xe *
          </label>
          <input
            type="text"
            name="blxNumber"
            value={formik.values.blxNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Nhập số bằng lái xe"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              formik.touched.blxNumber && formik.errors.blxNumber 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
          />
          {formik.touched.blxNumber && formik.errors.blxNumber && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.blxNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
};