

export default function ConfirmationStep({
  carData,
  contractData, 
  inspectionData, 
  isStaffExplanationConfirmed,
  setIsStaffExplanationConfirmed 
}) {

  // định dạng tiền theo VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // đếm số lỗi trong checklist
  const issuesCount = inspectionData.checklist ? 
    inspectionData.checklist.filter(item => item.status !== 1).length : 0;

  return (
    <div className="space-y-8">
      {/* tóm tắt hợp đồng */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Xác nhận thông tin</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* thông tin hợp đồng */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Thông tin hợp đồng
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Khách hàng:</span>
                <span className="font-semibold">{carData.customer.fullName ? carData.customer.fullName : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Xe thuê:</span>
                <span className="font-semibold">{carData.modelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biển số:</span>
                <span className="font-bold text-red-600">{carData.plateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-semibold">{contractData?.totalDays ? contractData.totalDays : "N/A"} ngày</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Tổng chi phí:</span>
                <span className="font-bold text-green-600">{formatCurrency(carData?.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* tình trạng xe */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Tình trạng xe đã kiểm tra
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {issuesCount === 0 ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Xe trong tình trạng hoàn hảo</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center text-yellow-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-semibold">Phát hiện {issuesCount} vấn đề nhỏ</span>
                  </div>
                  <p className="text-sm text-gray-600">Chi tiết đã được ghi nhận</p>
                </div>
              )}
              
              {inspectionData.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ghi chú:</span> {inspectionData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* xác nhận của staff */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isStaffExplanationConfirmed}
              onChange={(e) => setIsStaffExplanationConfirmed(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
            />
            <div className="text-blue-800">
              <span className="font-semibold">Xác nhận của nhân viên:</span>
              <p className="text-sm mt-1">
                Tôi đã giải thích rõ ràng về điều khoản hợp đồng, tình trạng xe và hướng dẫn sử dụng cho khách hàng. 
                Khách hàng đã hiểu và đồng ý với tất cả các điều khoản.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* điều khoản cuối */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="text-yellow-800 font-semibold mb-2">Lưu ý quan trọng trước khi hoàn tất</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Hai bên đã kiểm tra và xác nhận tình trạng xe chi tiết</li>
              <li>• Khách hàng cam kết sử dụng xe đúng mục đích và quy định</li>
              <li>• Mọi vấn đề phát sinh sẽ được giải quyết theo hợp đồng đã ký</li>
              <li>• Xe cần được trả đúng thời gian, địa điểm và số km/pin đã thỏa thuận</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}