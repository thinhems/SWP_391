
export default function OrderRow({ order, index, handleClickOrder }) {
  const statusMap = {
    pending_approval: { text: "Chờ duyệt", bg: "bg-yellow-100", color: "text-yellow-800" },
    pending_contract: { text: "Chờ ký hợp đồng", bg: "bg-purple-100", color: "text-purple-800" },
    booked: { text: "Đã đặt", bg: "bg-blue-100", color: "text-blue-800" },
    rented: { text: "Đang thuê", bg: "bg-orange-100", color: "text-orange-800" },
    completed: { text: "Hoàn thành", bg: "bg-green-100", color: "text-green-800" },
    cancelled: { text: "Đã hủy", bg: "bg-red-100", color: "text-red-800" }
  };
  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  // Lấy thông tin trạng thái
  const status = statusMap[order.status] || statusMap.pending;

  return (
    <div 
      key={order.id} 
      className={`px-6 py-5 hover:bg-green-50 transition-colors duration-200 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      }`}
    >
      <div className="grid grid-cols-11 gap-4 items-center cursor-pointer" onClick={() => handleClickOrder(order.id)}>
        {/* Car Info */}
        <div className="col-span-2">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={order.carImage}
                alt={order.carModel}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/default-car.jpg';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {order.carModel}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                BSX: {order.licensePlate || "N/A"}
              </div>
              <div className="text-xs font-medium text-green-600 mt-0.5">
                {order.orderCode}
              </div>
            </div>
          </div>
        </div>
        {/* Rental Period */}
        <div className="col-span-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(order.pickupDate)}
                </div>
                <div className="text-xs text-gray-500">đến</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(order.returnDate)}
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div className="text-xs text-green-600 font-medium">
                  {order.totalDays} ngày
                </div>
                <div className="text-xs text-gray-500">
                  {order.rentalType === 'days' ? 'Theo ngày' : order.rentalType === 'weeks' ? 'Theo tuần' : 'Theo tháng'}
                </div>
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="col-span-2">
          <div className="text-sm text-gray-900 truncate">
            {order.pickupLocation}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Địa điểm nhận xe
          </div>
        </div>
        {/* Amount */}
        <div className="col-span-2">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-gray-900">
              {formatCurrency(order.totalAmount)}
            </div>
            <div className="text-xs text-gray-500">
              Cọc: {formatCurrency(order.deposit)}
            </div>
          </div>
        </div>
        {/* Status */}
        <div className="col-span-2">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.color} border border-opacity-20`}>
            {status.text}
          </span>
        </div>
      </div>
    </div>
  );
}