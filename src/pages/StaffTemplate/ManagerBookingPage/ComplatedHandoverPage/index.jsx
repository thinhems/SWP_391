import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from '../../../../contexts/BookingsContext';
import { useActivities } from '../../../../contexts/ActivitiesContext';
import HeaderSection from './HeaderSection';  
import VehicleReturnInfo from './VehicleReturnInfo';
import VehicleInspectionForm from './VehicleInspectionForm';
import FeeCalculationSummary from './FeeCalculationSummary';
import QRCodePayment from './QRCodePayment';

export default function ComplatedHandoverPage() {
  const { bookingId } = useParams();
  const bookingIdNum = parseInt(bookingId, 10);
  const navigate = useNavigate();
  const { bookingsData, loading, autoUpdateStatusBooking } = useBookings();
  const { addActivity } = useActivities();
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  // state dữ liệu kiểm tra xe
  const [inspectionData, setInspectionData] = useState({
    currentBattery: 0,
    currentOdometer: 0,
    additionalFees: [],
    customFeeAmount: 0
  });

  // Load dữ liệu booking
  useEffect(() => {
    const loadData = async () => {
      setError(null);
      try {
        const data = bookingsData.getBookingById(bookingIdNum);
        if (!data) {
          setError(`Không tìm thấy booking có ID: ${bookingIdNum}`);
          return;
        }
        if (data.status !== 4) {
          setError("Booking không ở trạng thái đang thuê.");
        }
        setBookingData(data);
      } catch (err) {
        console.error('Error loading booking data:', err);
        setError('Có lỗi xảy ra khi tải thông tin booking');
      }
    };
    
    loadData();
  }, [bookingIdNum, bookingsData]);

  // Xử lý thay đổi dữ liệu kiểm tra xe
  const handleInspectionDataChange = (data) => {
    setInspectionData(data);
  };

  // Tính toán các khoản phí
  const calculateFees = () => {
    if (!bookingData) return { kmOverageFee: 0, batteryDeficitFee: 0, additionalFeesTotal: 0, totalFees: 0, netAmount: 0 };
    
    const kmDriven = inspectionData.currentOdometer - bookingData.vehicle.odometer;
    const kmOverage = Math.max(0, kmDriven - 200);
    const kmOverageFee = kmOverage * 5000; // 5.000 vnd cho mỗi km vượt quá 200km

    const batteryDeficit = Math.max(0, bookingData.vehicle.batteryLevel - inspectionData.currentBattery);
    const batteryDeficitFee = batteryDeficit * 50000; // 50.000 vnd cho mỗi 1% pin thiếu

    const additionalFeesTotal = inspectionData.additionalFees.reduce((sum, fee) => {
      if (fee.isCustom) {
        return sum + inspectionData.customFeeAmount;
      }
      return sum + fee.amount;
    }, 0);

    const totalFees = kmOverageFee + batteryDeficitFee + additionalFeesTotal;
    const netAmount = bookingData.deposit - totalFees;
    
    return { kmOverageFee, batteryDeficitFee, additionalFeesTotal, totalFees, netAmount };
  };
  // Xử lý hoàn tất nhận xe trả
  const handleautoUpdateStatusBooking = async () => {
    const { netAmount } = calculateFees();
    
    if (netAmount < 0) {
      setShowQRCode(true);
    } else {
      // Hoàn trả tiền cho khách hàng
      await autoUpdateStatusBooking(bookingData.id);
      
      addActivity({
        type: 'return',
        title: `Đã nhận xe trả ${bookingData.vehicle.modelName} (${bookingData.vehicle.plateNumber})`,
        customer: `Hoàn trả ${Math.abs(netAmount).toLocaleString()}đ cho ${bookingData.customer.fullName}`,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(
        `Hoàn tất nhận xe trả!\n\n` +
        `Xe: ${bookingData.vehicle.plateNumber}\n` +
        `Khách hàng: ${bookingData.customer.fullName}\n` +
        `Số tiền hoàn trả: ${Math.abs(netAmount).toLocaleString()} đ\n\n` +
        `Booking đã hoàn tất.`
      );
      navigate('/staff/manage-bookings?tab=rented');
    }
  };
  // xử lý xác nhận đã nhận thanh toán từ khách
  const handleConfirmPayment = async () => {
    const { netAmount } = calculateFees();
    await autoUpdateStatusBooking(bookingData.id);
    
    addActivity({
      type: 'return',
      title: `Đã nhận xe trả ${bookingData.vehicle.modelName} (${bookingData.vehicle.plateNumber})`,
      customer: `Thu thêm ${Math.abs(netAmount).toLocaleString()}đ từ ${bookingData.customer.fullName}`,
      icon: 'check',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    });

    alert(
      `Xác nhận đã nhận thanh toán!\n\n` +
      `Xe: ${bookingData.vehicle.plateNumber}\n` +
      `Khách hàng: ${bookingData.customer.fullName}\n` +
      `Số tiền đã thu: ${Math.abs(netAmount).toLocaleString()} đ\n\n` +
      `Booking đã hoàn tất.`
    );
    navigate('/staff/manage-bookings?tab=rented');
  };

  if (loading || !bookingData) {
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy booking</h2>
        <p className="text-gray-600 mb-4">{error || `Booking với ID "${bookingIdNum}" không tồn tại.`}</p>
        <button
          onClick={() => navigate('/staff/manage-bookings?tab=rented')}
          className="cursor-pointer mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <HeaderSection onNavigateBack={() => navigate('/staff/manage-bookings?tab=rented')} />
      {!showQRCode ? (
        <>
          <VehicleReturnInfo
            customer={bookingData.customer}
            vehicle={bookingData.vehicle}
            deposit={bookingData.deposit}
            rentalTime={bookingData.rentalTime}
            rentalType={bookingData.rentalType}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VehicleInspectionForm
              vehicle={bookingData.vehicle}
              onDataChange={handleInspectionDataChange}
            />
            <FeeCalculationSummary
              vehicle={bookingData.vehicle}
              deposit={bookingData.deposit}
              rentalTime={bookingData.rentalTime}
              rentalType={bookingData.rentalType}
              inspectionData={inspectionData}
              fees={calculateFees()}
            />
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <button
              onClick={handleautoUpdateStatusBooking}
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
            amount={Math.abs(calculateFees().netAmount)}
            customerName={bookingData.customer.fullName}
            bookingId={bookingData.id}
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