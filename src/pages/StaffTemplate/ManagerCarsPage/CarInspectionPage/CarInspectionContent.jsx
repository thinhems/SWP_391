export default function CarInspectionContent({ 
  organizedChecklist, 
  onStatusChange, 
}) {
  // hàm lấy thông tin label và màu sắc cho status (1: Tốt, 2: Vấn đề nhỏ, 3: Cần sửa chữa)
  const getStatusLabel = (status) => {
    const labels = {
      1: { label: 'Tốt', color: 'text-green-600', bg: 'bg-green-100' },
      2: { label: 'Vấn đề nhỏ', color: 'text-yellow-600', bg: 'bg-yellow-100' },
      3: { label: 'Cần sửa chữa', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return labels[status] || labels[1];
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
              {category.categoryName}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => {
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <span className="text-gray-900 font-medium">{item.name}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {[1, 2, 3].map(status => {
                        const statusConfig = getStatusLabel(status);
                        return (
                          <label key={status} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`item-${item.id}`}
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
    </div>
  );
}