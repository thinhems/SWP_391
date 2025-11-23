import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useBookings } from '../../../../contexts/BookingsContext';
import { useActivities } from '../../../../contexts/ActivitiesContext';
import HeaderSection from './HeaderSection';  
import ContractInfoStep from './ContractInfoStep';
import CarInspectionStep from './CarInspectionStep';
import ConfirmationStep from './ConfirmationStep';
import CompletionStep from './CompletionStep';

export default function ContractHandoverPage() {
  const { bookingId } = useParams();
  const bookingIdNum = parseInt(bookingId, 10);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookingsData, loading, createHandover } = useBookings();
  const { addActivity } = useActivities();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  // dữ liệu kiểm tra xe
  const [inspectionData, setInspectionData] = useState({
    checklist: []
  });
  // state kiểm tra đã xác nhận giải thích với khách hàng chưa
  const [isStaffExplanationConfirmed, setIsStaffExplanationConfirmed] = useState(false);
  // state kiểm tra khách hàng đã xác nhận hợp đồng chưa
  const [isCustomerConfirmed, setIsCustomerConfirmed] = useState(false);

  // load dữ liệu booking từ BookingsContext
  useEffect(() => {
    const loadData = async () => {
      setError(null);
      try {
        const data = bookingsData.getBookingById(bookingIdNum);
        if (!data) {
          setError(`Không tìm thấy booking có ID: ${bookingIdNum}`);
          return;
        }
        if (data.status !== 3) {
          setError("Booking không ở trạng thái chờ bàn giao.");
        }
        setBookingData(data);
        // lọc ra thành 1 list item theo category từ vehicle
        const flatChecklist = data.vehicle?.categories?.flatMap(category =>
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
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setError(`Không tìm thấy booking có ID: ${bookingIdNum}`);
      }
    };
    
    loadData();
  }, [bookingIdNum, bookingsData]);
  // các bước giao xe
  const steps = [
    { id: 1, title: 'Thông tin hợp đồng', desc: 'Xem thông tin chi tiết' },
    { id: 2, title: 'Kiểm tra xe', desc: 'Ghi nhận tình trạng' },
    { id: 3, title: 'Xác nhận', desc: 'Xác nhận lại thông tin' },
    { id: 4, title: 'Hoàn tất', desc: 'Bàn giao xe' }
  ];
  // chuyển đến bước tiếp theo
  const nextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };
  // quay lại bước trước
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  // kiểm tra có thể chuyển bước tiếp theo không
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return isStaffExplanationConfirmed && isCustomerConfirmed;
      default:
        return false;
    }
  };
  // hoàn tất bàn giao xe
  const handleCompleteDelivery = async () => {
    try {
      const handoverData = {
        bookingID: bookingData?.id || 0,
        staffID: user?.id || 0,
        description: "Hoàn tất bàn giao xe"
      };
      
      await createHandover(handoverData);
      
      addActivity({
        type: 'delivery',
        title: `Đã giao xe ${bookingData.vehicle?.modelName} (${bookingData.vehicle?.plateNumber})`,
        customer: bookingData.customer?.fullName,
        icon: 'car',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(`Bàn giao xe ${bookingData.vehicle?.plateNumber} thành công! Xe đã chuyển sang trạng thái cho thuê.`);
      navigate('/staff/manage-rentals?tab=pending_handover');
    } catch (error) {
      console.error('Error completing delivery:', error);
      alert('Có lỗi xảy ra khi hoàn tất bàn giao. Vui lòng thử lại.');
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
          <p className="text-lg font-semibold text-gray-800">Đang tải thông tin booking...</p>
          <p className="text-gray-500 text-sm mt-1">Booking ID: {bookingIdNum}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy thông tin booking</h2>
        <p className="text-gray-600 mb-4">{error || `Booking với ID "${bookingIdNum}" không tồn tại hoặc đã bị xóa.`}</p>
        <button
          onClick={() => navigate('/staff/manage-bookings?tab=pending_handover')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Quay lại danh sách booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <HeaderSection 
        carData={bookingData?.vehicle}
        bookingId={bookingIdNum}
        currentStep={currentStep}
        steps={steps}
        onNavigateBack={() => navigate('/staff/manage-bookings?tab=pending_handover')}
      />  
      {/* Step content */}
      <div className="min-h-96">
        {currentStep === 1 && (
          <ContractInfoStep
            bookingData={bookingData}
          />
        )}
        {currentStep === 2 && (
          <CarInspectionStep 
            inspectionData={inspectionData}
            setInspectionData={setInspectionData}
            categories={bookingData?.vehicle?.categories || []}
          />
        )}
        {currentStep === 3 && (
          <ConfirmationStep 
            bookingData={bookingData}
            inspectionData={inspectionData}
            isStaffExplanationConfirmed={isStaffExplanationConfirmed}
            setIsStaffExplanationConfirmed={setIsStaffExplanationConfirmed}
            isCustomerConfirmed={isCustomerConfirmed}
            setIsCustomerConfirmed={setIsCustomerConfirmed}
          />
        )}
        {currentStep === 4 && (
          <CompletionStep 
            bookingData={bookingData}
            inspectionData={inspectionData}
            onCompleteDelivery={handleCompleteDelivery}
          />
        )}
      </div>
      {/* Navigation buttons */}
      {currentStep < 4 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Quay lại</span>
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Bước {currentStep} / {steps.length}
              </p>
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                canProceedToNextStep()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>
                {currentStep === 3 ? 'Hoàn tất kiểm tra' : 'Tiếp tục'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {currentStep === 1 && "Kiểm tra kỹ thông tin hợp đồng trước khi tiếp tục"}
              {currentStep === 2 && "Thực hiện kiểm tra chi tiết tình trạng xe và chụp ảnh làm bằng chứng"}
              {currentStep === 3 && "Cần xác nhận từ cả nhân viên và khách hàng để tiếp tục"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}