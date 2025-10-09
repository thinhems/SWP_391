import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import HeaderSection from './HeaderSection';  
import VehicleReturnInfo from './VehicleReturnInfo';
import VehicleInspectionForm from './VehicleInspectionForm';
import FeeCalculationSummary from './FeeCalculationSummary';
import QRCodePayment from './QRCodePayment';

export default function CarReturnPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { getOrderByCarId, updateCar } = useCars();
  const { addActivity } = useActivities();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [inspectionData, setInspectionData] = useState({
    currentBattery: 0,
    currentOdometer: 0,
    additionalFees: [],
    customFeeAmount: 0
  });

  // Load dữ liệu order
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const foundOrder = getOrderByCarId(carId);
        if (foundOrder && foundOrder.type === 'rented') {
          setOrder(foundOrder);
          setInspectionData({
            currentBattery: foundOrder.car.initialBattery,
            currentOdometer: foundOrder.car.initialOdometer,
            additionalFees: [],
            customFeeAmount: 0
          });
        } else {
          setError(`Không tìm thấy đơn thuê xe hoặc xe chưa được giao cho khách với ID: ${carId}`);
        }
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Có lỗi xảy ra khi tải thông tin đơn thuê');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [carId, getOrderByCarId]);
  // Xử lý thay đổi dữ liệu kiểm tra xe
  const handleInspectionDataChange = (data) => {
    setInspectionData(data);
  };
  // Tính toán số tiền cần thu hoặc hoàn trả
  const calculateNetAmount = () => {
    const kmDriven = inspectionData.currentOdometer - order.car.initialOdometer;
    const kmOverage = Math.max(0, kmDriven - order.rental.totalMaxKm);
    const kmOverageFee = kmOverage * order.rental.kmOverageFee;

    const batteryDeficit = Math.max(0, order.car.initialBattery - inspectionData.currentBattery);
    const batteryDeficitFee = batteryDeficit * order.rental.batteryDeficitFee;

    const additionalFeesTotal = inspectionData.additionalFees.reduce((sum, fee) => {
      if (fee.isCustom) {
        return sum + inspectionData.customFeeAmount;
      }
      return sum + fee.amount;
    }, 0);

    const totalFees = kmOverageFee + batteryDeficitFee + additionalFeesTotal;
    return order.rental.deposit - totalFees;
  };
  // Xử lý hoàn tất nhận xe trả
  const handleCompleteReturn = () => {
    const netAmount = calculateNetAmount();
    
    if (netAmount < 0) {
      setShowQRCode(true);
    } else {
      // Hoàn trả tiền cho khách hàng
      updateCar(carId, { 
        status: 'available',
        battery: inspectionData.currentBattery,
        location: 'Khu vực A - Vị trí 01'
      });
      
      addActivity({
        type: 'return',
        title: `Đã nhận xe trả ${order.car.model} (${order.car.licensePlate})`,
        customer: `Hoàn trả ${Math.abs(netAmount).toLocaleString()}đ cho ${order.customer.name}`,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(
        `Hoàn tất nhận xe trả!\n\n` +
        `Xe: ${order.car.licensePlate}\n` +
        `Khách hàng: ${order.customer.name}\n` +
        `Số tiền hoàn trả: ${Math.abs(netAmount).toLocaleString()} đ\n\n` +
        `Xe đã được cập nhật trạng thái về "Có sẵn".`
      );
      navigate('/staff/manage-cars?tab=rented');
    }
  };
  // xử lý xác nhận đã nhận thanh toán từ khách
  const handleConfirmPayment = () => {
    const netAmount = calculateNetAmount();
    
    updateCar(carId, { 
      status: 'available',
      battery: inspectionData.currentBattery,
      location: 'Khu vực A - Vị trí 01'
    });
    
    addActivity({
      type: 'return',
      title: `Đã nhận xe trả ${order.car.model} (${order.car.licensePlate})`,
      customer: `Thu thêm ${Math.abs(netAmount).toLocaleString()}đ từ ${order.customer.name}`,
      icon: 'check',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    });
    
    alert(
      `Xác nhận đã nhận thanh toán!\n\n` +
      `Xe: ${order.car.licensePlate}\n` +
      `Khách hàng: ${order.customer.name}\n` +
      `Số tiền đã thu: ${Math.abs(netAmount).toLocaleString()} đ\n\n` +
      `Xe đã được cập nhật trạng thái về "Có sẵn".`
    );
    navigate('/staff/manage-cars?tab=rented');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin đơn thuê...</p>
          <p className="text-gray-500 text-sm mt-1">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy đơn thuê xe</h2>
        <p className="text-gray-600 mb-4">{error || `Đơn thuê với xe ID "${carId}" không tồn tại hoặc xe chưa được giao.`}</p>
        <button
          onClick={() => navigate('/staff/manage-cars?tab=rented')}
          className="cursor-pointer mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <HeaderSection onNavigateBack={() => navigate('/staff/manage-cars?tab=rented')} />
      {!showQRCode ? (
        <>
          <VehicleReturnInfo order={order} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VehicleInspectionForm 
              order={order} 
              onDataChange={handleInspectionDataChange}
            />
            <FeeCalculationSummary 
              order={order} 
              inspectionData={inspectionData}
            />
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <button
              onClick={handleCompleteReturn}
              className="cursor-pointer w-full bg-purple-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Hoàn tất nhận xe trả</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <QRCodePayment 
            amount={Math.abs(calculateNetAmount())}
            customerName={order.customer.name}
          />
          <div className="text-center space-y-4">
            <button
              onClick={handleConfirmPayment}
              className="cursor-pointer bg-green-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Xác nhận đã nhận thanh toán
            </button>
            <button
              onClick={() => setShowQRCode(false)}
              className="cursor-pointer block mx-auto text-gray-600 hover:text-gray-800 underline"
            >
              Quay lại chỉnh sửa
            </button>
          </div>
        </>
      )}
    </div>
  );
}