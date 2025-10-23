import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { vnpayService } from '../../../services/vnpayService';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentResult = async () => {
      try {
        setLoading(true);
        
        // Lấy các tham số từ URL
        const queryParams = Object.fromEntries(searchParams.entries());
        
        // Gọi API xử lý kết quả thanh toán
        const result = await vnpayService.handlePaymentResult(queryParams);
        
        if (result.success) {
          setPaymentResult(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error handling payment result:', err);
        setError('Có lỗi xảy ra khi xử lý kết quả thanh toán');
      } finally {
        setLoading(false);
      }
    };

    handlePaymentResult();
  }, [searchParams]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewContracts = () => {
    navigate('/my-contracts');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleBackToHome}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Về trang chủ
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = paymentResult?.status === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isSuccess ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-6">
              Đơn hàng của bạn đã được xử lý thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </p>
            
            {/* Thông tin đơn hàng */}
            {paymentResult?.orderInfo && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Thông tin đơn hàng:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Mã đơn hàng:</span> {paymentResult.orderInfo.orderId}</p>
                  <p><span className="font-medium">Số tiền:</span> {paymentResult.orderInfo.amount?.toLocaleString('vi-VN')}₫</p>
                  <p><span className="font-medium">Phương thức:</span> VNPay</p>
                  <p><span className="font-medium">Thời gian:</span> {new Date().toLocaleString('vi-VN')}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={handleViewContracts}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Xem hợp đồng của tôi
              </button>
              <button
                onClick={handleBackToHome}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h2>
            <p className="text-gray-600 mb-6">
              {paymentResult?.message || 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleBackToHome}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Về trang chủ
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
