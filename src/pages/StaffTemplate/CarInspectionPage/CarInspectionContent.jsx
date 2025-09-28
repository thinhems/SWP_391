export default function CarInspectionContent({ 
  organizedChecklist, 
  photos, 
  notes, 
  onStatusChange, 
  onPhotoUpload, 
  onRemovePhoto, 
  onNotesChange 
}) {
  // hàm lấy thông tin label và màu sắc cho status
  const getStatusLabel = (status) => {
    const labels = {
      good: { label: 'Tốt', color: 'text-green-600', bg: 'bg-green-100' },
      minor_issue: { label: 'Vấn đề nhỏ', color: 'text-yellow-600', bg: 'bg-yellow-100' },
      major_issue: { label: 'Cần sửa chữa', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return labels[status] || labels.good;
  };

  // format kích thước file
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Chi tiết kiểm tra</h2>
        <p className="text-gray-600">Kiểm tra từng bộ phận và ghi nhận tình trạng chi tiết</p>
      </div>

      {/* checklist theo category */}
      <div className="space-y-8 mb-8">
        {organizedChecklist.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {categoryIndex + 1}
              </span>
              {category.category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => {
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <span className="text-gray-900 font-medium">{item.label}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {['good', 'minor_issue', 'major_issue'].map(status => {
                        const statusConfig = getStatusLabel(status);
                        return (
                          <label key={status} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={item.id}
                              value={status}
                              checked={item.status === status}
                              onChange={() => onStatusChange(item.id, status)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className={`ml-2 text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* upload ảnh */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ảnh chụp xe</h3>
        <p className="text-gray-600 mb-4">Chụp ảnh chi tiết các bộ phận của xe để lưu trữ và tham khảo</p>
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click để chọn ảnh</span> hoặc kéo thả
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
            </div>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={onPhotoUpload}
            />
          </label>
        </div>
        {/* hiển thị ảnh đã upload */}
        {photos.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Ảnh đã chụp ({photos.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={photo.preview} 
                    alt={photo.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onRemovePhoto(photo.id)}
                      className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 truncate">{photo.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{formatFileSize(photo.size)}</p>
                      <p className="text-xs text-gray-500">{photo.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-600 text-sm text-center">
              📷 Chưa có ảnh nào được upload. Khuyến nghị chụp ít nhất 6 ảnh để hoàn tất quy trình kiểm tra.
            </p>
          </div>
        )}
      </div>
      {/* ghi chú */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ghi chú kiểm tra</h3>
        <textarea
          value={notes}
          onChange={onNotesChange}
          placeholder="Ghi chú về tình trạng xe, các vấn đề phát hiện, đề xuất bảo trì..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-gray-500 text-sm mt-2">Ghi chú này sẽ được lưu trong hồ sơ xe</p>
        {/* Character counter */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">
            {notes.length === 0 ? (
              <span>💡 Tip: Ghi chú chi tiết giúp dễ dàng theo dõi lịch sử xe</span>
            ) : (
              <span>Đã nhập {notes.length} ký tự</span>
            )}
          </div>
          {notes.length > 500 && (
            <span className="text-yellow-600 text-sm">
              ⚠️ Ghi chú khá dài ({notes.length} ký tự)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}