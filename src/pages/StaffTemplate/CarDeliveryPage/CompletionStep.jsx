
export default function CompletionStep({
  carData, 
  contractData, 
  inspectionData, 
  onCompleteDelivery 
}) {
  //format theo VND
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };
  // lấy ngày giờ hiện tại theo định dạng dd/mm/yyyy, hh:mm
  const getCurrentDateTime = () => {
    return new Date().toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sẵn sàng hoàn tất bàn giao</h2>
        <p className="text-gray-600">Kiểm tra lại thông tin cuối cùng trước khi hoàn tất quy trình</p>
      </div>

      {/* tóm tắt thông tin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Thông tin bàn giao</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Khách hàng:</span>
              <span className="font-medium">{carData.customer.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{carData.customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Xe:</span>
              <span className="font-medium">{carData.modelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biển số:</span>
              <span className="font-bold text-red-600">{carData.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian thuê:</span>
              <span className="font-medium">{contractData?.totalDays ? contractData.totalDays : "N/A"} ngày</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Tình trạng xe</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Đã kiểm tra hoàn tất</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Đã chụp ảnh tài liệu</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Pin hiện tại: {carData.batteryLevel}%</span>
            </div>
            {inspectionData.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="font-medium">Ghi chú:</span> {inspectionData.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* thông tin bàn giao */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Thông tin bàn giao hoàn tất</h4>
            <div className="space-y-1 text-blue-700 text-sm">
              <p>• Địa điểm: Green Future - Nguyễn Huệ Quận 1</p>
              <p>• Thời gian bàn giao: {getCurrentDateTime()}</p>
              <p>• Ngày trả xe dự kiến: {formatDate(contractData.endDate)}</p>
              <p>• Xe sẽ chuyển sang trạng thái "Đang cho thuê"</p>
            </div>
          </div>
        </div>
      </div>

      {/* nút hoàn tất */}
      <div className="text-center">
        <button
          onClick={onCompleteDelivery}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 cursor-pointer `}>
          Hoàn tất bàn giao xe
        </button>
        <p className="text-gray-600 text-sm mt-3">
          Sau khi nhấn nút này, xe sẽ chuyển sang trạng thái cho thuê và không thể hoàn tác
        </p>
      </div>
    </div>
  );
}