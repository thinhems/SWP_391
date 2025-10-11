import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBatteryFull, faClock, faSuitcase } from "@fortawesome/free-solid-svg-icons";

export default function CarCard({ car, onSelectCar, activeTab }) {
  // Định dạng số tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Lấy giá hiện tại dựa trên loại thuê
  const getCurrentPrice = () => car.price[activeTab];

  // Lấy đơn vị thuê
  const getRentalUnit = () => {
    switch(activeTab) {
      case 'daily': return 'ngày';
      case 'weekly': return 'tuần';
      case 'monthly': return 'tháng';
      default: return 'ngày';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-gray-100 hover:-translate-y-1 cursor-pointer group"
      onClick={() => onSelectCar(car)}
    >
      {/* Hiển thị trạng thái xe */}
      {car.availability === 'rented' && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full">
            Hết xe
          </span>
        </div>
      )}
      {car.availability === 'available' && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-full">
            Còn xe
          </span>
        </div>
      )}
      {/* Image chỉ hiển thị ảnh đầu tiên */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Car Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {car.model}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faUser} />
            <span>{car.specifications.seats} chỗ</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faBatteryFull} />
            <span>{car.specifications.range}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faClock} />
            <span>{car.specifications.chargingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faSuitcase} />
            <span>{car.specifications.trunkCapacity}</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(getCurrentPrice())}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              VNĐ/{getRentalUnit()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};