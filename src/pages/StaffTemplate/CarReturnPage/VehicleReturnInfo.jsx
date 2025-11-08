export default function VehicleReturnInfo({ carData }) {
  const booking = carData?.booking || {};
  // tính số km tối đa được chạy
  const caculateKiloMax = 200 * (booking.rentalType === 1 ? booking.rentalTime : booking.rentalType === 2 ? booking.rentalTime * 7 : booking.rentalTime * 30);
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Thông tin xe trả
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* thông tin xe */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin xe</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-semibold">{carData.modelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biển số:</span>
              <span className="font-bold text-red-600">{carData.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pin ban đầu:</span>
              <span className="font-semibold text-green-600">{carData.batteryLevel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số km ban đầu:</span>
              <span className="font-semibold">{carData.odometer.toLocaleString()} km</span>
            </div>
          </div>
        </div>
        {/* thông tin khách hàng */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin khách hàng</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Tên:</span>
              <span className="font-semibold">{carData.customer.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SĐT:</span>
              <span className="font-semibold text-blue-600">{carData.customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian thuê:</span>
              <span className="font-semibold">
                {booking?.rentalTime} {booking?.rentalType === 1 ? "Ngày" : booking?.rentalType === 2 ? "Tuần" : "Tháng"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tiền cọc:</span>
              <span className="font-bold text-green-600">{booking.deposit.toLocaleString()} đ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-800 text-sm">
              <strong>Lưu ý:</strong> Số km tối đa được chạy: <strong>{caculateKiloMax} km </strong> 
              (200 km/ngày × {booking.rentalType === 1 ? booking.rentalTime : booking.rentalType === 2 ? booking.rentalTime * 7 : booking.rentalTime * 30} ngày)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}