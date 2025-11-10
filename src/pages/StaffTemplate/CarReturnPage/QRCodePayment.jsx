import { useState, useEffect } from 'react';
import { vietQR } from '../../../services/vietqr.api';

export default function QRCodePayment({ amount, customerName, bookingId }) {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        const qrData = await vietQR.generatePaymentQR({
          acc: '1028624378', // Thay bằng số tài khoản thực tế
          bank: 'Vietcombank', // Thay bằng mã ngân hàng thực tế
          amount: amount,
          des: `Thanh toan ${bookingId || 'hop dong'}`,
          template: 'compact'
        });
        
        setQrUrl(qrData.qrUrl);
        setError(null);
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError('Không thể tạo mã QR. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    if (amount) {
      generateQR();
    }
  }, [amount, bookingId]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Thanh toán qua QR Code</h2>
      
      <div className="bg-gray-100 rounded-lg p-6 mb-4 inline-block">
        <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center border-4 border-gray-300">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-4">Đang tạo mã QR...</p>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : qrUrl ? (
            <img 
              src={qrUrl} 
              alt="QR Code Payment" 
              className="w-full h-full object-contain"
              onError={() => setError('Không thể tải ảnh QR code')}
            />
          ) : (
            <div className="text-center">
              <svg className="w-48 h-48 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-2v2h-2V5zm-10 8h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3z"/>
              </svg>
              <p className="text-sm text-gray-500 mt-4">QR Code thanh toán</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Khách hàng:</strong> {customerName}
        </p>
        <p className="text-gray-700">
          <strong>Số tiền cần thanh toán:</strong>
        </p>
        <p className="text-3xl font-bold text-red-600">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📱 Quét mã QR bằng ứng dụng ngân hàng để thanh toán
        </p>
      </div>
    </div>
  );
}