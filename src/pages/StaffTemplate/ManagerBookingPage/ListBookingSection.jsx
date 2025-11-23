
import { useNavigate } from 'react-router-dom';

export default function ListBookingSection({ bookings, activeTab }) {
  const navigate = useNavigate();
  
  // Kiểm tra nếu bookings undefined hoặc không phải array
  if (!bookings || !Array.isArray(bookings)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không có dữ liệu booking</p>
      </div>
    );
  }

  // Sắp xếp bookings theo requestTime gần nhất
  let sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.requestTime) - new Date(a.requestTime)
  );
  // Hàm đổi màu pin
  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600';
    if (battery >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Hàm hiển thị trạng thái booking (status là số từ 1-4)
  const getStatusBadge = (status) => {
    const statusConfig = {
      1: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ phê duyệt' },
      2: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Chờ ký HĐ' },
      3: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Chờ bàn giao' },
      4: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Đang thuê' }
    };
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'N/A' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Hàm chuyển trang nhận xe trả
  const handleCarReturn = (booking) => {
    navigate(`/staff/manage-bookings/car-return/${booking.idBooking}`);
  };

  // Hàm chuyển trang giao xe
  const handleCarDelivery = (booking) => {
    navigate(`/staff/manage-bookings/car-delivery/${booking.idBooking}`);
  };

  // Hàm chuyển trang duyệt booking
  const handleApprovalReview = (booking) => {
    navigate(`/staff/manage-bookings/approval-review/${booking.idBooking}`);
  };

  // Hàm định dạng tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };
  // mờ trang zalo khách hàng
  const handleClick = (sdt) => {
    window.open(`https://zalo.me/${sdt}`, "_blank");
  };
  // Hàm kiểm tra thời gian hợp lệ
  const isValidTime = (time) => {
    if (!time) return false;
    const invalidTimes = ['0001-01-01T00:00:00', '00:00:00'];
    return !invalidTimes.some(invalid => time.includes(invalid));
  };

  // Hàm format datetime
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString || !isValidTime(dateTimeString)) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="flex flex-wrap gap-6">
      {sortedBookings.map((booking) => {
        const car = booking.vehicle; // Lấy thông tin xe từ booking
        
        return (
          <div key={booking.idBooking} className="w-full sm:w-80 md:w-96 lg:w-[510px] bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{car?.modelName || 'N/A'}</h3>
                <p className="text-gray-600 font-medium">{car?.plateNumber || 'N/A'}</p>
                <p className="text-sm text-gray-500">{car?.color || 'N/A'}</p>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pin:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${car?.batteryLevel >= 80 ? 'bg-green-500' : car?.batteryLevel >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${car?.batteryLevel || 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${getBatteryColor(car?.batteryLevel || 0)}`}>
                    {car?.batteryLevel || 0}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vị trí:</span>
                <span className="text-sm font-medium text-gray-900">{car?.location || 'N/A'}</span>
              </div>

              {/* Thông tin khách hàng */}
              {booking?.customer && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Khách hàng:</span>
                    <span className="text-sm font-medium text-gray-900">{booking.customer.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SĐT:</span>
                    <span className="text-sm font-medium text-blue-600">{booking.customer.phone}</span>
                  </div>
                </>
              )}

              {isValidTime(booking?.requestTime) && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yêu cầu lúc:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDateTime(booking.requestTime)}
                  </span>
                </div>
              )}

              {booking?.rentalType != null && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hình thức thuê:</span>
                  <span className="text-sm font-bold text-red-600">
                    {booking.rentalType === 1 ? 'Theo ngày' : booking.rentalType === 2 ? 'Theo tuần' : 'Theo tháng'}
                  </span>
                </div>
              )}

              {booking?.baseCost != null && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tổng tiền:</span>
                  <span className="text-sm font-bold text-green-600">
                    {formatCurrency(booking.baseCost)}
                  </span>
                </div>
              )}

              {booking?.startDate && isValidTime(booking.startDate) && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ngày nhận xe:</span>
                  <span className="text-sm font-medium text-orange-600">
                    {formatDateTime(booking.startDate)}
                  </span>
                </div>
              )}

              {booking?.endDate && isValidTime(booking.endDate) && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ngày trả xe:</span>
                  <span className="text-sm font-medium text-purple-600">
                    {formatDateTime(booking.endDate)}
                  </span>
                </div>
              )}
            </div>

            {/* Nút theo từng tab */}
            <div className="flex space-x-2 pt-4 border-t border-gray-100">
              {activeTab === 'pending_approval' && (
                <>
                  <button 
                    onClick={() => handleApprovalReview(booking)}
                    className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors cursor-pointer"
                  >
                    Duyệt yêu cầu
                  </button>
                  <button 
                    onClick={() => handleClick(booking?.customer?.phoneNumber)}
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                    Liên hệ KH
                  </button>
                </>
              )}

              {activeTab === 'pending_contract' && (
                <>
                  <button 
                    onClick={() => handleClick(booking?.customer?.phoneNumber)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    Liên hệ KH
                  </button>
                </>
              )}

              {activeTab === 'pending_handover' && (
                <>
                  <button 
                    onClick={() => handleCarDelivery(booking)}
                    className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    Giao xe
                  </button>
                  <button 
                    onClick={() => handleClick(booking?.customer?.phoneNumber)}
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                    Liên hệ KH
                  </button>
                </>
              )}
              
              {activeTab === 'rented' && (
                <>
                  <button 
                    onClick={() => handleCarReturn(booking)}
                    className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Nhận xe trả
                  </button>
                  <button 
                    onClick={() => handleClick(booking?.customer?.phoneNumber)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    Liên hệ KH
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}