// src/pages/StaffTemplate/CustomerVerificationPage/VerificationActionsSection.jsx
import { useState } from 'react';

export default function VerificationActionsSection({ customer, onApprove, onReject, isProcessing }) {
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // format ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // xử lý duyệt khách hàng
  const handleApprove = () => {
    setShowApproveConfirm(true);
    setShowRejectForm(false);
  };

  const confirmApprove = async () => {
    setShowApproveConfirm(false);
    await onApprove();
  };

  // xử lý từ chối
  const handleReject = () => {
    setShowRejectForm(true);
    setShowApproveConfirm(false);
    setRejectReason('');
  };

  const confirmReject = async () => {
    const success = await onReject(rejectReason);
    if (success) {
      setShowRejectForm(false);
      setRejectReason('');
    }
  };

  const cancelAction = () => {
    setShowApproveConfirm(false);
    setShowRejectForm(false);
    setRejectReason('');
  };

  // nếu đã verified thì hiển thị thông báo
  if (customer.status === 'verified') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">Khách hàng đã được xác thực</h3>
            <p className="text-green-700 mt-1">
              Tài khoản này đã được xác thực vào ngày {formatDate(customer.registeredDate)}. 
              Khách hàng có thể sử dụng đầy đủ các dịch vụ của hệ thống.
            </p>
          </div>
        </div>
      </div>
    );
  }
  // nếu chưa verified thì hiển thị form duyệt/từ chối
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Quyết định xác thực
      </h2>
      {/* form xác nhận duyệt */}
      {showApproveConfirm && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div className="flex-1">
              <h4 className="font-semibold text-green-800 mb-2">Xác nhận duyệt khách hàng</h4>
              <p className="text-green-700 text-sm mb-4">
                Bạn có chắc chắn muốn duyệt tài khoản này? Khách hàng sẽ được xác thực và có thể sử dụng đầy đủ các dịch vụ.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmApprove}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isProcessing ? 'Đang xử lý...' : 'Xác nhận duyệt'}
                </button>
                <button
                  onClick={cancelAction}
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* form từ chối */}
      {showRejectForm && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="flex-1">
              <h4 className="font-semibold text-red-800 mb-2">Từ chối xác thực</h4>
              <p className="text-red-700 text-sm mb-4">
                Vui lòng nhập lý do từ chối để thông báo cho khách hàng
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do từ chối <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do từ chối xác thực khách hàng..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lý do này sẽ được gửi trực tiếp cho khách hàng
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={confirmReject}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isProcessing ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                </button>
                <button
                  onClick={cancelAction}
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* nút chính */}
      {!showApproveConfirm && !showRejectForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg font-semibold border transition-colors ${
              isProcessing
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-green-700 border-green-300 hover:bg-green-50 hover:border-green-400'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Duyệt khách hàng</span>
            </div>
          </button>

          <button
            onClick={handleReject}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg font-semibold border transition-colors ${
              isProcessing
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-red-700 border-red-300 hover:bg-red-50 hover:border-red-400'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Từ chối</span>
            </div>
          </button>
        </div>
      )}
      {/* thông tin quan trọng */}
      {!showApproveConfirm && !showRejectForm && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">Thông tin quan trọng</h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• <strong>Nếu duyệt:</strong> Khách hàng sẽ được xác thực và có thể sử dụng đầy đủ dịch vụ</li>
                <li>• <strong>Nếu từ chối:</strong> Khách hàng sẽ nhận thông báo kèm lý do từ chối</li>
                <li>• Quyết định này không thể hoàn tác sau khi thực hiện</li>
                <li>• Kiểm tra kỹ giấy tờ trước khi đưa ra quyết định</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}