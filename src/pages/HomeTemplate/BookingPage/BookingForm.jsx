
export default function BookingForm({ carModel, selectedStation, onStationChange, getAvailableCount }) {
  // Danh sách các trạm
  const stations = [
    'Quận 1',
    'Quận 7', 
    'Quận 9',
    'Quận Bình Thạnh'
  ];
  const availableCount = getAvailableCount();
  const isOutOfStock = availableCount === 0;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Chọn điểm thuê xe</h3>
      <div className="bg-white shadow-lg border border-gray-200 p-6">
        {/* Lựa chọn địa điểm */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Điểm thuê xe
          </label>
          <select
            value={selectedStation || ''}
            onChange={(e) => onStationChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
          >
            {stations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
        {/* Trạng thái có sẵn */}
        {selectedStation && (
          <div className={`p-4 rounded-lg mb-6 ${isOutOfStock ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className={`font-medium ${isOutOfStock ? 'text-red-700' : 'text-green-700'}`}>
                {isOutOfStock 
                  ? 'Không có xe khả dụng tại điểm này'
                  : `Còn ${availableCount} xe khả dụng tại ${selectedStation}`
                }
              </span>
            </div>
          </div>
        )}
        {/* Hiển thị giá */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Bảng giá thuê xe</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo ngày:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.daily.toLocaleString('vi-VN')} VNĐ/ngày
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo tuần:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.weekly.toLocaleString('vi-VN')} VNĐ/tuần
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo tháng:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.monthly.toLocaleString('vi-VN')} VNĐ/tháng
              </span>
            </div>
          </div>
        </div>
        {/* Thông tin bổ sung */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h6 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng:</h6>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Cần có bằng lái xe hợp lệ khi thuê</li>
            <li>• Đặt cọc 30% giá trị đơn hàng</li>
            <li>• Miễn phí hủy đơn trước 24h</li>
            <li>• Xe được giao tận nơi trong vòng 2h</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
