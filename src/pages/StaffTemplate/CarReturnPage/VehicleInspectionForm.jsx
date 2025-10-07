import { useState, useEffect } from 'react';

export default function VehicleInspectionForm({ order, onDataChange }) {
  const [currentBattery, setCurrentBattery] = useState(order.car.initialBattery);
  const [currentOdometer, setCurrentOdometer] = useState(order.car.initialOdometer);
  const [additionalFees, setAdditionalFees] = useState([]);

  const additionalFeeOptions = [
    { id: 'cleaning', label: 'Vệ sinh xe', amount: 200000 },
    { id: 'scratch', label: 'Trầy xước nhỏ', amount: 500000 },
    { id: 'tire', label: 'Thay lốp', amount: 1000000 },
    { id: 'interior', label: 'Hư hỏng nội thất', amount: 800000 },
    { id: 'other', label: 'Phí khác', amount: 0, isCustom: true }
  ];

  const [customFeeAmount, setCustomFeeAmount] = useState(0);
  // gửi dữ liệu kiểm tra khi có thay đổi
  useEffect(() => {
    onDataChange({
      currentBattery,
      currentOdometer,
      additionalFees,
      customFeeAmount
    });
  }, [currentBattery, currentOdometer, additionalFees, customFeeAmount]);
  // xử lý chọn/ bỏ chọn phụ phí
  const handleFeeToggle = (fee) => {
    setAdditionalFees(prev => {
      const exists = prev.find(f => f.id === fee.id);
      if (exists) {
        return prev.filter(f => f.id !== fee.id);
      } else {
        return [...prev, fee];
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Kiểm tra xe khi trả
      </h2>
      <div className="space-y-6">
        {/* pin hiện tại */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mức pin hiện tại (%) <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className='flex items-center space-x-4'> 
              <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentBattery}
                  onChange={(e) => setCurrentBattery(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-20 px-3 py-1 border border-gray-300 rounded text-center font-semibold"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentBattery}
                  onChange={(e) => setCurrentBattery(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            {currentBattery < order.car.initialBattery && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                ⚠️ Pin thấp hơn {order.car.initialBattery - currentBattery}% so với ban đầu
              </div>
            )}
          </div>
        </div>
        {/* số km hiện tại */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số km trên đồng hồ hiện tại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min={order.car.initialOdometer}
              value={currentOdometer}
              onChange={(e) => setCurrentOdometer(parseInt(e.target.value) || order.car.initialOdometer)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-semibold text-lg"
              placeholder="Nhập số km hiện tại"
            />
            <span className="absolute right-4 top-3 text-gray-500 font-medium">km</span>
          </div>
          {currentOdometer > order.car.initialOdometer && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-600">Số km đã chạy:</span>
              <span className={`font-bold ${
                (currentOdometer - order.car.initialOdometer) > order.rental.totalMaxKm 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {(currentOdometer - order.car.initialOdometer).toLocaleString()} km
              </span>
            </div>
          )}
          {(currentOdometer - order.car.initialOdometer) > order.rental.totalMaxKm && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              ⚠️ Vượt quá {(currentOdometer - order.car.initialOdometer - order.rental.totalMaxKm).toLocaleString()} km so với giới hạn
            </div>
          )}
        </div>
        {/* Phụ phí bổ sung */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Phụ phí bổ sung (nếu có)</h3>
          <div className="space-y-3">
            {additionalFeeOptions.map((fee) => (
              <div key={fee.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={fee.id}
                  checked={additionalFees.some(f => f.id === fee.id)}
                  onChange={() => handleFeeToggle(fee)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor={fee.id} className="flex-1 flex justify-between items-center cursor-pointer">
                  <span className="text-gray-700">{fee.label}</span>
                  {fee.isCustom ? (
                    <input
                      type="number"
                      value={customFeeAmount}
                      onChange={(e) => setCustomFeeAmount(parseInt(e.target.value) || 0)}
                      disabled={!additionalFees.some(f => f.id === fee.id)}
                      className="w-32 px-3 py-1 border border-gray-300 rounded text-right disabled:bg-gray-100"
                      placeholder="Nhập số tiền"
                    />
                  ) : (
                    <span className="font-semibold text-gray-900">{fee.amount.toLocaleString()} đ</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}