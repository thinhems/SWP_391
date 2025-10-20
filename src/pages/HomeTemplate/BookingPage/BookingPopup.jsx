import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BookingPopup({ isOpen, onClose, carModel, selectedLocation }) {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'daily';
  // Mock data voucher
  const mockVouchers = [
    { code: 'VINFAST10', discount: 10, description: 'Giảm 10% cho lần thuê đầu tiên' },
    { code: 'SUMMER2025', discount: 15, description: 'Giảm 15% cho thuê xe mùa hè' },
    { code: 'WEEKEND20', discount: 20, description: 'Giảm 20% thuê xe cuối tuần' },
    { code: 'LONGTERM25', discount: 25, description: 'Giảm 25% thuê xe dài hạn từ 7 ngày' },
    { code: 'STUDENT5', discount: 5, description: 'Giảm 5% cho sinh viên' }
  ];
  // Form data state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    rentDate: '',
    returnDate: '',
    duration: 1,
    notes: '',
    voucherCode: '',
    agreeTerms: false,
    agreePolicy: false
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
      // Lấy thông tin user từ localStorage
      const userString = localStorage.getItem('user');
      const defaultDates = getDefaultDates();
      const user = JSON.parse(userString);
      setFormData({
        customerName: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        rentDate: defaultDates.rentDate,
        returnDate: activeTab === 'daily' ? defaultDates.returnDate : '',
        duration: 1,
        notes: '',
        voucherCode: '',
        agreeTerms: false,
        agreePolicy: false
      });
    }
  }, [isOpen, activeTab]);
  // Tính toán giá
  const calculatePrice = () => {
    if (!carModel) return { basePrice: 0, duration: 0, totalPrice: 0, deposit: 0, totalAmount: 0, discount: 0, finalPrice: 0 };
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
    // Áp dụng voucher
    let discount = 0;
    const appliedVoucher = mockVouchers.find(v => v.code === formData.voucherCode);
    if (appliedVoucher) {
      discount = (totalPrice * appliedVoucher.discount) / 100;
    }
    const finalPrice = totalPrice - discount;
    const totalAmount = finalPrice + deposit;
    return {
      basePrice,
      duration,
      totalPrice,
      deposit,
      discount,
      finalPrice,
      totalAmount,
      appliedVoucher
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
  const handleSubmit = () => {
    // Validation
    if (!formData.customerName || !formData.phone || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (!formData.rentDate) {
      alert('Vui lòng chọn ngày nhận xe!');
      return;
    }
    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản dịch vụ!');
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
    const pricing = calculatePrice();
    const bookingData = {
      ...formData,
      carModel: carModel.name,
      station: selectedLocation,
      rentalType: activeTab,
      pricing
    };
    console.log('Booking data:', bookingData);
    alert('Đặt xe thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    onClose();
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
              {/* Thông tin khách hàng */}
              <div className="pt-3 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên người thuê</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className='max-w-2xl'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-200"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
              </div>
              {/* Thời gian thuê xe */}
              <div className="pt-2 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày nhận xe</label>
                    <input
                      type="datetime-local"
                      value={formData.rentDate}
                      onChange={(e) => handleInputChange('rentDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  {activeTab === 'daily' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày trả xe</label>
                      <input
                        type="datetime-local"
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số {activeTab === 'weekly' ? 'tuần' : 'tháng'} thuê
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={`Nhập số ${activeTab === 'weekly' ? 'tuần' : 'tháng'}`}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Ghi chú + voucher*/}
              <div className='pt-2 px-6'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập ghi chú (tùy chọn)..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã voucher</label>
                    <input
                      type="text"
                      value={formData.voucherCode}
                      onChange={(e) => handleInputChange('voucherCode', e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập mã voucher"
                    />
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Mã voucher có sẵn:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {mockVouchers.slice(0, 3).map((voucher) => (
                          <button
                            key={voucher.code}
                            type="button"
                            onClick={() => handleInputChange('voucherCode', voucher.code)}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                          >
                            {voucher.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Điều khoản */}
              <div className="pt-2 px-6 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    Tôi đồng ý với <span className="text-green-600 cursor-pointer hover:underline">Điều khoản dịch vụ</span> và 
                    <span className="text-green-600 cursor-pointer hover:underline"> Chính sách bảo mật</span> của VinFast
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreePolicy"
                    checked={formData.agreePolicy}
                    onChange={(e) => handleInputChange('agreePolicy', e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
                  />
                  <label htmlFor="agreePolicy" className="text-sm text-gray-700">
                    Tôi đồng ý nhận thông tin khuyến mãi và cập nhật từ VinFast
                  </label>
                </div>
              </div>
              {/* nút thuê xe */}
              <div className="pt-4 px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.agreeTerms}
                  className={`w-full py-4 px-6 text-lg font-bold rounded-lg shadow-lg transition-all duration-200 ${
                    !formData.agreeTerms
                      ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105 cursor-pointer'
                  }`}
                >
                  Gửi yêu cầu thuê xe
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
                        {pricing.discount > 0 && (
                          <div className="flex justify-between items-center text-lg text-green-600">
                            <span className="font-bold">Giảm giá ({pricing.appliedVoucher?.code})</span>
                            <span className="font-bold">
                              -{pricing.discount.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">Tiền đặt cọc</span>
                          <span className="font-bold text-gray-900">
                            {pricing.deposit.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <hr className="border-gray-400 border-dashed" />
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">Thanh toán*</span>
                          <span className="font-bold text-green-600 text-xl">
                            {pricing.totalAmount.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">*Giá thuê xe đã bao gồm VAT.</p>
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