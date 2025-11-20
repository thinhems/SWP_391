import React from 'react';

const ProfileInformationSection = ({ 
  user, 
  isEditing, 
  loading, 
  formik,
  handleEditProfile, 
  handleCancelEdit
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>
          <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Chỉnh sửa</span>
          </button>
        )}
      </div>
      {/* render form chỉnh sửa thông tin cá nhân  */}
      {isEditing ? (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">Email không thể thay đổi</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>Lưu thay đổi</span>
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        /* render thông tin cá nhân khi không chỉnh sửa */
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
              <p className="text-gray-900 font-medium">{user.name || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900 font-medium">{user.email || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
              <p className="text-gray-900 font-medium">{user.phone || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
              <p className="text-gray-900 font-medium">{user.address || 'Chưa cập nhật'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInformationSection;