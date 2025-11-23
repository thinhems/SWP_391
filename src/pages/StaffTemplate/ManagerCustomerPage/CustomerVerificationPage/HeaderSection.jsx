import React from 'react'

export default function HeaderSection( { customer, onNavigateBack, isProcessing } ) {
  
  // lấy badge trạng thái
  const getStatusBadge = (status) => {
    const config = {
      1: { bg: 'bg-red-100', text: 'text-red-800', label: 'Chưa xác thực' },
      2: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xác thực' },
      3: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xác thực' }
    };
    const c = config[status] || config.unverified;
    return (
      <span className={`px-4 py-2 rounded-full text-sm font-medium ${c.bg} ${c.text} inline-flex items-center`}>
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Kiểm tra khách hàng
          </h1>
          <div className="mt-2 flex items-center space-x-4">
            <p className="text-gray-600">ID: {customer.id}</p>
            {getStatusBadge(customer.isVerified)}
            {getTypeBadge(customer.customerType)}
          </div>
        </div>
        <button
          onClick={onNavigateBack}
          disabled={isProcessing}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer ${
            isProcessing 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Quay lại trang quản lý</span>
        </button>
      </div>
    </div>
  )
}
