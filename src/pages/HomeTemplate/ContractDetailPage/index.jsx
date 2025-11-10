import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../../../services/bookingService';
import ContractHeader from './ContractHeader';
import CustomerCarInfo from './CustomerCarInfo';
import RentalPaymentInfo from './RentalPaymentInfo';
import OTPVerificationPopup from './OTPVerificationPopup';

export default function ContractDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  
  // Handler cho button "Ký hợp đồng" - gọi API cập nhật vehicle status
  const handleSignContractDirect = async () => {
    if (!vehicleId) {
      alert('Không tìm thấy thông tin xe');
      return;
    }

    const confirmSign = window.confirm('Bạn có chắc chắn muốn ký hợp đồng? Trạng thái xe sẽ được cập nhật.');
    if (!confirmSign) return;

    try {
      const result = await bookingService.updateVehicleStatus(vehicleId);
      
      if (result.success) {
        alert('Ký hợp đồng thành công! Trạng thái xe đã được cập nhật.');
        // Reload contract data
        window.location.reload();
      } else {
        alert(result.error || 'Không thể ký hợp đồng. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error signing contract:', error);
      alert('Có lỗi xảy ra khi ký hợp đồng.');
    }
  };
  
  // Fetch booking detail từ API
  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      try {
        const result = await bookingService.getBookingDetail(id);
        
        if (!result.success) {
          console.error('Error:', result.error);
          navigate('/my-contracts');
          return;
        }

        const booking = result.data;
        
        // Lưu vehicleId để dùng cho API update status
        setVehicleId(booking.vehicleID);
        
        // Map status giống MyContractsPage
        const statusNum = booking.status ?? 0;
        const statusMap = {
          0: 'pending_approval',        // Chờ duyệt
          1: 'pending_contract',        // Chờ ký hợp đồng
          2: 'booked',                  // Đã đặt
          3: 'booked',                  // Đã đặt (fallback)
          4: 'rented',                  // Đang thuê
          5: 'completed',               // Hoàn thành
          6: 'cancelled'                // Đã hủy
        };
        const status = statusMap[statusNum] || 'pending_approval';
        
        const statusTextMap = {
          0: 'Chờ duyệt',
          1: 'Chờ ký hợp đồng',
          2: 'Đã đặt',
          3: 'Đã đặt',
          4: 'Đang thuê',
          5: 'Hoàn thành',
          6: 'Đã hủy'
        };
        const statusText = statusTextMap[statusNum] || 'Chờ duyệt';
        
        // Transform API data sang format contract hiện tại
        const transformedContract = {
          id: booking.id,
          orderCode: `BK-${(booking.id || 0).toString().padStart(6, '0')}`,
          contractNumber: `HD-${(booking.id || 0).toString().padStart(6, '0')}`,
          status: status,
          statusText: statusText,
          signDate: booking.signDate || null,
          otpRequired: statusNum === 1, // Chỉ yêu cầu OTP khi status = 1 (chờ ký hợp đồng)
          notes: booking.note || null,
          
          // Customer info
          customer: {
            name: booking.renterName || 'N/A',
            phone: booking.renterPhone || 'N/A',
            email: booking.renterEmail || 'N/A',
            avatar: '/images/default-avatar.png',
            idCard: booking.renterIDCard || 'N/A',
            driverLicense: booking.renterDriverLicense || 'N/A',
            address: booking.renterAddress || 'N/A',
            idCardImages: booking.renterIDCardImages || ['/images/id-card-front.jpg', '/images/id-card-back.jpg'],
            licenseImages: booking.renterLicenseImages || ['/images/license-front.jpg', '/images/license-back.jpg']
          },
          
          // Car info
          car: {
            model: booking.modelName || `Vehicle #${booking.vehicleID || 'N/A'}`,
            licensePlate: booking.licensePlate || 'N/A',
            image: booking.imageUrl || '/images/default-car.jpg',
            images: booking.vehicleImages || [booking.imageUrl || '/images/default-car.jpg'],
            color: booking.color || 'N/A',
            year: booking.year || 'N/A',
            location: booking.stationName || 'N/A',
            specifications: {
              seats: booking.seats || '4 chỗ',
              power: booking.power || '150 HP',
              transmission: booking.transmission || 'Tự động',
              chargingTime: booking.chargingTime || '8 giờ'
            }
          },
          
          // Pickup location
          pickupLocation: booking.stationName || 'N/A',
          
          // Rental info
          rental: {
            startDate: booking.startDate,
            endDate: booking.endDate,
            pickupLocation: booking.stationName || 'N/A',
            rentalType: booking.rentalType === 2 ? 'weeks' : booking.rentalType === 3 ? 'months' : 'days',
            rentTime: booking.rentTime || null,
            totalDays: Math.max(1, Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000*60*60*24))),
            maxKmPerDay: 300, // Default value
            totalMaxKm: Math.max(1, Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000*60*60*24))) * 300,
            pricePerDay: (booking.retalCost || booking.baseCost || 0) / Math.max(1, Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000*60*60*24))),
            totalCost: booking.retalCost || booking.baseCost || 0,
            deposit: booking.deposit || 0,
            grandTotal: booking.baseCost || (booking.retalCost + booking.deposit) || 0,
            kmOverageFee: 5000, // Default value
            batteryDeficitFee: 50000 // Default value
          },
          
          // Mileage info (default values for now)
          mileage: {
            initial: booking.initialMileage || null,
            overageFee: 0,
            overage: 0
          },
          
          // Battery info (default values for now)
          battery: {
            initial: booking.initialBattery || null,
            deficitFee: 0,
            deficit: 0
          },
          
          // Payment info
          payment: {
            rentalCost: booking.retalCost || booking.baseCost || 0,
            deposit: booking.deposit || 0,
            totalCost: booking.baseCost || (booking.retalCost + booking.deposit) || 0,
            finalCost: booking.finalCost || null,
            finalAmount: booking.finalCost || booking.baseCost || 0,
            voucher: booking.voucherID ? { 
              code: `VOUCHER-${booking.voucherID}`,
              discount: 0 
            } : null
          }
        };
        
        setContract(transformedContract);
      } catch (error) {
        console.error('Error fetching contract:', error);
        navigate('/my-contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-medium">Đang tải thông tin hợp đồng...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy hợp đồng</h2>
          <button 
            onClick={() => navigate('/my-contracts')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Quay lại danh sách hợp đồng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Header */}
        <ContractHeader 
          contract={contract} 
          onSignContract={() => setShowOtpModal(true)}
          onSignContractDirect={handleSignContractDirect}
        />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left content - thông tin xe & khách hàng */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerCarInfo contract={contract} />
          </div>
          {/* right content - thông tin thuê xe & thanh toán */}
          <div className="space-y-6">
            <RentalPaymentInfo contract={contract} />
          </div>
        </div>
        {/* OTP popup */}
        <OTPVerificationPopup 
          contract={contract} 
          isOpen={showOtpModal} 
          onClose={() => setShowOtpModal(false)} 
        />
      </div>
    </div>
  );
};