
export default function ContractInfoStep({ contractData }) {
  //format theo VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  // format ngày theo dd/mm/yyyy
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin hợp đồng thuê xe</h2>
        <p className="text-gray-600">Vui lòng kiểm tra thông tin trước khi tiến hành bàn giao xe</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* thông tin khách hàng */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Thông tin khách hàng
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Họ và tên:</span>
              <span className="text-gray-900 font-semibold">{contractData.customer.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Số điện thoại:</span>
              <span className="text-blue-600 font-semibold">{contractData.customer.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Số CCCD:</span>
              <span className="text-gray-900 font-semibold">{contractData.customer.idCard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Bằng lái xe:</span>
              <span className="text-gray-900 font-semibold">{contractData.customer.driverLicense}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">Địa chỉ:</span>
              <span className="text-gray-900 font-semibold text-right max-w-xs">{contractData.customer.address}</span>
            </div>
          </div>
        </div>

        {/* thông tin xe */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Thông tin xe
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Model xe:</span>
              <span className="text-gray-900 font-semibold">{contractData.car.model}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Biển số:</span>
              <span className="text-red-600 font-bold text-lg">{contractData.car.licensePlate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Màu xe:</span>
              <span className="text-gray-900 font-semibold">{contractData.car.color}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Năm sản xuất:</span>
              <span className="text-gray-900 font-semibold">{contractData.car.year}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Số km hiện tại:</span>
              <span className="text-gray-900 font-semibold">{contractData.car.initialOdometer} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Mức pin hiện tại:</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${contractData.car.battery}%` }}
                  ></div>
                </div>
                <span className="text-green-600 font-semibold">{contractData.car.battery}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* thời gian và chi phí */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Thời gian thuê</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 font-medium">Số km chạy tối đa:</span>
                <span className="text-blue-800 font-bold">{contractData.rental.totalMaxKm} km</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 font-medium">Ngày nhận xe:</span>
                <span className="text-blue-800 font-bold">{formatDate(contractData.rental.startDate)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 font-medium">Ngày trả xe:</span>
                <span className="text-blue-800 font-bold">{formatDate(contractData.rental.endDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Tổng số ngày:</span>
                <span className="text-blue-800 font-bold text-xl">{contractData.rental.totalDays} ngày</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Chi phí</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 font-medium">Giá thuê/ngày:</span>
                <span className="text-green-800 font-bold">{formatCurrency(contractData.rental.pricePerDay)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 font-medium">Tiền cọc:</span>
                <span className="text-green-800 font-bold">{formatCurrency(contractData.rental.deposit)}</span>
              </div>
              <div className="border-t border-green-200 pt-2 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium text-lg">Tổng chi phí:</span>
                  <span className="text-green-800 font-bold text-2xl">{formatCurrency(contractData.rental.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* thông báo quan trọng */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h4 className="text-yellow-800 font-semibold mb-1">Lưu ý quan trọng</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Khách hàng vui lòng kiểm tra kỹ thông tin trước khi ký hợp đồng</li>
              <li>• Mọi thay đổi sau khi ký sẽ phát sinh phí bổ sung</li>
              <li>• Xe cần được trả với mức pin bằng với mức pin được giao</li>
              <li>• Khi trả xe quá số km theo hợp đồng sẽ có phụ phí</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}