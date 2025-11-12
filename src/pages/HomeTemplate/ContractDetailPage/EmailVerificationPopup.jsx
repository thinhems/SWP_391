import { useState } from 'react';
import { bookingService } from '../../../services/bookingService';

export default function EmailVerificationPopup({ contract, isOpen, onClose }) {
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    setIsSending(true);
    setErrorMessage('');
    
    try {
      // Gọi API gửi email xác thực
      const result = await bookingService.sendSignatureEmail(contract.id);
      
      if (result.success) {
        setEmailSent(true);
        console.log('Verification link:', result.verificationLink);
        setTimeout(() => {
          onClose();
          setEmailSent(false);
        }, 5000); // Tăng lên 5 giây để user có thời gian đọc
      } else {
        setErrorMessage(result.error || 'Không thể gửi email xác thực. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage('Có lỗi xảy ra khi gửi email. Vui lòng thử lại.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto relative animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {emailSent ? (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            
            {emailSent ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Email đã được gửi!</h3>
                <p className="text-gray-600 mb-3">
                  Vui lòng kiểm tra hộp thư <span className="font-semibold text-gray-900">{contract.customer.email}</span> để xác thực và ký hợp đồng điện tử.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Nhấn vào link trong email để hoàn tất ký hợp đồng
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Xác thực qua Email</h3>
                <p className="text-gray-600">
                  Chúng tôi sẽ gửi email xác thực đến <span className="font-semibold text-gray-900">{contract.customer.email}</span> để hoàn tất ký hợp đồng điện tử.
                </p>
              </>
            )}
          </div>

          {/* Thông tin hợp đồng */}
          {!emailSent && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-semibold text-gray-900">{contract.orderCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Số hợp đồng:</span>
                <span className="font-semibold text-gray-900">{contract.contractNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Xe thuê:</span>
                <span className="font-semibold text-gray-900">{contract.car.model}</span>
              </div>
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            </div>
          )}

          {/* Buttons */}
          {!emailSent && (
            <div className="space-y-3">
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                {isSending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang gửi email...
                  </div>
                ) : (
                  'Gửi email xác thực'
                )}
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Hủy
              </button>
            </div>
          )}

          {/* Lưu ý */}
          {!emailSent && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Lưu ý:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Vui lòng kiểm tra cả hộp thư spam/junk mail</li>
                    <li>Email có hiệu lực trong 24 giờ</li>
                    <li>Nhấn vào link trong email để hoàn tất ký hợp đồng</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
