import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCars } from '../../../data/mockCars';
import { listItemCar } from '../../../data/mockListItem';
import CarInspectionHeader from './CarInspectionHeader';
import CarInspectionContent from './CarInspectionContent';
import CarInspectionSummary from './CarInspectionSummary';

export default function CarInspectionPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // state cho inspection data
  const [inspectionData, setInspectionData] = useState({
    checklist: [],
    photos: [],
    notes: '',
    inspectionDate: new Date().toISOString()
  });

  // state cho photos
  const [photos, setPhotos] = useState([]);
  // state cho notes
  const [notes, setNotes] = useState('');

  // lấy thông tin xe theo carId
  const getCarById = (carId) => {
    return mockCars.find(car => car.id === carId);
  };

  // hàm lấy list category
  const getChecklistByCarId = (carId) => {
    return listItemCar[carId] || [];
  };

  // hàm lấy checklist và set lại thành 1 mảng phẳng
  const getFlatChecklistByCarId = (carId) => {
    const checklist = listItemCar[carId] || [];
    return checklist.flatMap(category => category.items);
  };

  // load dữ liệu
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const car = getCarById(carId);
        if (car) {
          setCarData(car);
          // Khởi tạo checklist
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
  }, [carId]);

  // xử lý cập nhật thông tin xe
  const handleCarDataUpdate = (updatedCarData) => {
    setCarData(updatedCarData);
  };

  // xử lý thay đổi status của item
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
            timestamp: new Date().toLocaleString('vi-VN'),
            size: file.size
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

  // lưu kết quả kiểm tra sẽ call api sau khi có backend
  const handleSaveInspection = async () => {
    try {
      // Hiển thị thông báo thành công
      alert(`Đã lưu kết quả kiểm tra xe ${carData.licensePlate} thành công!`);
      // Chuyển về trang quản lý xe
      navigate('/staff/manage-cars');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu kết quả kiểm tra. Vui lòng thử lại.');
    }
  };

  // tạo organized checklist từ inspectionData
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
      {/* header với thông tin xe và chỉnh sửa */}
      <CarInspectionHeader 
        carData={carData}
        carId={carId}
        onCarDataUpdate={handleCarDataUpdate}
        onNavigateBack={() => navigate('/staff/manage-cars')}
      />
      {/* chi tiết về xe */}
      <CarInspectionContent
        organizedChecklist={organizedChecklist}
        photos={photos}
        notes={notes}
        onStatusChange={handleStatusChange}
        onPhotoUpload={handlePhotoUpload}
        onRemovePhoto={removePhoto}
        onNotesChange={handleNotesChange}
      />
      {/* tóm tắt và nút lưu */}
      <CarInspectionSummary
        inspectionData={inspectionData}
        photos={photos}
        onCancel={() => navigate('/staff/manage-cars')}
        onSave={handleSaveInspection}
      />
    </div>
  );
}