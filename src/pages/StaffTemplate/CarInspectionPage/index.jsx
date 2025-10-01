import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import CarInspectionHeader from './CarInspectionHeader';
import CarInspectionContent from './CarInspectionContent';
import CarInspectionSummary from './CarInspectionSummary';

export default function CarInspectionPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { carsData, getChecklistByCarId, getFlatChecklistByCarId, updateCar } = useCars();
  const { addActivity } = useActivities();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // dữ liệu kiểm tra xe
  const [inspectionData, setInspectionData] = useState({
    checklist: [],
    photos: [],
    notes: '',
    inspectionDate: new Date().toISOString()
  });

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState('');
  // load dữ liệu xe
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const car = carsData.getCarById(carId);
        if (car) {
          setCarData(car);
          setInspectionData(prev => ({
            ...prev,
            checklist: getFlatChecklistByCarId(carId)
          }));
        } else {
          setError(`Không tìm thấy xe có ID: ${carId}`);
        }
      } catch (err) {
        console.error('Error loading car:', err);
        setError('Có lỗi xảy ra khi tải thông tin xe');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [carId, carsData, getFlatChecklistByCarId]);
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
            timestamp: new Date().toLocaleString('vi-VN'),
            size: file.size
          };
          
          setPhotos(prev => [...prev, newPhoto]);
          setInspectionData(prev => ({
            ...prev,
            photos: [...prev.photos, newPhoto]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
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
  // xử lý lưu kết quả kiểm tra
  const handleSaveInspection = async () => {
    try {
      addActivity({
        type: 'inspection',
        title: `Đã kiểm tra xe ${carData.model} (${carData.licensePlate})`,
        customer: `${inspectionData.checklist.filter(i => i.status === 'minor_issue').length} vấn đề nhỏ`,
        icon: 'wrench',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      });
      
      alert(`Đã lưu kết quả kiểm tra xe ${carData.licensePlate} thành công!`);
      navigate('/staff/manage-cars');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu kết quả kiểm tra. Vui lòng thử lại.');
    }
  };

  const organizedChecklist = getChecklistByCarId(carId).map(category => ({
    ...category,
    items: category.items.map(templateItem => {
      const currentItem = inspectionData.checklist.find(item => item.id === templateItem.id);
      return currentItem || templateItem;
    })
  }));

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
          onClick={() => navigate('/staff/manage-cars')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
        onNavigateBack={() => navigate('/staff/manage-cars')}
      />
      <CarInspectionContent
        organizedChecklist={organizedChecklist}
        photos={photos}
        notes={notes}
        onStatusChange={handleStatusChange}
        onPhotoUpload={handlePhotoUpload}
        onRemovePhoto={removePhoto}
        onNotesChange={handleNotesChange}
      />
      <CarInspectionSummary
        inspectionData={inspectionData}
        photos={photos}
        onCancel={() => navigate('/staff/manage-cars')}
        onSave={handleSaveInspection}
      />
    </div>
  );
}