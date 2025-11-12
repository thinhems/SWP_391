import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookingService } from '../../../services/bookingService';

export default function ConfirmSignaturePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Token không hợp lệ');
      setErrorDetails('Vui lòng kiểm tra lại link xác thực từ email.');
      return;
    }

    // Gọi API xác thực
    const confirmSignature = async () => {
      try {
        const result = await bookingService.confirmSignature(token);
        
        if (result.success) {
          setStatus('success');
          setMessage('Xác thực chữ ký thành công!');
          // Sau 3 giây chuyển về trang hợp đồng
          setTimeout(() => {
            navigate('/my-contracts');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Xác thực thất bại');
          setErrorDetails(result.error || 'Vui lòng thử lại hoặc liên hệ hỗ trợ.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Có lỗi xảy ra');
        setErrorDetails('Vui lòng thử lại sau.');
      }
    };

    confirmSignature();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Đang xác thực...</h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-3">{message}</h2>
            <p className="text-gray-600 mb-6">Hợp đồng của bạn đã được ký thành công.</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                Bạn sẽ được chuyển đến trang hợp đồng trong giây lát...
              </p>
            </div>
            <button
              onClick={() => navigate('/my-contracts')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Xem hợp đồng của tôi
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">{message}</h2>
            <p className="text-gray-600 mb-6">{errorDetails}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Có thể do:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Link xác thực đã hết hạn</li>
                    <li>Token không hợp lệ</li>
                    <li>Hợp đồng đã được ký trước đó</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/my-contracts')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Xem danh sách hợp đồng
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
