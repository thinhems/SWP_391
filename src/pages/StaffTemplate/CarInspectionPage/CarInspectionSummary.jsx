import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faBolt, 
  faCheckCircle, 
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

export default function CarInspectionSummary({ inspectionData, onCancel, onSave }) {
  // tính toán thống kê
  const goodCount = inspectionData.checklist.filter(item => item.status === 'good').length;
  const minorIssueCount = inspectionData.checklist.filter(item => item.status === 'minor_issue').length;
  const majorIssueCount = inspectionData.checklist.filter(item => item.status === 'major_issue').length;
  const totalChecked = goodCount + minorIssueCount + majorIssueCount;
  const totalItems = inspectionData.checklist.length;

  // tính phần trăm hoàn thành
  const completionPercentage = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  // đánh giá tổng quan
  const getOverallStatus = () => {
    if (majorIssueCount > 0) {
      return { 
        label: 'Cần bảo trì', 
        color: 'text-red-600', 
        bg: 'bg-red-50',
        icon: faExclamationTriangle,
        iconColor: 'text-red-500'
      };
    } else if (minorIssueCount > 0) {
      return { 
        label: 'Tình trạng tốt', 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-50',
        icon: faBolt,
        iconColor: 'text-yellow-500'
      };
    } else if (goodCount === totalItems && totalItems > 0) {
      return { 
        label: 'Tình trạng xuất sắc', 
        color: 'text-green-600', 
        bg: 'bg-green-50',
        icon: faCheckCircle,
        iconColor: 'text-green-500'
      };
    } else {
      return { 
        label: 'Chưa hoàn thành', 
        color: 'text-gray-600', 
        bg: 'bg-gray-50',
        icon: faClipboardList,
        iconColor: 'text-gray-500'
      };
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* progress bar */}
      <div className="mb-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-800">Tiến độ kiểm tra</h4>
            <span className="text-blue-600 font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-blue-700 text-sm mt-2">
            Đã kiểm tra {totalChecked}/{totalItems} hạng mục
          </p>
        </div>
      </div>
      {/* tóm tắt kiểm tra */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Tóm tắt kiểm tra</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-3xl font-bold text-green-600">{goodCount}</div>
            <div className="text-green-600 font-medium text-sm">Tốt</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">{minorIssueCount}</div>
            <div className="text-yellow-600 font-medium text-sm">Vấn đề nhỏ</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-3xl font-bold text-red-600">{majorIssueCount}</div>
            <div className="text-red-600 font-medium text-sm">Cần sửa chữa</div>
          </div>
        </div>
      </div>
      {/* đánh giá tổng quan */}
      <div className={`p-4 border rounded-lg mb-6 ${overallStatus.bg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center ${overallStatus.iconColor}`}>
              <FontAwesomeIcon icon={overallStatus.icon} className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-semibold ${overallStatus.color}`}>
                Đánh giá tổng quan: {overallStatus.label}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {majorIssueCount > 0 && (
                  `${majorIssueCount} vấn đề nghiêm trọng cần được xử lý ngay.`
                )}
                {majorIssueCount === 0 && minorIssueCount > 0 && (
                  `${minorIssueCount} vấn đề nhỏ, xe vẫn có thể sử dụng bình thường.`
                )}
                {majorIssueCount === 0 && minorIssueCount === 0 && totalChecked === totalItems && totalItems > 0 && (
                  "Xe trong tình trạng hoàn hảo, sẵn sàng cho thuê."
                )}
                {totalChecked < totalItems && (
                  `Còn ${totalItems - totalChecked} hạng mục chưa được kiểm tra.`
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Hủy bỏ</span>
        </button>
        <button
          onClick={onSave}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Lưu kết quả kiểm tra</span>
        </button>
      </div>
    </div>
  );
}