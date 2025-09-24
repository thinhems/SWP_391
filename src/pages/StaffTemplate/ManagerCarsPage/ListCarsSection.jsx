

export default function ListCarsSection({ cars, activeTab, onHandover }) {

  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600';
    if (battery >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      ready: { bg: 'bg-green-100', text: 'text-green-800', label: 'Sẵn sàng' },
      charging: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang sạc' },
      booked: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Đã đặt' },
      rented: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Đang cho thuê' },
      maintenance: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Bảo trì' }
    };
    const config = statusConfig[status] || statusConfig.ready;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
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

            {car.customer && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Khách hàng:</span>
                  <span className="text-sm font-medium text-gray-900">{car.customer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SĐT:</span>
                  <span className="text-sm font-medium text-blue-600">{car.phone}</span>
                </div>
              </>
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

          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            {activeTab === 'available' && (
              <>
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Kiểm tra xe
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Đánh dấu bận
                </button>
              </>
            )}
            
            {activeTab === 'booked' && (
              <>
                <button 
                  onClick={() => onHandover(car)}
                  className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  Giao xe
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                  Liên hệ KH
                </button>
              </>
            )}
            
            {activeTab === 'rented' && (
              <>
                <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Nhận xe
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
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

