import { useState, useEffect } from 'react';
import { bookingService } from '../../../services/bookingService';

export default function OTPVerificationPopup({ contract, isOpen, onClose }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0); // Start at 0
  const [canResend, setCanResend] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && otpSent) {
      setCanResend(true);
    }
  }, [countdown, otpSent]);
  // format time mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  // handle thay đổi ô nhập input khi nhập
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  // handle thay đổi ô nhập input khi xóa
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  // handle verify otp
  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErrorMessage('Vui lòng nhập đầy đủ mã OTP');
      return;
    }
    setIsVerifying(true);
    setErrorMessage(''); 
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (otpValue === '123456') {
        setSuccessMessage('Xác thực OTP thành công! Hợp đồng đã được ký.');
      } else {
        setErrorMessage('Mã OTP không chính xác. Vui lòng thử lại.');
      }
    } catch (error) {
      setErrorMessage('Có lỗi xảy ra khi xác thực OTP. Vui lòng thử lại.');
    } finally {
      setIsVerifying(false);
    }
  };
  // handle send otp
  const handleSendOtp = async () => {
    setIsSending(true);
    setErrorMessage('');
    try {
      // Gọi API gửi email OTP
      const result = await bookingService.sendSignatureEmail(contract.id);
      
      if (result.success) {
        setOtpSent(true);
        setCountdown(300); // 5 phút
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setSuccessMessage('Mã OTP đã được gửi đến email của bạn.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Không thể gửi mã OTP. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Không thể gửi mã OTP. Vui lòng thử lại.');
    } finally {
      setIsSending(false);
    }
  };
  // handle resend otp
  const handleResendOtp = async () => {
    setIsSending(true);
    setErrorMessage('');
    try {
      // Gọi lại API gửi email OTP
      const result = await bookingService.sendSignatureEmail(contract.id);
      
      if (result.success) {
        setCountdown(300);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setSuccessMessage('Mã OTP mới đã được gửi đến email của bạn.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Không thể gửi lại mã OTP. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage('Không thể gửi lại mã OTP. Vui lòng thử lại.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto relative animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác thực OTP</h3>
            <p className="text-gray-600 text-sm">
              {otpSent ? (
                <>Mã OTP đã được gửi đến <span className="font-semibold text-gray-900">{contract.customer.email}</span></>
              ) : (
                <>Chúng tôi sẽ gửi mã OTP đến <span className="font-semibold text-gray-900">{contract.customer.email}</span></>
              )}
            </p>
          </div>
          {!otpSent ? (
            /* Send OTP Form */
            <div className="space-y-4">
              <button
                onClick={handleSendOtp}
                disabled={isSending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isSending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang gửi mã...
                  </div>
                ) : (
                  'Gửi mã OTP'
                )}
              </button>
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{errorMessage}</p>
                </div>
              )}
            </div>
          ) : (
            /* OTP Input Form */
            <div className="space-y-4">
              <div className="flex justify-center space-x-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    disabled={isVerifying}
                  />
                ))}
              </div>
              <div className="text-center text-sm text-gray-600 mb-4">
                {countdown > 0 ? (
                  <span>Mã hết hạn sau: <span className="font-bold text-red-600">{formatTime(countdown)}</span></span>
                ) : countdown === 0 && otpSent ? (
                  <span className="text-red-600 font-bold">Mã OTP đã hết hạn</span>
                ) : null}
              </div>
              {/* Messages */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{errorMessage}</p>
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 text-center">{successMessage}</p>
                </div>
              )}
              {/* các nút hành động */}
              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || otp.join('').length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Đang xác thực...
                    </div>
                  ) : (
                    'Xác thực & ký hợp đồng'
                  )}
                </button>
                <button
                  onClick={handleResendOtp}
                  disabled={!canResend || isSending}
                  className="w-full bg-green-100 hover:bg-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-green-700 disabled:text-gray-400 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {isSending ? 'Đang gửi...' : 'Gửi lại mã OTP'}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kiểm tra hộp thư đến và thư mục spam</li>
                  <li>• Liên hệ hotline 1900-xxxx nếu cần hỗ trợ</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};