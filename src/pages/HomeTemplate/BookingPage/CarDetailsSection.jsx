
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDesktop,
  faWheelchair,
  faRobot,
  faShieldAlt,
  faEye,
  faCog,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

export default function CarDetailsSection({ carModel, activeTab }) {
  // tổng hợp icon cho từng tiện nghi
  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('màn hình') || lowerAmenity.includes('giải trí')) return faDesktop;
    if (lowerAmenity.includes('la-zăng') || lowerAmenity.includes('lazăng') || lowerAmenity.includes('inch')) return faWheelchair;
    if (lowerAmenity.includes('trợ lý') || lowerAmenity.includes('trí tuệ') || lowerAmenity.includes('ai')) return faRobot;
    if (lowerAmenity.includes('adas') || lowerAmenity.includes('hỗ trợ') || lowerAmenity.includes('người lái')) return faShieldAlt;
    if (lowerAmenity.includes('hud') || lowerAmenity.includes('hiển thị')) return faEye;
    if (lowerAmenity.includes('tích hợp') || lowerAmenity.includes('tuỳ chọn')) return faCog;
    return faCheck;
  };

  // lấy số tiền đặt cọc dựa trên tab hiện tại
  const getDepositAmount = () => {
    if (!carModel.deposit) return 5000000; // Default fallback
    switch (activeTab) {
      case 'daily':
        return carModel.deposit.daily;
      case 'weekly':
        return carModel.deposit.weekly;
      case 'monthly':
        return carModel.deposit.monthly;
      default:
        return carModel.deposit.daily;
    }
  };
  // format tiền VNĐ
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Các tiện nghi khác */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">Các tiện nghi khác</h3>
      <div className="bg-gray-50  border border-gray-200 p-6">
        <div className="grid grid-cols-2">
          {carModel.amenities.map((amenity, index) => (
            <div key={index} className="flex items-start space-x-3 p-2">
              <FontAwesomeIcon 
                icon={getAmenityIcon(amenity)} 
                className="text-gray-500 mt-1 flex-shrink-0"
                size="sm"
              />
              <span className="text-gray-700 text-sm leading-relaxed">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Điều kiện thuê xe */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">Điều kiện thuê xe</h3>
      <div className="space-y-6">
        {/* Thông tin cần có khi nhận xe */}
        <div className="bg-gray-50  border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Thông tin cần có khi nhận xe</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm">CCCD hoặc Hộ chiếu còn thời hạn</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm">Bằng lái hợp lệ, còn thời hạn</span>
            </div>
          </div>
        </div>
        {/* Hình thức thanh toán */}
        <div className="bg-gray-50  border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Hình thức thanh toán</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm">Trả trước</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm">Thời hạn thanh toán: khách hàng thanh toán 100% khi kí hợp đồng và nhận xe</span>
            </div>
          </div>
        </div>
        {/* Chính sách đặt cọc */}
        <div className="bg-gray-50  border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Chính sách đặt cọc</h4>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700 text-sm">
              Khách hàng phải thanh toán số tiền cọc là{' '}
              <span className="font-semibold text-green-600">
                {formatVND(getDepositAmount())}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
