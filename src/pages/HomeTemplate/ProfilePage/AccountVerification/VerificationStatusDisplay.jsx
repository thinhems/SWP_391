import React from 'react';

const VerificationStatusDisplay = ({ status }) => {
  // hiển thị trạng thái đã xác thực
  const renderVerifiedStatus = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Tài khoản đã được xác thực</h3>
      <p className="text-gray-600 text-lg mb-6">
        Chúc mừng! Tài khoản của bạn đã được xác thực thành công.
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center text-green-800">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Bạn có thể sử dụng đầy đủ các tính năng</span>
        </div>
      </div>
    </div>
  );
  // hiển thị trạng thái đang chờ xác thực
  const renderPendingStatus = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-14 h-14 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Đang chờ xác thực</h3>
      <p className="text-gray-600 text-lg mb-6">
        Yêu cầu xác thực của bạn đang được xem xét.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-yellow-800 space-y-2">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Thời gian xử lý: 2-3 ngày làm việc</span>
          </div>
          <p className="text-sm">
            Chúng tôi sẽ thông báo qua cuộc gọi khi quá trình xác thực hoàn tất.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {status === 'verified' && renderVerifiedStatus()}
      {status === 'pending' && renderPendingStatus()}
    </>
  );
};

export default VerificationStatusDisplay;