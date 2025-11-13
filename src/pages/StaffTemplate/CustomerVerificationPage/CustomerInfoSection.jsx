
export default function CustomerInfoSection({ customer }) {
  // lấy badge trạng thái
  const getStatusBadge = (status) => {
    const config = {
      verified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xác thực', icon: '✓' },
      unverified: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chưa xác thực', icon: '⏳' }
    };
    const c = config[status] || config.unverified;
    return (
      <span className={`px-4 py-2 rounded-full text-sm font-medium ${c.bg} ${c.text} inline-flex items-center`}>
        <span className="mr-2 text-lg">{c.icon}</span>
        {c.label}
      </span>
    );
  };

  // lấy badge loại khách hàng
  const getTypeBadge = (type) => {
    const config = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Mới' },
      regular: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Thường xuyên' },
      vip: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'VIP' }
    };
    const c = config[type] || config.new;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <>
      {/* thông tin cá nhân */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Thông tin cá nhân
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* avatar */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {customer.avatar ? (
                  <img src={customer.avatar} alt={customer.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl text-blue-600 font-bold">{customer.fullName.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{customer.fullName}</h3>
              <p className="text-sm text-gray-600 mt-1">{customer.email}</p>
            </div>
          </div>
          {/* thông tin chi tiết */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                <p className="text-lg font-semibold text-blue-600">{customer.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Số CCCD</p>
                <p className="text-lg font-semibold text-gray-900">{customer?.idCard || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Bằng lái xe</p>
                <p className="text-lg font-semibold text-gray-900">{customer?.driverLicense || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Trạng thái xác thực</p>
                <p className="text-lg font-semibold text-gray-900">{customer?.status || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                <p className="text-lg font-semibold text-gray-900">{customer?.address || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Tổng số lượt thuê</p>
                <p className="text-2xl font-bold text-blue-900">{customer?.totalRentals || 'N/A'}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700 mb-1">Loại khách hàng</p>
                <div className="mt-2">{getTypeBadge(customer.customerType)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}