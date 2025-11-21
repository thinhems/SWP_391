import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../services/api';

export default function EmailVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token xác thực không hợp lệ');
        return;
      }

      try {
        setStatus('verifying');
        const response = await api.get('/Auth/verify', {
          params: { token }
        });

        console.log('Verify response:', response.data);
        
        setStatus('success');
        setMessage('Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.');
        
        // Chuyển về trang login sau 3 giây
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Verify error:', error);
        setStatus('error');
        
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else if (error.response?.status === 400) {
          setMessage('Token không hợp lệ hoặc đã hết hạn');
        } else {
          setMessage('Có lỗi xảy ra khi xác thực email. Vui lòng thử lại.');
        }
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {status === 'verifying' && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-20"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 opacity-40 animate-spin"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-600 to-blue-700 opacity-60 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang xác thực email</h2>
            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-3">Xác thực thành công!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang chuyển đến trang đăng nhập...</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">Xác thực thất bại</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Đăng ký lại
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
