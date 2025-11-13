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
        console.log('Vehicle data:', booking.vehicle); // Debug vehicle
        console.log('Model data:', booking.model); // Debug model
        console.log('Customer data:', booking.customer); // Debug customer
        console.log('Model specifications:', booking.model?.specifications); // Debug specs
        
        // API response structure: { id, rentalType, status, vehicleID, renterID, stationID, stationName, 
        // startDate, endDate, deposit, retalCost, baseCost, finalCost, model: {...}, customer: {...}, vehicle: {...} }
        
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
          
          // Customer info - Sử dụng object customer từ API
          customer: {
            name: booking.customer?.fullName || booking.renterName || 'N/A',
            phone: booking.customer?.phone || booking.renterPhone || 'N/A',
            email: booking.customer?.email || booking.renterEmail || 'N/A',
            avatar: '/images/default-avatar.png',
            idCard: booking.customer?.idCard || 'N/A',
            driverLicense: booking.customer?.driverLicense || 'N/A',
            address: booking.customer?.address || 'N/A',
            idCardImages: ['/images/id-card-front.jpg', '/images/id-card-back.jpg'],
            licenseImages: ['/images/license-front.jpg', '/images/license-back.jpg']
          },
          
          // Car info - Sử dụng object vehicle và model từ API
          car: {
            model: booking.model?.modelName || booking.vehicle?.modelName || `Vehicle #${booking.vehicleID || 'N/A'}`,
            licensePlate: booking.vehicle?.plateNumber || 'N/A',
            image: booking.model?.imageUrl || '/images/default-car.jpg',
            images: booking.model?.images || (booking.model?.imageUrl ? [booking.model.imageUrl] : ['/images/default-car.jpg']),
            color: 'N/A', // Vehicle không có thông tin màu trong API
            year: 'N/A',  // Vehicle không có thông tin năm trong API
            location: booking.vehicle?.location || booking.stationName || 'N/A',
            specifications: {
              seats: booking.model?.specifications?.seat ? `${booking.model.specifications.seat} chỗ` : 'N/A',
              power: booking.model?.specifications?.hoursepower ? `${booking.model.specifications.hoursepower} HP` : 'N/A',
              range: booking.model?.specifications?.range ? `${booking.model.specifications.range} km` : 'N/A',
              trunkCapacity: booking.model?.specifications?.trunkCapatity ? `${booking.model.specifications.trunkCapatity} L` : 'N/A'
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
          
          // Mileage info - Lấy từ vehicle.odometer
          mileage: {
            initial: booking.vehicle?.odometer || null,
            overageFee: 0,
            overage: 0
          },
          
          // Battery info - Lấy từ vehicle.batteryLevel
          battery: {
            initial: booking.vehicle?.batteryLevel || null,
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