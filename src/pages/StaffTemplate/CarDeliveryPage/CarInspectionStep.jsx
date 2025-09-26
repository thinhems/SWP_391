import { useState } from 'react';

export default function CarInspectionStep({ 
  inspectionData, 
  setInspectionData, 
  carId, 
  getChecklistByCarId 
}) {
  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState(inspectionData.notes || '');

  // cập nhật lại trạng thái của xe khi thay đổi
  const handleStatusChange = (itemId, newStatus) => {
    setInspectionData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    }));
  };

  // xử lý upload ảnh
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
            timestamp: new Date().toLocaleString('vi-VN')
          };
          
          setPhotos(prev => [...prev, newPhoto]);
          
          // cập nhật photos vào inspectionData
          setInspectionData(prev => ({
            ...prev,
            photos: [...prev.photos, newPhoto]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // xóa ảnh
  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    // Cập nhật photos trong inspectionData
    setInspectionData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

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
  const getStatusLabel = (status) => {
    const labels = {
      good: { label: 'Tốt', color: 'text-green-600', bg: 'bg-green-100' },
      minor_issue: { label: 'Vấn đề nhỏ', color: 'text-yellow-600', bg: 'bg-yellow-100' },
      major_issue: { label: 'Cần sửa chữa', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return labels[status] || labels.good;
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
  // console.log('organizedChecklist', organizedChecklist);
  // console.log('inspectionData', inspectionData);
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kiểm tra tình trạng xe</h2>
        <p className="text-gray-600">Thực hiện kiểm tra chi tiết trước mặt khách hàng và ghi nhận tình trạng</p>
      </div>

      {/* list ra từng category */}
      <div className="space-y-8">
        {organizedChecklist.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {categoryIndex + 1}
              </span>
              {category.category}
            </h3>
            {/* list ra từng items */}
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
                              onChange={() => handleStatusChange(item.id, status)}
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
      <div className="mt-8 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ảnh chụp xe tại thời điểm bàn giao</h3>
        <p className="text-gray-600 mb-4">Cần chụp ít nhất: 4 ảnh ngoại thất + 1 ảnh nội thất + 1 ảnh màn hình hiển thị pin</p>
        
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click để chọn ảnh</span> hoặc kéo thả
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* hiển thị ảnh đã upload */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <img 
                  src={photo.preview} 
                  alt={photo.name}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{photo.timestamp}</p>
              </div>
            ))}
          </div>
        )}

        {photos.length < 6 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ Khuyến nghị chụp đủ {6 - photos.length} ảnh nữa để hoàn tất quy trình
            </p>
          </div>
        )}
      </div>

      {/* ghi chú */}
      <div className="mt-6 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ghi chú bổ sung</h3>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Ghi chú thêm về tình trạng xe, vấn đề phát hiện, hoặc lưu ý đặc biệt..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-gray-500 text-sm mt-2">Ghi chú này sẽ được lưu vào hợp đồng và hiển thị khi trả xe</p>
      </div>

      {/* tóm tắt kiểm tra */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Tóm tắt kiểm tra:</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {inspectionData.checklist.filter(item => item.status === 'good').length}
            </div>
            <div className="text-green-600 font-medium text-sm">Tốt</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-600">
              {inspectionData.checklist.filter(item => item.status === 'minor_issue').length}
            </div>
            <div className="text-yellow-600 font-medium text-sm">Vấn đề nhỏ</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-red-600">
              {inspectionData.checklist.filter(item => item.status === 'major_issue').length}
            </div>
            <div className="text-red-600 font-medium text-sm">Cần sửa chữa</div>
          </div>
        </div>
      </div>
    </div>
  );
}