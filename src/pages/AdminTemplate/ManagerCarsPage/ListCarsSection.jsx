
import { useNavigate } from 'react-router-dom';

export default function ListCarsSection({ cars, activeTab, isAdmin }) {
  const navigate = useNavigate();
  const basePath = isAdmin ? '/admin' : '/staff';
  
  if (activeTab == 'pending_approval') {
    cars = cars.sort((a, b) => a.booking?.requestTime + b.booking?.requestTime);
  }
  // Hàm đổi màu pin
  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600';
    if (battery >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Hàm hiển thị trạng thái xe (status là số từ 0-4)
  const getStatusBadge = (status) => {
    const statusConfig = [
      { bg: 'bg-green-100', text: 'text-green-800', label: 'Có sẵn' },           // 0 available
      { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xác nhận' },   // 1 pending_approval
      { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Chờ ký hợp đồng' },    // 2 pending_contract
      { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Chờ bàn giao' },         // 3 pending_handover
      { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Đang cho thuê' }   // 4 rented
    ];
    const config = statusConfig[status] || statusConfig[0];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Hàm chuyển trang nhận xe trả
  const handleCarReturn = (car) => {
    navigate(`${basePath}/manage-cars/car-return/${car.id}`);
  };

  // Hàm chuyển trang giao xe
  const handleCarDelivery = (car) => {
    navigate(`${basePath}/manage-cars/car-delivery/${car.id}`);
  };

  // Hàm chuyển trang duyệt xe
  const handleApprovalReview = (car) => {
    navigate(`${basePath}/manage-cars/approval-review/${car.id}`);
  };

  // Hàm chuyển trang kiểm tra xe
  const handleInspectionCar = (car) => {
    navigate(`${basePath}/manage-cars/inspection/${car.id}`);
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
      {cars.map((car) => (
        <div key={car.id} className="w-full sm:w-80 md:w-96 lg:w-[510px] bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{car.modelName}</h3>
              <p className="text-gray-600 font-medium">{car.plateNumber}</p>
              <p className="text-sm text-gray-500">{car.color}</p>
            </div>
            {getStatusBadge(car.status)}
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pin:</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${car.batteryLevel >= 80 ? 'bg-green-500' : car.batteryLevel >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${car.batteryLevel}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getBatteryColor(car.batteryLevel)}`}>
                  {car.batteryLevel}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vị trí:</span>
              <span className="text-sm font-medium text-gray-900">{car.location}</span>
            </div>
            {/* Thông tin theo từng trạng thái */}
            {car?.status !== 0 && (
              <>
                {car?.customer && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Khách hàng:</span>
                      <span className="text-sm font-medium text-gray-900">{car.customer.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SĐT:</span>
                      <span className="text-sm font-medium text-blue-600">{car.customer.phone}</span>
                    </div>
                  </>
                )}
                {isValidTime(car?.booking?.requestTime) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Yêu cầu lúc:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDateTime(car.booking?.requestTime)}
                    </span>
                  </div>
                )}
                {car?.booking?.rentalType != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hình thức thuê:</span>
                    <span className="text-sm font-bold text-red-600">
                      {car.booking.rentalType === 1 ? 'Theo ngày' : car.booking.rentalType === 2 ? 'Theo tuần' : 'Theo tháng'}
                    </span>
                  </div>
                )}
                {car?.booking?.baseCost != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tổng tiền:</span>
                    <span className="text-sm font-bold text-green-600">
                      {formatCurrency(car.booking.baseCost)}
                    </span>
                  </div>
                )}
                {car?.booking?.startDate && isValidTime(car?.booking?.startDate) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày nhận xe:</span>
                    <span className="text-sm font-medium text-orange-600">
                      {formatDateTime(car?.booking?.startDate)}
                    </span>
                  </div>
                )}
                {car?.booking?.endDate && isValidTime(car?.booking?.endDate) && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày trả xe:</span>
                    <span className="text-sm font-medium text-purple-600">
                      {formatDateTime(car?.booking?.endDate)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Nút theo từng tab */}
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            {activeTab === 'available' && (
              <>
                <button 
                  onClick={() => handleInspectionCar(car)} 
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Kiểm tra xe
                </button>
              </>
            )}

            {activeTab === 'pending_approval' && (
              <>
                {car.status === 1 && (
                  <button 
                    onClick={() => handleApprovalReview(car)}
                    className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors cursor-pointer"
                  >
                    Duyệt xe
                  </button>
                )}
                <button 
                  onClick={() => handleClick(car?.booking?.customer?.phoneNumber)}
                  className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                  Liên hệ KH
                </button>
              </>
            )}

            {activeTab === 'pending_handover' && (
              <>
                <button 
                  onClick={() => handleCarDelivery(car)}
                  className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                >
                  Giao xe
                </button>
                <button 
                  onClick={() => handleClick(car?.booking?.customer?.phoneNumber)}
                  className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                  Liên hệ KH
                </button>
              </>
            )}
            
            {activeTab === 'rented' && (
              <>
                <button 
                  onClick={() => handleCarReturn(car)}
                  className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  Nhận xe trả
                </button>
                <button 
                  onClick={() => handleClick(car?.booking?.customer?.phoneNumber)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  Liên hệ KH
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}