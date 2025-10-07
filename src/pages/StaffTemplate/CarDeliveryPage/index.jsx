import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import ContractInfoStep from './ContractInfoStep';
import CarInspectionStep from './CarInspectionStep';
import ConfirmationStep from './ConfirmationStep';
import CompletionStep from './CompletionStep';

export default function CarDeliveryPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { getOrderByCarId, getChecklistByCarId, getFlatChecklistByCarId, updateCar } = useCars();
  const { addActivity } = useActivities();
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // dữ liệu kiểm tra xe
  const [inspectionData, setInspectionData] = useState({
    checklist: [],
    photos: [],
    notes: ''
  });

  const [isStaffExplanationConfirmed, setIsStaffExplanationConfirmed] = useState(false);
  // load dữ liệu hợp đồng
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const contract = getOrderByCarId(carId);
        if (contract) {
          setContractData(contract);
          setInspectionData({
            checklist: getFlatChecklistByCarId(carId),
            photos: [],
            notes: ''
          });
        } else {
          setError(`Không tìm thấy hợp đồng cho xe có ID: ${carId}`);
        }
      } catch (err) {
        console.error('Error loading contract:', err);
        setError('Có lỗi xảy ra khi tải thông tin hợp đồng');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [carId, getOrderByCarId, getFlatChecklistByCarId]);
  // các bước giao xe
  const steps = [
    { id: 1, title: 'Thông tin hợp đồng', desc: 'Xem thông tin chi tiết' },
    { id: 2, title: 'Kiểm tra xe', desc: 'Ghi nhận tình trạng' },
    { id: 3, title: 'Xác nhận', desc: 'Xác nhận lại thông tin' },
    { id: 4, title: 'Hoàn tất', desc: 'Bàn giao xe' }
  ];
  // chuyển đến bước tiếp theo
  const nextStep = () => {
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
        return isStaffExplanationConfirmed;
      default:
        return false;
    }
  };
  // hoàn tất bàn giao xe
  const handleCompleteDelivery = async () => {
    try {
      updateCar(carId, { status: 'rented' });
      
      addActivity({
        type: 'delivery',
        title: `Đã giao xe ${contractData.car.model} (${contractData.car.licensePlate})`,
        customer: contractData.customer.name,
        icon: 'car',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(`Bàn giao xe ${contractData.car.licensePlate} thành công! Xe đã chuyển sang trạng thái cho thuê.`);
      navigate('/staff/manage-cars');
    } catch (error) {
      console.error('Error completing delivery:', error);
      alert('Có lỗi xảy ra khi hoàn tất bàn giao. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin hợp đồng...</p>
          <p className="text-gray-500 text-sm mt-1">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error || !contractData) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy thông tin hợp đồng</h2>
        <p className="text-gray-600 mb-4">{error || `Hợp đồng với xe ID "${carId}" không tồn tại hoặc đã bị xóa.`}</p>
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thủ tục giao xe điện</h1>
            <div className="mt-1 flex items-center space-x-4">
              <p className="text-gray-600">
                Xe {contractData.car.model} - Biển số <span className="font-bold text-red-600">{contractData.car.licensePlate}</span>
              </p>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                ID: {carId}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/staff/manage-cars')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại trang quản lý</span>
          </button>
        </div>
        {/* thanh step */}
        <div className="relative flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center mx-4">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : currentStep === step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-green-600' : currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Step content */}
      <div className="min-h-96">
        {currentStep === 1 && (
          <ContractInfoStep contractData={contractData} />
        )}
        {currentStep === 2 && (
          <CarInspectionStep 
            inspectionData={inspectionData}
            setInspectionData={setInspectionData}
            carId={carId}
            getChecklistByCarId={getChecklistByCarId}
          />
        )}
        {currentStep === 3 && (
          <ConfirmationStep 
            contractData={contractData}
            inspectionData={inspectionData}
            isStaffExplanationConfirmed={isStaffExplanationConfirmed}
            setIsStaffExplanationConfirmed={setIsStaffExplanationConfirmed}
          />
        )}
        {currentStep === 4 && (
          <CompletionStep 
            contractData={contractData}
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
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
              {currentStep === 3 && "Cần xác nhận đã giải thích để tiếp tục"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}