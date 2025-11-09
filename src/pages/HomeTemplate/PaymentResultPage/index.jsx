import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { vnpayService } from '../../../services/vnpayService';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const handlePaymentResult = async () => {
      try {
        setLoading(true);
        
        // Lấy các tham số từ URL
        const queryParams = Object.fromEntries(searchParams.entries());
        
        console.log('VNPay callback params:', queryParams);
        
        // Kiểm tra mã phản hồi từ VNPay
        const vnp_ResponseCode = queryParams.vnp_ResponseCode || queryParams.ResponseCode;
        
        if (vnp_ResponseCode === '00') {
          // Thanh toán thành công
          setPaymentResult({
            status: 'success',
            message: 'Thanh toán thành công',
            orderInfo: {
              orderId: queryParams.vnp_TxnRef || queryParams.TxnRef,
              amount: parseInt(queryParams.vnp_Amount || queryParams.Amount || '0') / 100,
              transactionNo: queryParams.vnp_TransactionNo || queryParams.TransactionNo
            }
          });
        } else {
          // Thanh toán thất bại
          setPaymentResult({
            status: 'failed',
            message: 'Thanh toán thất bại hoặc bị hủy'
          });
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

  // Auto redirect sau khi thanh toán thành công
  useEffect(() => {
    if (paymentResult?.status === 'success' && !loading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/my-contracts');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentResult, loading, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isSuccess ? (
          <>
            {/* Success Icon with Animation */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-4">
              Đơn thuê xe của bạn đã được thanh toán thành công.
            </p>
            
            {/* Countdown */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-green-700">
                Tự động chuyển đến trang hợp đồng trong <span className="font-bold text-lg">{countdown}</span> giây...
              </p>
            </div>
            
            {/* Thông tin đơn hàng */}
            {paymentResult?.orderInfo && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin thanh toán:</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {paymentResult.orderInfo.orderId && (
                    <div className="flex justify-between">
                      <span className="font-medium">Mã đơn hàng:</span>
                      <span>{paymentResult.orderInfo.orderId}</span>
                    </div>
                  )}
                  {paymentResult.orderInfo.amount && (
                    <div className="flex justify-between">
                      <span className="font-medium">Số tiền:</span>
                      <span className="text-green-600 font-semibold">{paymentResult.orderInfo.amount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  {paymentResult.orderInfo.transactionNo && (
                    <div className="flex justify-between">
                      <span className="font-medium">Mã giao dịch:</span>
                      <span>{paymentResult.orderInfo.transactionNo}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Phương thức:</span>
                    <span>VNPay</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Thời gian:</span>
                    <span>{new Date().toLocaleString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/my-contracts')}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Xem hợp đồng ngay
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
