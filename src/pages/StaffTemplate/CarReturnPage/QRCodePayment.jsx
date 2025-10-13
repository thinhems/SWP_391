export default function QRCodePayment({ amount, customerName }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Thanh toán qua QR Code</h2>
      
      <div className="bg-gray-100 rounded-lg p-6 mb-4 inline-block">
        <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center border-4 border-gray-300">
          <div className="text-center">
            <svg className="w-48 h-48 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-2v2h-2V5zm-10 8h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3z"/>
            </svg>
            <p className="text-sm text-gray-500 mt-4">QR Code thanh toán</p>
          </div>
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