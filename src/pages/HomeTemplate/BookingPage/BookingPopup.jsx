import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { vnpayService } from '../../../services/vnpayService';
import { bookingService } from '../../../services/bookingService';
import { useStations } from '../../../contexts/StationsContext';

export default function BookingPopup({ isOpen, onClose, carModel, selectedLocation }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { stations } = useStations();
  const activeTab = searchParams.get('tab') || 'daily';
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form data state - chỉ giữ những field cần thiết
  const [formData, setFormData] = useState({
    rentDate: '',
    returnDate: '',
    duration: 1
  });
  // Tính toán mặc định cho ngày thuê/trả xe (UTC+7)
  const getDefaultDates = () => {
    const now = new Date();
    
    // Ngày thuê: ngày mai 8:00 AM
    const rentDate = new Date(now);
    rentDate.setDate(rentDate.getDate() + 1);
    rentDate.setHours(8, 0, 0, 0);
    
    // Ngày trả: 2 ngày sau 8:00 AM (chỉ cho daily)
    const returnDate = new Date(now);
    returnDate.setDate(returnDate.getDate() + 2);
    returnDate.setHours(8, 0, 0, 0);
    
    // Format cho datetime-local input (YYYY-MM-DDTHH:MM)
    const formatForInput = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    return {
      rentDate: formatForInput(rentDate),
      returnDate: formatForInput(returnDate)
    };
  };
  // Khởi tạo form data khi popup mở
  useEffect(() => {
    if (isOpen) {
      const defaultDates = getDefaultDates();
      setFormData({
        rentDate: defaultDates.rentDate,
        returnDate: activeTab === 'daily' ? defaultDates.returnDate : '',
        duration: 1
      });
    }
  }, [isOpen, activeTab]);
  // Tính toán giá
  const calculatePrice = () => {
    if (!carModel) return { basePrice: 0, duration: 0, totalPrice: 0, deposit: 0, totalAmount: 0 };
    const basePrice = carModel.price[activeTab];
    const deposit = carModel.deposit[activeTab];
    let duration = 1;
    if (activeTab === 'daily') {
      // Tính số ngày từ rentDate đến returnDate
      if (formData.rentDate && formData.returnDate) {
        const daysDiff = Math.ceil((new Date(formData.returnDate) - new Date(formData.rentDate)) / (1000 * 60 * 60 * 24));
        duration = Math.max(1, daysDiff);
      }
    } else {
      // Sử dụng duration từ input
      duration = formData.duration || 1;
    }
    const totalPrice = basePrice * duration;
    const totalAmount = totalPrice + deposit;
    return {
      basePrice,
      duration,
      totalPrice,
      deposit,
      totalAmount
    };
  };
  // Xử lý thay đổi form
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  // Xử lý submit
  const handleSubmit = async () => {
    // Validation
    if (!formData.rentDate) {
      alert('Vui lòng chọn ngày nhận xe!');
      return;
    }
    if (activeTab === 'daily' && !formData.returnDate) {
      alert('Vui lòng chọn ngày trả xe!');
      return;
    }
    if (activeTab === 'daily' && new Date(formData.returnDate) <= new Date(formData.rentDate)) {
      alert('Ngày trả xe phải sau ngày nhận xe!');
      return;
    }
    if ((activeTab === 'weekly' || activeTab === 'monthly') && (!formData.duration || formData.duration < 1)) {
      alert(`Vui lòng nhập số ${activeTab === 'weekly' ? 'tuần' : 'tháng'} hợp lệ!`);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Lấy thông tin user từ localStorage
      const userString = localStorage.getItem('user');
      if (!userString) {
        alert('Vui lòng đăng nhập để tiếp tục!');
        setIsProcessing(false);
        return;
      }
      const user = JSON.parse(userString);
      
      // Tìm stationId từ selectedLocation
      const station = stations.find(s => s.name === selectedLocation);
      if (!station) {
        alert('Không tìm thấy thông tin điểm thuê xe!');
        setIsProcessing(false);
        return;
      }

      // Tính toán ngày kết thúc dựa trên activeTab
      let endDate;
      if (activeTab === 'daily') {
        endDate = new Date(formData.returnDate).toISOString();
      } else if (activeTab === 'weekly') {
        const start = new Date(formData.rentDate);
        endDate = new Date(start);
        endDate.setDate(endDate.getDate() + (formData.duration * 7));
        endDate = endDate.toISOString();
      } else { // monthly
        const start = new Date(formData.rentDate);
        endDate = new Date(start);
        endDate.setMonth(endDate.getMonth() + formData.duration);
        endDate = endDate.toISOString();
      }

      // Tạo booking qua API
      const bookingData = {
        modelId: carModel.id,
        renterId: user.id,
        stationId: station.id,
        startDate: new Date(formData.rentDate).toISOString(),
        endDate: endDate
      };

      console.log('User data:', user);
      console.log('Station data:', station);
      console.log('Car model ID:', carModel.id);
      console.log('Booking data to send:', bookingData);

      const bookingResult = await bookingService.createBooking(bookingData);
      
      if (!bookingResult.success) {
        alert(`Lỗi khi tạo đơn thuê: ${bookingResult.error}`);
        setIsProcessing(false);
        return;
      }

      // Tạo booking thành công
      alert('Đặt xe thành công! Đơn thuê của bạn đang chờ xét duyệt.');
      onClose();
      // Chuyển đến trang danh sách đơn thuê hoặc trang chủ
      navigate('/my-contracts');
      
      /* TEMPORARY: Tắt thanh toán VNPay
      // Nếu tạo booking thành công, tiếp tục với thanh toán VNPay
      const pricing = calculatePrice();
      const paymentData = vnpayService.createPaymentData({
        ...formData,
        carModel: carModel.name,
        carModelId: carModel.id,
        station: selectedLocation,
        rentalType: activeTab,
        pricing,
        bookingId: bookingResult.data.id // Lưu ID của booking vừa tạo
      });
      
      // Gọi API tạo URL thanh toán VNPay
      const result = await vnpayService.createPaymentUrl(paymentData);
      
      if (result.success) {
        // Chuyển hướng đến VNPay
        vnpayService.redirectToVNPay(result.data.paymentUrl);
      } else {
        alert(`Lỗi thanh toán: ${result.error}`);
        setIsProcessing(false);
      }
      */
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('Có lỗi xảy ra khi xử lý đơn thuê. Vui lòng thử lại!');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-[1330px] w-full max-h-[90vh] overflow-hidden p-3">
        {/* Header */}
        <div className="to-green-600 text-black p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Đăng ký thuê xe</h2>
            <button 
              onClick={onClose}
              className="text-black hover:text-green-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="flex flex-col lg:flex-row gap-6 pb-6">
            {/* content left */}
            <div className="flex-1 lg:w-6/10 space-y-6">
              {/* Thông tin khách hàng - Read only */}
              <div className="pt-6 px-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên người thuê</label>
                    <input
                      type="text"
                      value={(() => {
                        const userString = localStorage.getItem('user');
                        if (userString) {
                          const user = JSON.parse(userString);
                          return user.name || '';
                        }
                        return '';
                      })()}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={(() => {
                        const userString = localStorage.getItem('user');
                        if (userString) {
                          const user = JSON.parse(userString);
                          return user.phone || '';
                        }
                        return '';
                      })()}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={(() => {
                        const userString = localStorage.getItem('user');
                        if (userString) {
                          const user = JSON.parse(userString);
                          return user.email || '';
                        }
                        return '';
                      })()}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              {/* Thời gian thuê xe */}
              <div className="pt-2 px-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thời gian thuê xe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày nhận xe *</label>
                    <input
                      type="datetime-local"
                      value={formData.rentDate}
                      onChange={(e) => handleInputChange('rentDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  {activeTab === 'daily' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày trả xe *</label>
                      <input
                        type="datetime-local"
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số {activeTab === 'weekly' ? 'tuần' : 'tháng'} thuê *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={`Nhập số ${activeTab === 'weekly' ? 'tuần' : 'tháng'}`}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* nút đặt xe */}
              <div className="pt-4 px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 text-lg font-bold rounded-lg shadow-lg transition-all duration-200 ${
                    isProcessing
                      ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105 cursor-pointer'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang xử lý đơn thuê...
                    </div>
                  ) : (
                    'Xác nhận đặt xe'
                  )}
                </button>
              </div>
            </div>
            {/* content right */}
            <div className="flex-none lg:w-4/10 space-y-0 bg-gray-50 p-5 mr-4">
              {/* tên xe + ảnh */}
              <div className="bg-white px-4 py-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex-1 truncate">
                    {carModel?.name}
                  </h3>
                  <div className="w-28 h-20 bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={carModel?.images?.[0]}
                      alt={carModel?.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              {/* hình thức thuê */}
              <div className="bg-green-50 rounded-lg border border-green-300 p-4">
                <p className="text-gray-600 text-sm mb-1">Khu vực thuê: {selectedLocation}</p>
                {/* Hiển thị thông tin thời gian thuê */}
                {(() => {
                  const pricing = calculatePrice();
                  if (activeTab === 'daily' && formData.rentDate && formData.returnDate) {
                    // Format ngày tháng cho daily
                    const rentDateTime = new Date(formData.rentDate);
                    const returnDateTime = new Date(formData.returnDate);
                    const formatDateTime = (date) => {
                      const hours = date.getHours().toString().padStart(2, '0');
                      const minutes = date.getMinutes().toString().padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const year = date.getFullYear();
                      return `${hours}:${minutes} ${day}/${month}/${year}`;
                    };
                    return (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800 text-sm">
                          {pricing.duration} ngày
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600 text-sm">
                          {formatDateTime(rentDateTime)} → {formatDateTime(returnDateTime)}
                        </span>
                      </div>
                    );
                  } else if ((activeTab === 'weekly' || activeTab === 'monthly') && formData.rentDate) {
                    // Format cho weekly/monthly
                    const rentDateTime = new Date(formData.rentDate);
                    const formatDate = (date) => {
                      const hours = date.getHours().toString().padStart(2, '0');
                      const minutes = date.getMinutes().toString().padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const year = date.getFullYear();
                      return `${hours}:${minutes} ${day}/${month}/${year}`;
                    };
                    return (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800 text-sm">
                          {formData.duration} {activeTab === 'weekly' ? 'tuần' : 'tháng'}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600 text-sm">
                          Bắt đầu: {formatDate(rentDateTime)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
                <p className="text-gray-600 text-sm">
                  Hình thức thuê: {activeTab === 'daily' ? 'Theo ngày' : activeTab === 'weekly' ? 'Theo tuần' : 'Theo tháng'}
                </p>
              </div>
              {/* chi tiết giá thuê */}
              <div className="">
                {(() => {
                  const pricing = calculatePrice();
                  return (
                    <div className="space-y-4">
                      <div className='pt-4 border-b border-dashed border-gray-400'>
                        <h4 className="font-semibold text-gray-900 mb-3 text-xl ">Bảng kê chi tiết</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-3">
                            <span className="text-gray-700 text-sm">
                              Cước phí niêm yết ({activeTab === 'daily' ? 'Theo ngày' : activeTab === 'weekly' ? 'Theo tuần' : 'Theo tháng'})
                            </span>
                            <span className="font-semibold text-sm">
                              {pricing.basePrice.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">Tổng tiền</span>
                          <span className="font-bold text-gray-900">
                            {pricing.totalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">Tiền đặt cọc</span>
                          <span className="font-bold text-gray-900">
                            {pricing.deposit.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <hr className="border-gray-400 border-dashed" />
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">Tổng tiền dự kiến</span>
                          <span className="font-bold text-green-600 text-xl">
                            {pricing.totalAmount.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">*Giá thuê xe đã bao gồm VAT. Thanh toán khi nhận xe.</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}