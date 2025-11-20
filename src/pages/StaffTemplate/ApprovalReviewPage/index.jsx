import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import HeaderSection from './HeaderSection';  
import CustomerInfoSection from './CustomerInfoSection';
import CarInfoSection from './CarInfoSection';
import RentalInfoSection from './RentalInfoSection';
import ApprovalActionsSection from './ApprovalActionsSection';

export default function ApprovalReviewPage() {
  let { carId } = useParams();
  carId = parseInt(carId, 10);
  const navigate = useNavigate();
  const { autoUpdateStatusCar, rejectCarApproval, carsData, loading } = useCars();
  const { addActivity } = useActivities();
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // load dữ liệu yêu cầu duyệt từ filter car context
  useEffect(() => {
    const loadData = async () => {
      setError(null);
      try {
        const data = carsData.getCarById(carId);
        if (!data) {
          setError(`Không tìm thấy yêu cầu duyệt cho xe có ID: ${carId}`);
          return;
        }
        if (data.status !== 1) {
          setError("Yêu cầu duyệt không còn hợp lệ (xe không ở trạng thái chờ duyệt)."); 
        }
        setCarData(data);
      } catch (err) {
        console.error('Error loading approval request:', err);
        setError('Có lỗi xảy ra khi tải thông tin yêu cầu');
      }
    };
    
    loadData();
  }, [carId, carsData]);
  // xử lý duyệt yêu cầu
  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await autoUpdateStatusCar(carId); // Cập nhật trạng thái xe về pending_contract (2)
      
      addActivity({
        type: 'approval',
        title: `Đã duyệt yêu cầu thuê xe ${carData.modelName}`,
        customer: carData.customer.fullName,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(`Đã duyệt yêu cầu thuê xe thành công!\n\nThông báo đã được gửi tới: ${carData.customer.fullName}\nEmail: ${carData.customer.email}\nSĐT: ${carData.customer.phone}\n\nHợp đồng điện tử sẽ được tạo và gửi cho khách hàng trong vòng 5 phút.`);
      
      navigate('/staff/manage-cars?tab=pending_approval'); 
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Có lỗi xảy ra khi duyệt yêu cầu. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };
  // xử lý từ chối yêu cầu
  const handleReject = async (reason) => {
    setIsProcessing(true);
    try {
      await rejectCarApproval(carId); // Từ chối yêu cầu thuê xe
      addActivity({
        type: 'rejection',
        title: `Đã từ chối yêu cầu thuê xe ${carData.modelName}`,
        customer: carData.customer.fullName,
        icon: 'clock',
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      });
      
      alert(`Đã từ chối yêu cầu thuê xe!\n\nLý do từ chối: ${reason}\n\nThông báo đã được gửi tới: ${carData.customer.fullName}\nEmail: ${carData.customer.email}\nSĐT: ${carData.customer.phone}`);

      navigate('/staff/manage-cars?tab=pending_approval');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Có lỗi xảy ra khi từ chối yêu cầu. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải thông tin yêu cầu duyệt...</p>
          <p className="text-gray-500 text-sm mt-1">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error || !carData ) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy yêu cầu duyệt</h2>
        <p className="text-gray-600 mb-4">{error || `Yêu cầu duyệt với xe ID "${carId}" không tồn tại hoặc đã bị xóa.`}</p>
        <button
          onClick={() => navigate('/staff/manage-cars?tab=pending_approval')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <HeaderSection
        carData={carData}
        isProcessing={isProcessing}
        onNavigateBack={() => navigate('/staff/manage-cars?tab=pending_approval')}
      />
      <CustomerInfoSection customer={carData?.customer} />
      <CarInfoSection car={carData} />
      <RentalInfoSection 
        carData={carData}
      />
      <ApprovalActionsSection 
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </div>
  );
}