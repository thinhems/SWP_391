import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import CarInspectionHeader from './CarInspectionHeader';
import CarImagesSection from './CarImagesSection';
import CarInspectionContent from './CarInspectionContent';
import CarInspectionSummary from './CarInspectionSummary';
import PopupReport from './PopupReport';

export default function CarInspectionPage() {
  let { carId } = useParams();
  carId = parseInt(carId, 10);
  const navigate = useNavigate();
  const { updateCar, carsData, loading, updateCarInspectionItem } = useCars();
  const { addActivity } = useActivities();
  const [carData, setCarData] = useState(null);
  const [carImages, setCarImages] = useState([]);
  const [error, setError] = useState(null);
  // State cho report modal
  const [showPopupReport, setShowPopupReport] = useState(false);
  const [reportContent, setReportContent] = useState('');
  // dữ liệu kiểm tra xe
  const [inspectionData, setInspectionData] = useState({
    checklist: [],
    inspectionDate: new Date().toISOString()
  });
  // load dữ liệu xe filter context
  useEffect(() => {
    const loadData = async () => {
      setError(null);
      const data = carsData.getCarById(carId);
      if (!data) {
        setError(`Không tìm thấy xe có ID: ${carId}`);
        return;
      }
      if (data.status !== 0) {
          setError("Yêu cầu duyệt không còn hợp lệ (xe không ở trạng thái có sẵn)."); 
        }
      setCarData(data);
      // Load ảnh nếu có
      if (data.images) {
        setCarImages(data.images);
      }
      // lọc ra thành 1 list item theo category
      const flatChecklist = data.categories?.flatMap(category =>
        category.items.map(item => ({
          ...item,
          categoryName: category.categoryName
        }))
      ) || [];
      // cập nhật dữ liệu kiểm tra xe
      setInspectionData(prev => ({
        ...prev,
        checklist: flatChecklist
      }));
    };
    
    loadData();
  }, [carId, carsData]);
  
  // xử lý cập nhật dữ liệu xe
  const handleCarDataUpdate = (updatedCarData) => {
    setCarData(updatedCarData);
    updateCar(carId, updatedCarData);
  };
  
  // xử lý thay đổi trạng thái kiểm tra
  const handleStatusChange = (itemId, newStatus) => {
    setInspectionData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    }));
  };
  
  // xử lý lưu kết quả kiểm tra
  const handleSaveInspection = async () => {
    try {
      // Chuẩn bị dữ liệu theo format API yêu cầu
      const dataToSend = {
        vehicleID: carId,
        categories: organizedChecklist.map(category => ({
          categoryName: category.categoryName,
          items: category.items.map(item => ({
            id: item.id,
            name: item.name,
            status: item.status
          }))
        }))
      };
      
      await updateCarInspectionItem(carId, dataToSend);
      addActivity({
        type: 'inspection',
        title: `Đã kiểm tra xe ${carData.modelName} (${carData.plateNumber})`,
        customer: `${inspectionData.checklist.filter(i => i.status === 2 || i.status === 3).length} vấn đề`,
        icon: 'wrench',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      });
      
      alert(`Đã lưu kết quả kiểm tra xe ${carData.plateNumber} thành công!`);
      navigate('/staff/manage-cars?tab=available');
    } catch (error) {
      console.error('Error saving inspection data:', error);
      console.error('Error response:', error.response?.data);
      alert('Có lỗi xảy ra khi lưu kết quả kiểm tra. Vui lòng thử lại.');
    }
  };
  
  // xử lý gửi báo cáo
  const handleSubmitReport = () => {
    try {
      addActivity({
        type: 'report',
        title: `Báo cáo xe ${carData.modelName} (${carData.plateNumber})`,
        customer: reportContent.substring(0, 50) + '...',
        icon: 'bell',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100'
      });
      
      alert(`Đã gửi báo cáo cho Admin!\n\nXe: ${carData.modelName} (${carData.plateNumber})\nNội dung: ${reportContent}`);
      setShowPopupReport(false);
      setReportContent('');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.');
    }
  };
  
  // Tổ chức checklist từ dữ liệu API
  const organizedChecklist = carData?.categories?.map(category => ({
    ...category,
    items: category.items.map(item => {
      const currentItem = inspectionData.checklist.find(checkItem => checkItem.id === item.id);
      return currentItem || item;
    })
  })) || [];
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin xe...</p>
          <p className="text-gray-500 text-sm mt-1">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error || !carData) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy thông tin xe</h2>
        <p className="text-gray-600 mb-4">{error || `Xe với ID "${carId}" không tồn tại.`}</p>
        <button
          onClick={() => navigate('/staff/manage-cars?tab=available')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <CarInspectionHeader 
        carData={carData}
        carId={carId}
        onCarDataUpdate={handleCarDataUpdate}
        onNavigateBack={() => navigate('/staff/manage-cars?tab=available')}
        onOpenReport={() => setShowPopupReport(true)}
      />
      
      <CarImagesSection 
        carImages={carImages}
        setCarImages={setCarImages}
      />
      
      <CarInspectionContent
        organizedChecklist={organizedChecklist}
        onStatusChange={handleStatusChange}
      />
      
      <CarInspectionSummary
        inspectionData={inspectionData}
        onCancel={() => navigate('/staff/manage-cars?tab=available')}
        onSave={handleSaveInspection}
      />
      
      <PopupReport
        isOpen={showPopupReport}
        onClose={() => setShowPopupReport(false)}
        carData={carData}
        reportContent={reportContent}
        setReportContent={setReportContent}
        onSubmit={handleSubmitReport}
      />
    </div>
  );
}