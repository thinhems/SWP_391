import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import CustomerInfoSection from './CustomerInfoSection';
import CarInfoSection from './CarInfoSection';
import RentalInfoSection from './RentalInfoSection';
import ApprovalActionsSection from './ApprovalActionsSection';

export default function ApprovalReviewPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { getOrderByCarId, updateCar } = useCars();
  const { addActivity } = useActivities();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // load dữ liệu yêu cầu duyệt
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const request = getOrderByCarId(carId);
        if (request) {
          setRequestData(request);
        } else {
          setError(`Không tìm thấy yêu cầu duyệt cho xe có ID: ${carId}`);
        }
      } catch (err) {
        console.error('Error loading approval request:', err);
        setError('Có lỗi xảy ra khi tải thông tin yêu cầu');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [carId, getOrderByCarId]);
  // xử lý duyệt yêu cầu
  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      updateCar(carId, { status: 'pending_contract' });
      
      addActivity({
        type: 'approval',
        title: `Đã duyệt yêu cầu thuê xe ${requestData.car.model}`,
        customer: requestData.customer.name,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(`Đã duyệt yêu cầu thuê xe thành công!\n\nThông báo đã được gửi tới: ${requestData.customer.name}\nEmail: ${requestData.customer.email}\nSĐT: ${requestData.customer.phone}\n\nHợp đồng điện tử sẽ được tạo và gửi cho khách hàng trong vòng 5 phút.`);
      
      navigate('/staff/manage-cars');
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
      updateCar(carId, { status: 'available' });
      
      addActivity({
        type: 'rejection',
        title: `Đã từ chối yêu cầu thuê xe ${requestData.car.model}`,
        customer: requestData.customer.name,
        icon: 'clock',
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      });
      
      alert(`Đã từ chối yêu cầu thuê xe!\n\nLý do từ chối: ${reason}\n\nThông báo đã được gửi tới: ${requestData.customer.name}\nEmail: ${requestData.customer.email}\nSĐT: ${requestData.customer.phone}`);
      
      navigate('/staff/manage-cars');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Có lỗi xảy ra khi từ chối yêu cầu. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin yêu cầu duyệt...</p>
          <p className="text-gray-500 text-sm mt-1">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error || !requestData) {
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
          onClick={() => navigate('/staff/manage-cars')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duyệt yêu cầu thuê xe
            </h1>
            <div className="mt-2 flex items-center space-x-4">
              <p className="text-gray-600">
                Xe {requestData.car.model} - Biển số <span className="font-bold text-red-600">{requestData.car.licensePlate}</span>
              </p>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                Chờ duyệt
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/staff/manage-cars')}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isProcessing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại trang quản lý</span>
          </button>
        </div>
      </div>
      <CustomerInfoSection customer={requestData.customer} />
      <CarInfoSection car={requestData.car} />
      <RentalInfoSection 
        rental={requestData.rental}
        requestTime={requestData.requestTime}
        notes={requestData.notes}
      />
      <ApprovalActionsSection 
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
      {/* Footer info */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Yêu cầu từ: {new Date(requestData.requestTime).toLocaleString('vi-VN')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Đã xác minh giấy tờ</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 000-6m-9 6V9a9 9 0 019-9h6a9 9 0 019 9v6a9 9 0 01-9 9H9a9 9 0 01-9-9z" />
            </svg>
            <span>Xe sẵn sàng</span>
          </div>
        </div>
      </div>
    </div>
  );
}