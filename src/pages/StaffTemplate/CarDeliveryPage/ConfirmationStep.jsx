import { useState } from 'react';

export default function ConfirmationStep({
  carData,
  inspectionData, 
  isStaffExplanationConfirmed,
  setIsStaffExplanationConfirmed,
  isCustomerConfirmed,
  setIsCustomerConfirmed
}) {
  const booking = carData.booking || {};

  // định dạng tiền theo VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // định dạng ngày giờ
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // đếm số lỗi trong checklist
  const issuesCount = inspectionData.checklist ? 
    inspectionData.checklist.filter(item => item.status !== 1).length : 0;

  return (
    <div className="space-y-8">
      {/* HỢP ĐỒNG BÀN GIAO XE */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-8">
        {/* Header hợp đồng */}
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HỢP ĐỒNG BÀN GIAO XE</h1>
          <p className="text-gray-600">Số hợp đồng: <span className="font-semibold">HD-{booking?.id || 'N/A'}</span></p>
          <p className="text-gray-600">Ngày lập: <span className="font-semibold">{new Date().toLocaleDateString('vi-VN')}</span></p>
        </div>
        {/* BÊN A - BÊN B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bên A - Công ty */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-3">BÊN A (Bên cho thuê)</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Công ty:</span> CÔNG TY TNHH THUÊ XE GREEN FUTURE SWP391</p>
              <p><span className="font-semibold">Địa chỉ:</span> Lô E2a-7, Đường D1, Khu Công nghệ cao, Phường Tăng Nhơn Phú, TP.HCM</p>
              <p><span className="font-semibold">Hotline:</span> 1900 xxxx</p>
              <p><span className="font-semibold">Email:</span> contact@swp391.vn</p>
            </div>
          </div>
          {/* Bên B - Khách hàng */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-900 mb-3">BÊN B (Bên thuê)</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Họ và tên:</span> {carData.customer.fullName || "N/A"}</p>
              <p><span className="font-semibold">CCCD/CMND:</span> {carData.customer.idCard || "N/A"}</p>
              <p><span className="font-semibold">BLX:</span> {carData.customer.driverLicense || "N/A"}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {carData.customer.phone || "N/A"}</p>
              <p><span className="font-semibold">Email:</span> {carData.customer.email || "N/A"}</p>
            </div>
          </div>
        </div>
        {/* THÔNG TIN XE */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
            I. THÔNG TIN XE THUÊ
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên xe:</p>
                <p className="font-semibold text-gray-900">{carData.modelName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Biển số xe:</p>
                <p className="font-bold text-red-600 text-lg">{carData.plateNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Màu sắc:</p>
                <p className="font-semibold text-gray-900">{carData.color || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số km hiện tại:</p>
                <p className="font-semibold text-gray-900">{carData.odometer || "N/A"} km</p>
              </div>
            </div>
          </div>
        </div>
        {/* THỜI GIAN VÀ CHI PHÍ */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
            II. THỜI GIAN VÀ CHI PHÍ THUÊ XE
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Thời gian nhận xe:</span>
                <span className="font-semibold">{formatDateTime(booking?.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Thời gian trả xe dự kiến:</span>
                <span className="font-semibold">{formatDateTime(booking?.endDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Thời gian thuê:</span>
                <span className="font-semibold">
                  {booking?.rentalType === 1 
                    ? booking?.rentalTime 
                    : booking?.rentalType === 2 
                    ? booking?.rentalTime / 7 
                    : booking?.rentalTime / 30} {booking?.rentalType === 1 ? "Ngày" : booking?.rentalType === 2 ? "Tuần" : "Tháng"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                <span className="text-gray-900 font-bold text-lg">TỔNG CHI PHÍ:</span>
                <span className="font-bold text-green-600 text-xl">{formatCurrency(booking?.baseCost)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Tiền đặt cọc:</span>
                <span className="font-semibold text-orange-600">{formatCurrency(booking?.deposit || 0)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* TÌNH TRẠNG XE */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
            III. TÌNH TRẠNG XE KHI BÀN GIAO
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {issuesCount === 0 ? (
              <div className="flex items-center text-green-600">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-lg">Xe trong tình trạng hoàn hảo, không có vấn đề</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center text-yellow-600">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-semibold text-lg">Đã phát hiện {issuesCount} vấn đề nhỏ</span>
                </div>
                <div className="pl-8">
                  <p className="text-sm text-gray-600 font-medium mb-2">Chi tiết các vấn đề:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {inspectionData.checklist
                      .filter(item => item.status !== 1)
                      .map((item, index) => (
                        <li key={index}>{item.categoryName}: {item.itemName}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
            {inspectionData.notes && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-1">Ghi chú thêm:</p>
                <p className="text-sm text-gray-600 italic">"{inspectionData.notes}"</p>
              </div>
            )}
          </div>
        </div>
        {/* ĐIỀU KHOẢN HỢP ĐỒNG */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
            IV. ĐIỀU KHOẢN VÀ CAM KẾT
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 1:</span>
                <p>Bên B cam kết sử dụng xe đúng mục đích, không vi phạm pháp luật giao thông và các quy định hiện hành.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 2:</span>
                <p>Bên B chịu trách nhiệm bảo quản xe trong thời gian thuê. Mọi hư hỏng, mất mát phát sinh do lỗi của Bên B sẽ được bồi thường theo giá trị thực tế.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 3:</span>
                <p>Bên B cam kết trả xe đúng địa điểm, thời gian đã thỏa thuận. Nếu trả muộn, Bên B sẽ phải thanh toán phí phát sinh theo quy định.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 4:</span>
                <p>Bên B không được tự ý chuyển nhượng, cho mượn xe hoặc sử dụng xe vào mục đích kinh doanh vận tải trái phép.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 5:</span>
                <p>Bên A có trách nhiệm cung cấp xe trong tình trạng an toàn, đảm bảo chất lượng và hỗ trợ Bên B trong trường hợp có sự cố trong quá trình sử dụng.</p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2 min-w-[60px]">Điều 6:</span>
                <p>Hai bên đã đọc kỹ, hiểu rõ và đồng ý với tất cả các điều khoản trong hợp đồng này. Hợp đồng có hiệu lực kể từ thời điểm ký kết.</p>
              </div>
            </div>
          </div>
        </div>
        {/* XÁC NHẬN CỦA KHÁCH HÀNG */}
        <div className="border-t-2 border-gray-300 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            V. XÁC NHẬN CỦA KHÁCH HÀNG & NHÂN VIÊN
          </h3>
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
            <label className="flex items-start space-x-4 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={isCustomerConfirmed}
                  onChange={(e) => setIsCustomerConfirmed(e.target.checked)}
                  className="w-6 h-6 text-green-600 border-2 border-green-600 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-900 text-base mb-2">
                  ✓ Tôi (Bên B - Khách hàng) xác nhận rằng:
                </p>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Tôi đã đọc kỹ, hiểu rõ và đồng ý với tất cả các điều khoản trong hợp đồng này.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Tôi đã kiểm tra và xác nhận tình trạng xe khi nhận bàn giao như đã ghi nhận ở trên.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Tôi cam kết sử dụng xe đúng mục đích, bảo quản xe cẩn thận và trả xe đúng hạn.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Tôi chịu hoàn toàn trách nhiệm về mọi hành vi vi phạm pháp luật và thiệt hại xảy ra trong thời gian thuê xe.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Tôi đã nhận đầy đủ các giấy tờ xe và chìa khóa từ Bên A.</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm font-semibold text-green-900">
                  Khách hàng: <span className="underline">{carData.customer.fullName || "___________________"}</span>
                </p>
              </div>
            </label>
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
      {/* Lưu ý quan trọng */}
      <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-7 h-7 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="text-orange-900 font-bold text-lg mb-3">⚠️ LƯU Ý QUAN TRỌNG</h4>
            <ul className="text-orange-800 text-sm space-y-2">
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Vui lòng kiểm tra kỹ lưỡng tất cả thông tin trước khi xác nhận.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Khách hàng và nhân viên phải xác nhận đầy đủ mới có thể hoàn tất bàn giao.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Hợp đồng này có giá trị pháp lý và không thể thay đổi sau khi hoàn tất.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Mọi thắc mắc vui lòng liên hệ hotline: <span className="font-bold">1900 xxxx</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}