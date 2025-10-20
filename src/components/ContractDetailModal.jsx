import React from 'react';

export default function ContractDetailModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 bg-green-50',
      active: 'text-blue-600 bg-blue-50',
      pending: 'text-yellow-600 bg-yellow-50',
      cancelled: 'text-red-600 bg-red-50'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết hợp đồng</h2>
            <p className="text-gray-600 mt-1">Mã hợp đồng: {order.orderCode}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Car Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin xe</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={order.carImage}
                    alt={order.carModel}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/default-car.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{order.carModel}</div>
                  <div className="text-gray-600">{order.licensePlate}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm nhận:</span>
                  <span className="font-medium">{order.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm trả:</span>
                  <span className="font-medium">{order.returnLocation}</span>
                </div>
              </div>
            </div>

            {/* Status and Dates */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin hợp đồng</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.statusText}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt:</span>
                  <span className="font-medium">{formatDateOnly(order.bookingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày nhận xe:</span>
                  <span className="font-medium">{formatDateOnly(order.pickupDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày trả xe:</span>
                  <span className="font-medium">{formatDateOnly(order.returnDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số ngày:</span>
                  <span className="font-medium text-green-600">{order.totalDays} ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Họ tên:</span>
                <span className="font-medium">{order.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Số điện thoại:</span>
                <span className="font-medium">{order.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{order.customer.email}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Usage Information */}
          {(order.status === 'completed' || order.status === 'active') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mileage Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin số km</h3>
                <div className="space-y-3 text-sm">
                  {order.mileage.start && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Km khi nhận:</span>
                      <span className="font-medium">{order.mileage.start?.toLocaleString()} km</span>
                    </div>
                  )}
                  {order.mileage.end && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Km khi trả:</span>
                      <span className="font-medium">{order.mileage.end?.toLocaleString()} km</span>
                    </div>
                  )}
                  {order.mileage.total && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng km đã chạy:</span>
                      <span className="font-medium text-blue-600">{order.mileage.total?.toLocaleString()} km</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giới hạn km:</span>
                    <span className="font-medium">{order.mileage.limit?.toLocaleString()} km</span>
                  </div>
                  {order.mileage.total && order.mileage.total > order.mileage.limit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vượt quá:</span>
                      <span className="font-medium text-red-600">
                        +{(order.mileage.total - order.mileage.limit).toLocaleString()} km
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Battery Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin pin</h3>
                <div className="space-y-3 text-sm">
                  {order.battery.start && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pin khi nhận:</span>
                      <span className="font-medium">{order.battery.start}%</span>
                    </div>
                  )}
                  {order.battery.end && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pin khi trả:</span>
                      <span className="font-medium">{order.battery.end}%</span>
                    </div>
                  )}
                  {order.battery.start && order.battery.end && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đã sử dụng:</span>
                      <span className={`font-medium ${order.battery.start - order.battery.end > 30 ? 'text-red-600' : 'text-blue-600'}`}>
                        {order.battery.start - order.battery.end}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Financial Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài chính</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiền thuê xe:</span>
                  <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiền cọc:</span>
                  <span className="font-medium">{formatCurrency(order.deposit)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold text-gray-900">Tổng cộng:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(order.totalAmount + order.deposit)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">{order.payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.payment.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : order.payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.payment.status === 'paid' && 'Đã thanh toán'}
                    {order.payment.status === 'pending' && 'Chờ thanh toán'}
                    {order.payment.status === 'refunded' && 'Đã hoàn tiền'}
                  </span>
                </div>
                {order.payment.refundAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiền hoàn lại:</span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(order.payment.refundAmount)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            {order.status === 'pending' && (
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                Hủy hợp đồng
              </button>
            )}
            {order.status === 'active' && (
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Gia hạn thuê
              </button>
            )}
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
              Tải hợp đồng (PDF)
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}