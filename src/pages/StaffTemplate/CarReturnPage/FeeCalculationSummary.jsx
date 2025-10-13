export default function FeeCalculationSummary({ order, inspectionData }) {
  const calculateFees = () => {
    // Tính phí vượt km
    const kmDriven = inspectionData.currentOdometer - order.car.initialOdometer;
    const kmOverage = Math.max(0, kmDriven - order.rental.totalMaxKm);
    const kmOverageFee = kmOverage * order.rental.kmOverageFee;

    // Tính phí thiếu pin
    const batteryDeficit = Math.max(0, order.car.initialBattery - inspectionData.currentBattery);
    const batteryDeficitFee = batteryDeficit * order.rental.batteryDeficitFee;

    // Tính tổng phụ phí bổ sung
    const additionalFeesTotal = inspectionData.additionalFees.reduce((sum, fee) => {
      if (fee.isCustom) {
        return sum + inspectionData.customFeeAmount;
      }
      return sum + fee.amount;
    }, 0);

    const totalFees = kmOverageFee + batteryDeficitFee + additionalFeesTotal;
    const netAmount = order.rental.deposit - totalFees;

    return {
      kmDriven,
      kmOverage,
      kmOverageFee,
      batteryDeficit,
      batteryDeficitFee,
      additionalFeesTotal,
      totalFees,
      netAmount,
      needsPayment: netAmount < 0
    };
  };

  const fees = calculateFees();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Chi tiết thanh toán
      </h2>
      <div className="space-y-4">
        {/* phí thuê xe */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Phí thuê xe</span>
            <span className="font-semibold text-gray-900">{formatCurrency(order.rental.totalCost)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tiền cọc</span>
            <span className="font-semibold text-green-600">{formatCurrency(order.rental.deposit)}</span>
          </div>
        </div>
        {/* chi tiết phụ phí */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Các khoản phụ phí</h3>
          {/* phí vượt km */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex-1">
              <span className="text-gray-600">Phí vượt km</span>
              {fees.kmOverage > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {fees.kmOverage.toLocaleString()} km × {order.rental.kmOverageFee.toLocaleString()} đ/km
                </div>
              )}
            </div>
            <span className={`font-semibold ${fees.kmOverageFee > 0 ? 'text-red-600' : 'text-gray-400'}`}>
              {fees.kmOverageFee > 0 ? `+${formatCurrency(fees.kmOverageFee)}` : '0 đ'}
            </span>
          </div>
          {/* phí thiếu pin */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex-1">
              <span className="text-gray-600">Phí thiếu pin</span>
              {fees.batteryDeficit > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {fees.batteryDeficit}% × {order.rental.batteryDeficitFee.toLocaleString()} đ/%
                </div>
              )}
            </div>
            <span className={`font-semibold ${fees.batteryDeficitFee > 0 ? 'text-red-600' : 'text-gray-400'}`}>
              {fees.batteryDeficitFee > 0 ? `+${formatCurrency(fees.batteryDeficitFee)}` : '0 đ'}
            </span>
          </div>
          {/* phụ phí bổ sung */}
          {inspectionData.additionalFees.length > 0 && (
            <div className="space-y-2">
              <span className="text-gray-600 text-sm font-medium">Phụ phí bổ sung:</span>
              {inspectionData.additionalFees.map((fee) => (
                <div key={fee.id} className="flex justify-between items-center text-sm pl-4">
                  <span className="text-gray-600">{fee.label}</span>
                  <span className="font-semibold text-red-600">
                    +{formatCurrency(fee.isCustom ? inspectionData.customFeeAmount : fee.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* tổng cộng */}
        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Tổng phụ phí</span>
            <span className="font-bold text-red-600 text-lg">{formatCurrency(fees.totalFees)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-medium">Tiền cọc</span>
            <span className="font-bold text-gray-900 text-lg">-{formatCurrency(order.rental.deposit)}</span>
          </div>
          <div className={`p-4 rounded-lg ${fees.needsPayment ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-bold text-lg ${fees.needsPayment ? 'text-red-800' : 'text-green-800'}`}>
                {fees.needsPayment ? 'Khách hàng cần thanh toán thêm' : 'Hoàn trả khách hàng'}
              </span>
              <span className={`font-bold text-2xl ${fees.needsPayment ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(Math.abs(fees.netAmount))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}