import { useState, useEffect } from 'react';
import { vietQR } from '../../../services/vietqr.api';

export default function QRCodePayment({ amount, customerName, bookingId }) {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accountNumber = '1028624378';
  const bankName = 'Vietcombank';
  const accountHolder = 'MAI DUC TRONG'; // Thay bằng tên chủ tài khoản thực tế
  const transferContent = `THANH TOAN HD ${bookingId}`;

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        const qrData = await vietQR.generatePaymentQR({
          acc: accountNumber,
          bank: bankName,
          amount: amount,
          des: transferContent,
          template: ''
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Thanh toán qua QR Code</h2>
      
      {/* QR Code */}
      <div className="text-center">
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
      </div>

      {/* Thông tin thanh toán */}
      <div className="space-y-2 text-center mb-6">
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

      {/* Thông tin tài khoản */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Thông tin chuyển khoản
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Ngân hàng:</span>
            <span className="font-semibold text-gray-900">{bankName}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Chủ tài khoản:</span>
            <span className="font-semibold text-gray-900">{accountHolder}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Số tài khoản:</span>
            <span className="font-bold text-blue-600 text-lg">{accountNumber}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Nội dung CK:</span>
            <span className="font-semibold text-orange-600">{transferContent}</span>
          </div>
        </div>
      </div>

      {/* Hướng dẫn */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          📱 Quét mã QR bằng ứng dụng ngân hàng để thanh toán
        </p>
      </div>

      {/* Lưu ý quan trọng */}
      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-amber-800">
            <strong>Lưu ý:</strong> Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự động xác nhận thanh toán
          </p>
        </div>
      </div>
    </div>
  );
}