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
        
        // Transform API data sang format contract hiện tại
        const transformedContract = {
          id: booking.id,
          orderCode: `BK-${(booking.id || 0).toString().padStart(6, '0')}`,
          status: booking.status ?? 0,
          
          // Customer info
          customer: {
            name: booking.renterName || 'N/A',
            phone: booking.renterPhone || 'N/A',
            email: booking.renterEmail || 'N/A',
            avatar: '/images/default-avatar.png'
          },
          
          // Car info
          car: {
            model: booking.modelName || `Vehicle #${booking.vehicleID || 'N/A'}`,
            licensePlate: booking.licensePlate || 'N/A',
            image: booking.imageUrl || '/images/default-car.jpg',
            color: booking.color || 'N/A',
            year: booking.year || 'N/A'
          },
          
          // Rental info
          rental: {
            pickupDate: booking.startDate,
            returnDate: booking.endDate,
            pickupLocation: booking.stationName || 'N/A',
            rentalType: booking.rentalType === 2 ? 'weekly' : booking.rentalType === 3 ? 'monthly' : 'daily',
            rentTime: booking.rentTime || null
          },
          
          // Payment info
          payment: {
            rentalCost: booking.retalCost || booking.baseCost || 0,
            deposit: booking.deposit || 0,
            totalCost: booking.baseCost || (booking.retalCost + booking.deposit) || 0,
            finalCost: booking.finalCost || null,
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