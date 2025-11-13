import { useState, useEffect } from 'react';
import { useCars } from '../../../contexts/CarsContext';
import { useSearchParams } from 'react-router-dom';
import { useStations } from '../../../contexts/StationsContext';
import modelsApi from '../../../services/models.api';
import vehicleService from '../../../services/vehicle.api';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListCarsSection';

export default function AdminManagerCarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'available');
  const { carsData, loading, refetchCars } = useCars();
  const { stations } = useStations();
  const [showAddModal, setShowAddModal] = useState(false);
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    modelId: '',
    stationId: '',
    location: '',
    plateNumber: '',
    batteryLevel: 100,
    odometer: 0,
    color: ''
  });

  // Fetch models khi mở modal
  useEffect(() => {
    if (showAddModal) {
      fetchModels();
    }
  }, [showAddModal]);

  const fetchModels = async () => {
    setLoadingModels(true);
    try {
      const result = await modelsApi.getAllModels();
      if (result.success) {
        setModels(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoadingModels(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await vehicleService.createVehicle({
        modelId: parseInt(formData.modelId),
        stationId: parseInt(formData.stationId),
        location: formData.location,
        plateNumber: formData.plateNumber,
        batteryLevel: parseInt(formData.batteryLevel),
        odometer: parseInt(formData.odometer),
        color: formData.color
      });

      // Success
      alert('Thêm xe thành công!');
      setShowAddModal(false);
      setFormData({
        modelId: '',
        stationId: '',
        location: '',
        plateNumber: '',
        batteryLevel: 100,
        odometer: 0,
        color: ''
      });
      
      // Refresh car list
      if (refetchCars) {
        refetchCars();
      }
    } catch (error) {
      console.error('Error creating vehicle:', error);
      alert('Có lỗi xảy ra khi thêm xe. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  // Xử lý đồng bộ tab với URL 
  useEffect(() => {
    if (tabFromUrl) {
      if (tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
      }
    } else {
      const tabToSet = activeTab || 'available';
      setSearchParams({ tab: tabToSet }, { replace: true });
    }
  }, [tabFromUrl]);

  // Phân loại xe theo trạng thái (giống Staff)
  const organizedCars = {
    available: carsData.getCarsByStatus(0),
    pending_approval: carsData.getCarsByStatus(1),
    pending_contract: carsData.getCarsByStatus(2),
    pending_handover: carsData.getCarsByStatus(3),
    rented: carsData.getCarsByStatus(4)
  };

  // Priority cho việc sắp xếp ưu tiên render xe chờ phê duyệt trước
  const priority = {
    pending_approval: 1,
    pending_contract: 2
  };

  // Lọc và sắp xếp xe theo tab
  const filteredCars = activeTab === 'pending_approval'
    ? [...organizedCars.pending_approval, ...organizedCars.pending_contract]
        .sort((a, b) => (priority[a.status] || 99) - (priority[b.status] || 99))
    : organizedCars[activeTab];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-gray-300"></div>
        <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Car Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý xe (Admin)</h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả xe trong hệ thống</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm xe
          </button>
        </div>
      </div>
      
      <StatsSection cars={organizedCars} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} cars={organizedCars} isAdmin={true} />
      <ListCarsSection cars={filteredCars} activeTab={activeTab} isAdmin={true} />

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Thêm xe mới</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Model Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model xe <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="modelId"
                    value={formData.modelId}
                    onChange={handleInputChange}
                    required
                    disabled={loadingModels}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Chọn model --</option>
                    {models.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.modelName} - {model.brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Station Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạm <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="stationId"
                    value={formData.stationId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Chọn trạm --</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.id}>
                        {station.name} - {station.location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vị trí <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập vị trí xe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Plate Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biển số xe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="plateNumber"
                    value={formData.plateNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="VD: 51F-123.45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Battery Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mức pin (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="batteryLevel"
                      value={formData.batteryLevel}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Odometer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số km đã đi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="odometer"
                      value={formData.odometer}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu sắc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                    placeholder="VD: Trắng, Đen, Xanh"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting || loadingModels}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang thêm...
                    </>
                  ) : (
                    'Thêm xe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
