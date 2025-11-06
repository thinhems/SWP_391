import { useState } from 'react';

export default function CarInspectionHeader({ 
  carData, 
  carId, 
  onCarDataUpdate, 
  onNavigateBack,
  onOpenReport
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    model: carData.model,
    licensePlate: carData.licensePlate,
    color: carData.color,
    year: carData.year,
    batteryLevel: carData.batteryLevel,
    location: carData.location
  });

  const handleEditToggle = () => {
    if (isEditing) {
      onCarDataUpdate({ ...carData, ...editData });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditData({
      model: carData.model,
      licensePlate: carData.licensePlate,
      color: carData.color,
      year: carData.year,
      batteryLevel: carData.batteryLevel,
      location: carData.location
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const checkYearCar = (nameCar) => { 
    if (nameCar === "VinFast VF 3" || nameCar === "VinFast VF 6") {
      return 2023;
    } else if (nameCar === "VinFast VF 7" || nameCar === "VinFast VF 9") {
      return 2022;
    } else if (nameCar === "VinFast VF 8") {
      return 2021;
    } else {
      return 2020;
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kiểm tra tình trạng xe</h1>
          <div className="mt-1 flex items-center space-x-4">
            <p className="text-gray-600">
              Xe {carData.modelName} - Biển số <span className="font-bold text-red-600">{carData.plateNumber}</span>
            </p>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              ID: {carId}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onOpenReport}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Báo cáo Admin</span>
          </button>
          <button
            onClick={onNavigateBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại trang quản lý</span>
          </button>
        </div>
      </div>

      {/* thông tin xe với input chỉnh sửa */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Thông tin xe</h2>
          <div className="flex space-x-2">
            {isEditing && (
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors text-sm cursor-pointer"
              >
                Hủy
              </button>
            )}
            <button
              onClick={handleEditToggle}
              className={`cursor-pointer px-3 py-1 rounded-lg transition-colors text-sm ${
                isEditing 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* model xe */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Model xe</label>
            <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{carData.modelName}</p>
          </div>
          {/* biển số */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Biển số xe</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="font-bold text-red-600 bg-gray-50 px-3 py-2 rounded-lg">{carData.plateNumber}</p>
            )}
          </div>
          {/* màu xe */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Màu xe</label>
            {isEditing ? (
              <select
                value={editData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Trắng">Trắng</option>
                <option value="Đen">Đen</option>
                <option value="Xanh">Xanh</option>
                <option value="Đỏ">Đỏ</option>
                <option value="Xám">Xám</option>
                <option value="Bạc">Bạc</option>
                <option value="Vàng">Vàng</option>
                <option value="Xanh dương">Xanh dương</option>
                <option value="Xanh lá">Xanh lá</option>
              </select>
            ) : (
              <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{carData.color}</p>
            )}
          </div>
          {/* năm sản xuất */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Năm sản xuất</label>
            <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{checkYearCar(carData.modelName)}</p>
          </div>
          {/* vị trí */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Vị trí đỗ xe</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{carData.location}</p>
            )}
          </div>
          {/* mức pin */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Mức pin hiện tại</label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editData.batteryLevel}
                  onChange={(e) => handleInputChange('batteryLevel', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span className="font-semibold text-lg text-gray-900">{editData.batteryLevelLevel}%</span>
                  <span>100%</span>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          carData.batteryLevel >= 80 ? 'bg-green-500' : 
                          carData.batteryLevel >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${carData.batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`font-bold text-lg ${
                    carData.batteryLevel >= 80 ? 'text-green-600' : 
                    carData.batteryLevel >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {carData.batteryLevel}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Lưu ý:</strong> Những thay đổi này chỉ áp dụng cho phiên kiểm tra hiện tại và sẽ được lưu cùng với kết quả kiểm tra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}