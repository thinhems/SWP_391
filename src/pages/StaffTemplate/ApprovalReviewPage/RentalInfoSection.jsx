
export default function RentalInfoSection({ rental, requestTime, notes }) {
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
      weekday: 'long'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0V5c0-1.105.895-2 2-2h2c1.105 0 2 .895 2 2v2m-6 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
        </svg>
        Thông tin thuê xe
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* thời gian thuê */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Thời gian thuê xe</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thời gian yêu cầu:</span>
                <span className="text-sm font-medium text-gray-900">{formatDateTime(requestTime)}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ngày nhận xe:</span>
                <span className="text-sm font-semibold text-gray-900">{formatDate(rental.startDate)}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ngày trả xe:</span>
                <span className="text-sm font-semibold text-gray-900">{formatDate(rental.endDate)}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Số km tối đa (vượt qua sẽ có phụ phí):</span>
                <span className="text-sm font-semibold text-gray-900">{rental.limitedKilometers} kilometers</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 font-medium">Tổng thời gian thuê:</span>
                <span className="text-xl font-bold text-blue-900">{rental.totalDays} ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* chi phí */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Chi phí thuê xe</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">Giá thuê/ngày:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(rental.pricePerDay)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">{rental.totalDays} ngày × {formatCurrency(rental.pricePerDay)}:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(rental.totalCost)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">Tiền cọc:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(rental.deposit)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-700">Chi phí phát sinh:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(0)}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm text-green-800 font-bold text-lg">Tổng chi phí:</span>
              <span className="text-sm font-bold text-green-900 text-xl">{formatCurrency(rental.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ghi chú */}
      {notes && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Ghi chú từ khách hàng</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 italic">{notes}</p>
          </div>
        </div>
      )}
      {/* lưu ý quan trọng */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h5 className="font-semibold text-amber-800 mb-1">Lưu ý quan trọng</h5>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Khách hàng cần trả tiền cọc khi nhận xe</li>
              <li>• Tiền cọc sẽ được hoàn lại khi trả xe trong tình trạng tốt</li>
              <li>• Chi phí thuê được tính theo ngày, không theo giờ. Nếu vượt quá số KM thì sẽ có phụ phí</li>
              <li>• Xe cần được trả với mức pin bằng với mức pin được giao, nếu thiếu sẽ có phụ phí</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}