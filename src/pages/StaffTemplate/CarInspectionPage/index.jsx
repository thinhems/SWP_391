import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import CarInspectionHeader from './CarInspectionHeader';
import CarImagesSection from './CarImagesSection';
import CarInspectionContent from './CarInspectionContent';
import CarInspectionSummary from './CarInspectionSummary';

export default function CarInspectionPage() {
  let { carId } = useParams();
  carId = parseInt(carId, 10);
  const navigate = useNavigate();
  const { updateCar, carsData, loading, updateCarInspectionItem, uploadCarImage, deleteCarImage } = useCars();
  const { addActivity } = useActivities();
  const [carData, setCarData] = useState(null);
  const [carImages, setCarImages] = useState([]);
  const [error, setError] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
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
      // Load ảnh nếu có và chuyển đổi base64 sang data URL
      if (data.images && Array.isArray(data.images)) {
        const processedImages = data.images.map(img => {
          return `data:image/jpeg;base64,${img}`;
        });
        setCarImages(processedImages);
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

  // xử lý xóa ảnh xe
  const handleRemoveCarImage = async (carId, base64Image) => {
    setLoadingImages(true); 
    try {
      // xóa chuỗi data:image/jpeg;base64
      let cleanBase64 = base64Image;
      if (base64Image.startsWith('data:')) {
        cleanBase64 = base64Image.split(',')[1];
      }
      await deleteCarImage(carId, cleanBase64);
      setCarImages(prev => prev.filter(img => img !== base64Image));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Có lỗi xảy ra khi xóa ảnh. Vui lòng thử lại.');
    } finally {
      setLoadingImages(false);
    } 
  };

  // xử lý upload ảnh xe mới
  const handleCarImageUpload = async (event) => {
    setLoadingImages(true); 
    const files = Array.from(event.target.files);
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          await uploadCarImage(carId, file);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.');
        } finally {   
          setLoadingImages(false);
        } 
      }
    }
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
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải thông tin xe...</p>
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
    <>
      {/* Loading overlay khi đang xử lý ảnh */}
      {loadingImages && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
            <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto space-y-6">
        <CarInspectionHeader 
          carData={carData}
          carId={carId}
          onCarDataUpdate={handleCarDataUpdate}
          onNavigateBack={() => navigate('/staff/manage-cars?tab=available')}
        />
        
        <CarImagesSection 
          carId={carId}
          carImages={carImages}
          onRemoveImage={handleRemoveCarImage}
          onUploadImage={handleCarImageUpload}
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
      </div>
    </>
  );
}