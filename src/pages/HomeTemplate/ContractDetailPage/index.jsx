import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../../../services/bookingService';
import ContractHeader from './ContractHeader';
import CustomerCarInfo from './CustomerCarInfo';
import RentalPaymentInfo from './RentalPaymentInfo';
import EmailVerificationPopup from './EmailVerificationPopup';

export default function ContractDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
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
        console.log('Booking API Response:', booking); // Debug log
        
        // Lưu vehicleId để dùng cho API update status
        setVehicleId(booking.vehicleID || booking.VehicleID);
        
        // Map status giống MyContractsPage
        const statusNum = booking.status ?? 0;
        const statusMap = {
          0: 'pending_payment',         // Chờ thanh toán (new create)
          1: 'pending_approval',        // Chờ phê duyệt (paid)
          2: 'pending_contract',        // Chờ ký hợp đồng (Approval)
          3: 'pending_handover',        // Chờ bàn giao (Pending Handover)
          4: 'rented',                  // Đang thuê xe (Rented)
          5: 'completed',               // Hoàn thành (Complete)
          6: 'cancelled'                // Đã hủy
        };
        const status = statusMap[statusNum] || 'pending_payment';
        
        const statusTextMap = {
          0: 'Chờ thanh toán',
          1: 'Chờ phê duyệt',
          2: 'Chờ ký hợp đồng',
          3: 'Chờ bàn giao',
          4: 'Đang thuê',
          5: 'Hoàn thành',
          6: 'Đã hủy'
        };
        const statusText = statusTextMap[statusNum] || 'Chờ thanh toán';
        
        // Transform API data sang format contract hiện tại
        const transformedContract = {
          id: booking.id,
          orderCode: `BK-${(booking.id || 0).toString().padStart(6, '0')}`,
          contractNumber: `HD-${(booking.id || 0).toString().padStart(6, '0')}`,
          status: status,
          statusText: statusText,
          signDate: booking.signDate || null,
          otpRequired: statusNum === 2, // Chỉ yêu cầu OTP khi status = 2 (chờ ký hợp đồng)
          notes: booking.note || null,
          
          // Customer info - Map từ nhiều nguồn có thể
          customer: {
            name: booking.renterName || booking.RenterName || booking.renter?.name || 'N/A',
            phone: booking.renterPhone || booking.RenterPhone || booking.renter?.phone || 'N/A',
            email: booking.renterEmail || booking.RenterEmail || booking.renter?.email || 'N/A',
            avatar: booking.renterAvatar || booking.renter?.avatar || '/images/default-avatar.png',
            idCard: booking.renterIDCard || booking.RenterIDCard || booking.renter?.idCard || 'N/A',
            driverLicense: booking.renterDriverLicense || booking.RenterDriverLicense || booking.renter?.driverLicense || 'N/A',
            address: booking.renterAddress || booking.RenterAddress || booking.renter?.address || 'N/A',
            idCardImages: booking.renterIDCardImages || booking.RenterIDCardImages || booking.renter?.idCardImages || ['/images/id-card-front.jpg', '/images/id-card-back.jpg'],
            licenseImages: booking.renterLicenseImages || booking.RenterLicenseImages || booking.renter?.licenseImages || ['/images/license-front.jpg', '/images/license-back.jpg']
          },
          
          // Car info - Map từ nhiều nguồn có thể
          car: {
            model: booking.modelName || booking.ModelName || booking.vehicle?.modelName || `Vehicle #${booking.vehicleID || booking.VehicleID || 'N/A'}`,
            licensePlate: booking.licensePlate || booking.LicensePlate || booking.vehicle?.licensePlate || 'N/A',
            image: booking.imageUrl || booking.ImageUrl || booking.vehicle?.imageUrl || '/images/default-car.jpg',
            images: booking.vehicleImages || booking.VehicleImages || booking.vehicle?.images || [booking.imageUrl || booking.ImageUrl] || ['/images/default-car.jpg'],
            color: booking.color || booking.Color || booking.vehicle?.color || 'N/A',
            year: booking.year || booking.Year || booking.vehicle?.year || 'N/A',
            location: booking.stationName || booking.StationName || booking.station?.name || 'N/A',
            specifications: {
              seats: booking.seats || booking.Seats || booking.vehicle?.seats || booking.specifications?.seats || '5 chỗ',
              power: booking.power || booking.Power || booking.vehicle?.power || booking.specifications?.power || '150 HP',
              transmission: booking.transmission || booking.Transmission || booking.vehicle?.transmission || 'Tự động',
              chargingTime: booking.chargingTime || booking.ChargingTime || booking.vehicle?.chargingTime || '8 giờ'
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
          onSignContract={() => setShowEmailModal(true)}
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
        {/* Email Verification popup */}
        <EmailVerificationPopup 
          contract={contract} 
          isOpen={showEmailModal} 
          onClose={() => setShowEmailModal(false)} 
        />
      </div>
    </div>
  );
};