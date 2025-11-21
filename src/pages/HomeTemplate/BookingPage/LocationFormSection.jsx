import { useState, useEffect } from 'react';
import { useStations } from '../../../contexts/StationsContext';
import modelsApi from '../../../services/models.api';

export default function LocationFormSection({ carModel, selectedLocation, onStationChange, availableCount }) {
  const { stations, loading: stationsLoading } = useStations();
  const [actualAvailableCount, setActualAvailableCount] = useState(availableCount);
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const isOutOfStock = actualAvailableCount === 0;

  // Fetch số xe khả dụng khi chọn trạm
  useEffect(() => {
    const fetchAvailableQuantity = async () => {
      if (!selectedLocation || !carModel?.id) {
        setActualAvailableCount(0);
        return;
      }

      // Tìm station ID từ tên trạm
      const selectedStation = stations.find(s => s.name === selectedLocation);
      if (!selectedStation) {
        setActualAvailableCount(0);
        return;
      }

      setLoadingQuantity(true);
      try {
        const result = await modelsApi.getAvailableQuantityByStation(selectedStation.id);
        console.log('API Response:', result);
        console.log('Station ID:', selectedStation.id);
        console.log('Looking for Model ID:', carModel.id);
        
        if (result.success && result.data) {
          console.log('API Data:', result.data);
          
          // Kiểm tra nếu data là object với modelId làm key
          if (typeof result.data === 'object' && !Array.isArray(result.data)) {
            // Format: { modelId: quantity }
            const quantity = result.data[carModel.id];
            console.log('Found quantity (object format):', quantity);
            setActualAvailableCount(quantity ?? 0);
          } else if (Array.isArray(result.data)) {
            // Format: [{ id: ..., availableQuantity: ... }]
            const modelData = result.data.find(m => m.id === carModel.id);
            console.log('Found model data (array format):', modelData);
            setActualAvailableCount(modelData?.availableQuantity ?? modelData?.quantity ?? 0);
          } else {
            // Trường hợp khác, thử dùng trực tiếp
            console.log('Direct data:', result.data);
            setActualAvailableCount(result.data ?? 0);
          }
        } else {
          console.log('API failed or no data');
          setActualAvailableCount(0);
        }
      } catch (error) {
        console.error('Error fetching available quantity:', error);
        setActualAvailableCount(0);
      } finally {
        setLoadingQuantity(false);
      }
    };

    fetchAvailableQuantity();
  }, [selectedLocation, carModel?.id, stations]);
  
  const displayCount = loadingQuantity ? '...' : actualAvailableCount;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Chọn điểm thuê xe</h3>
      <div className="bg-white shadow-lg border border-gray-200 p-6">
        {/* Lựa chọn địa điểm */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Điểm thuê xe
          </label>
          <select
            value={selectedLocation || ''}
            onChange={(e) => onStationChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
            disabled={stationsLoading}
          >
            {stationsLoading ? (
              <option value="">Đang tải danh sách điểm thuê...</option>
            ) : (
              <>
                <option value="">Chọn điểm thuê xe</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        {/* Trạng thái có sẵn */}
        {selectedLocation && (
          <div className={`p-4 rounded-lg mb-6 ${isOutOfStock ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center">
              {loadingQuantity ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-500 mr-3"></div>
                  <span className="font-medium text-gray-700">Đang kiểm tra số lượng xe...</span>
                </>
              ) : (
                <>
                  <div className={`w-3 h-3 rounded-full mr-3 ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span className={`font-medium ${isOutOfStock ? 'text-red-700' : 'text-green-700'}`}>
                    {isOutOfStock 
                      ? 'Không có xe khả dụng tại điểm này'
                      : `Còn ${displayCount} xe khả dụng tại ${selectedLocation}`
                    }
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        {/* Hiển thị giá */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Bảng giá thuê xe</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo ngày:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.daily.toLocaleString('vi-VN')} VNĐ/ngày
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo tuần:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.weekly.toLocaleString('vi-VN')} VNĐ/tuần
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Theo tháng:</span>
              <span className="font-semibold text-green-600">
                {carModel.price.monthly.toLocaleString('vi-VN')} VNĐ/tháng
              </span>
            </div>
          </div>
        </div>
        {/* Thông tin bổ sung */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h6 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng:</h6>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Cần có bằng lái xe hợp lệ khi thuê</li>
            <li>• Thanh toán tiền cọc và tiền thuê khi nhận xe</li>
            <li>• Yêu cầu thuê xe sẽ được duyệt trước 24h</li>
            <li>• Mọi thắc mắc xin liên hệ tổng đài hỗ trợ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
