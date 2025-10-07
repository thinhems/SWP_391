import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
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
      navigate('/staff/manage-cars');
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
    navigate('/staff/manage-cars');
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
          onClick={() => navigate('/staff/manage-cars')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Nhận xe trả - Thanh toán
            </h1>
            <p className="text-gray-600 mt-2">
              Kiểm tra xe và tính toán các khoản phí khi khách hàng trả xe
            </p>
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
      </div>

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
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
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
              className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Xác nhận đã nhận thanh toán
            </button>
            <button
              onClick={() => setShowQRCode(false)}
              className="block mx-auto text-gray-600 hover:text-gray-800 underline"
            >
              Quay lại chỉnh sửa
            </button>
          </div>
        </>
      )}
    </div>
  );
}