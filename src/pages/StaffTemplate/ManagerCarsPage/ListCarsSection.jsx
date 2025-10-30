
import { useNavigate } from 'react-router-dom';

export default function ListCarsSection({ cars, activeTab }) {
  const navigate = useNavigate();
  // hàm đổi màu pin  
  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600';
    if (battery >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  // hàm hiển thị trạng thái xe
  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Có sẵn' },
      pending_approval: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xác nhận' },
      pending_contract: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Chờ ký hợp đồng' },
      booked: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Đã đặt' },
      rented: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Đang cho thuê' }
    };
    const config = statusConfig[status] || statusConfig.available;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };
  // hàm chuyển trang nhận xe trả
  const handleCarReturn = (car) => {
    navigate(`/staff/manage-cars/car-return/${car.id}`);
  };
  // hàm chuyển trang giao xe
  const handleCarDelivery = (car) => {
    navigate(`/staff/manage-cars/car-delivery/${car.id}`);
  };
  // hàm chuyển trang duyệt xe
  const handleApprovalReview = (car) => {
    navigate(`/staff/manage-cars/approval-review/${car.id}`);
  };
  // hàm chuyển trang kiểm tra xe
  const handleInspectionlCar = (car) => {
    navigate(`/staff/manage-cars/inspection/${car.id}`);
  };
  // hàm định dạng tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="flex flex-wrap gap-6">
      {cars.map((car) => (
        <div key={car.id} className="w-full sm:w-80 md:w-96 lg:w-[450px] bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{car.model}</h3>
              <p className="text-gray-600 font-medium">{car.licensePlate}</p>
              <p className="text-sm text-gray-500">{car.color} - {car.year}</p>
            </div>
            {getStatusBadge(car.status)}
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pin:</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${car.battery >= 80 ? 'bg-green-500' : car.battery >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${car.battery}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getBatteryColor(car.battery)}`}>
                  {car.battery}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vị trí:</span>
              <span className="text-sm font-medium text-gray-900">{car.location}</span>
            </div>
            {/* thông tin theo từng trạng thái */}
            {car.customer && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Khách hàng:</span>
                  <span className="text-sm font-medium text-gray-900">{car.customer.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SĐT:</span>
                  <span className="text-sm font-medium text-blue-600">{car.customer.phone}</span>
                </div>
              </>
            )}
            {car.requestTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Yêu cầu lúc:</span>
                <span className="text-sm font-medium text-gray-900">{car.requestTime}</span>
              </div>
            )}

            {car.approvalTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duyệt lúc:</span>
                <span className="text-sm font-medium text-gray-900">{car.approvalTime}</span>
              </div>
            )}

            {car.totalCost && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tổng tiền:</span>
                <span className="text-sm font-bold text-green-600">{formatCurrency(car.totalCost)}</span>
              </div>
            )}

            {car.bookingTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thời gian đặt:</span>
                <span className="text-sm font-medium text-gray-900">{car.bookingTime}</span>
              </div>
            )}

            {car.pickupTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Giờ nhận xe:</span>
                <span className="text-sm font-medium text-orange-600">{car.pickupTime}</span>
              </div>
            )}

            {car.rentTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thuê từ:</span>
                <span className="text-sm font-medium text-gray-900">{car.rentTime}</span>
              </div>
            )}

            {car.expectedReturn && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dự kiến trả:</span>
                <span className="text-sm font-medium text-purple-600">{car.expectedReturn}</span>
              </div>
            )}

            {car.lastMaintenance && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bảo trì cuối:</span>
                <span className="text-sm font-medium text-gray-900">{car.lastMaintenance}</span>
              </div>
            )}
          </div>

          {/* nút theo từng tab */}
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            {activeTab === 'available' && (
              <>
                <button 
                onClick={() => handleInspectionlCar(car)} 
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  Kiểm tra xe
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                  Bảo trì
                </button>
              </>
            )}
            
            {activeTab === 'pending_approval' && (
              <>
                {car.status === 'pending_approval' && (
                  <button 
                    onClick={() => handleApprovalReview(car)}
                    className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors cursor-pointer"
                  >
                    Duyệt xe
                  </button>
                )}
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
                  Liên hệ KH
                </button>
              </>
            )}

            
            {activeTab === 'booked' && (
              <>
                <button 
                  onClick={() => handleCarDelivery(car)}
                  className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer"
                >
                  Giao xe
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
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
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  Liên hệ KH
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};