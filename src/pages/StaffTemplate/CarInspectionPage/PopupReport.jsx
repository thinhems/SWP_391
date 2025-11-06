import React from 'react';

export default function PopupReport({ 
  isOpen, 
  onClose, 
  carData, 
  reportContent, 
  setReportContent, 
  onSubmit 
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Báo cáo Admin</h3>
              <p className="text-sm text-gray-600">Gửi báo cáo về vấn đề xe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* content */}
        <div className="p-6 space-y-4">
          {/* car info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Thông tin xe</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Xe:</span> {carData?.modelName}</p>
              <p><span className="font-medium">Biển số:</span> {carData?.plateNumber}</p>
              <p><span className="font-medium">Vị trí:</span> {carData?.location}</p>
            </div>
          </div>
          {/* peport Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung báo cáo <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Mô tả chi tiết vấn đề cần báo cáo cho Admin..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Tối thiểu 5 ký tự ({reportContent.length}/5)
            </p>
          </div>
        </div>
        {/* footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onSubmit}
            disabled={reportContent.length < 5}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Gửi báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}