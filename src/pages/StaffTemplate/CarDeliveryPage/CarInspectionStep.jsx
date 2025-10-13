import { useState } from 'react';

export default function CarInspectionStep({ 
  inspectionData, 
  setInspectionData, 
  carId, 
  getChecklistByCarId 
}) {
  const [notes, setNotes] = useState(inspectionData.notes || '');

  // xử lý thay đổi ghi chú
  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    setInspectionData(prev => ({
      ...prev,
      notes: newNotes
    }));
  };

  // hàm lấy thông tin label và màu sắc cho status
  const getStatusConfig = (status) => {
    const configs = {
      good: { 
        label: 'Tốt', 
        icon: '✓',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50'
      },
      minor_issue: { 
        label: 'Vấn đề nhỏ', 
        icon: '!',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-50'
      },
      major_issue: { 
        label: 'Cần sửa chữa', 
        icon: '×',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50'
      }
    };
    return configs[status] || configs.good;
  };

  // tạo 1 mảng list category với items được cập nhật liên tục từ inspectionData.checklist
  const organizedChecklist = getChecklistByCarId(carId).map(category => ({
    ...category,
    items: category.items.map(templateItem => {
      // Tìm item tương ứng trong inspectionData.checklist
      const currentItem = inspectionData.checklist.find(item => item.id === templateItem.id);
      return currentItem || templateItem;
    })
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Tình trạng xe</h2>
        <p className="text-sm text-gray-600">Kiểm tra chi tiết tình trạng từng bộ phận của xe</p>
      </div>

      {/* list ra từng category */}
      <div className="space-y-6">
        {organizedChecklist.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {category.category}
            </h3>
            {/* list ra từng items - CHỈ HIỂN THỊ */}
            <div className="space-y-2">
              {category.items.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                return (
                  <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-100">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                      <span>{statusConfig.icon}</span>
                      <span>{statusConfig.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Thống kê tổng quan */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Tóm tắt:</h4>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="text-green-700">✓</span>
            <span className="text-sm text-gray-600">Tốt:</span>
            <span className="text-sm font-semibold text-gray-900">
              {inspectionData.checklist.filter(item => item.status === 'good').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-700">!</span>
            <span className="text-sm text-gray-600">Vấn đề nhỏ:</span>
            <span className="text-sm font-semibold text-gray-900">
              {inspectionData.checklist.filter(item => item.status === 'minor_issue').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-700">×</span>
            <span className="text-sm text-gray-600">Cần sửa:</span>
            <span className="text-sm font-semibold text-gray-900">
              {inspectionData.checklist.filter(item => item.status === 'major_issue').length}
            </span>
          </div>
        </div>
      </div>
      {/* ghi chú */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ghi chú bổ sung
        </label>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Thêm ghi chú về tình trạng xe (tùy chọn)..."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}