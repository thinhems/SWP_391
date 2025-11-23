import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookings } from '../../../../contexts/BookingsContext';
import { useActivities } from '../../../../contexts/ActivitiesContext';
import { customersService } from '../../../../services/customers.api';
import { bookingService } from '../../../../services/booking.api';
import HeaderSection from './HeaderSection';  
import CustomerInfoSection from './CustomerInfoSection';
import CarInfoSection from './CarInfoSection';
import RentalInfoSection from './RentalInfoSection';
import ApprovalActionsSection from './ApprovalActionsSection';

export default function ApprovalBookingPage() {
  const { bookingId } = useParams();
  const bookingIdNum = parseInt(bookingId, 10);
  const navigate = useNavigate();
  const { bookingsData, loading } = useBookings();
  const { addActivity } = useActivities();
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(false);
  // load dữ liệu booking từ bookingsContext
  useEffect(() => {
    const loadData = async () => {
      setError(null);
      try {
        const data = bookingsData.getBookingById(bookingIdNum);
        if (!data) {
          setError(`Không tìm thấy booking có ID: ${bookingIdNum}`);
          return;
        }
        if (data.status !== 1) {
          setError("Booking không ở trạng thái chờ phê duyệt."); 
        }
        setBookingData(data);
      } catch (err) {
        console.error('Error loading booking:', err);
        setError('Có lỗi xảy ra khi tải thông tin booking');
      }
    };
    
    loadData();
  }, [bookingIdNum, bookingsData]);
  // call api lấy thông tin khách hàng khi có bookingData
  useEffect(() => {
    const loadCustomerData = async () => {
      if (!bookingData || !bookingData.customer || !bookingData.customer.id) {
        return;
      }
      try {
        setCustomerLoading(true);
        const customer = await customersService.getCustomerById(bookingData.customer.id);
        setCustomerData(customer);
      } catch (err) {
        console.error('Error fetching customer data:', err);
      } finally {
        setCustomerLoading(false);
      }
    };
    
    loadCustomerData();
  }, [bookingData]);  

  // xử lý duyệt yêu cầu
  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await bookingService.updateStatusCar(bookingData.vehicle?.id);
      addActivity({
        type: 'approval',
        title: `Đã duyệt booking xe ${bookingData.vehicle?.modelName}`,
        customer: bookingData.customer?.fullName,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
    
      alert(`Đã duyệt booking thành công!\n\nThông báo đã được gửi tới: ${bookingData.customer?.fullName}\nEmail: ${bookingData.customer?.email}\nSĐT: ${bookingData.customer?.phoneNumber}\n\nHợp đồng điện tử sẽ được tạo và gửi cho khách hàng trong vòng 5 phút.`);
      
      navigate('/staff/manage-bookings?tab=paid'); 
    } catch (error) {
      console.error('Error approving booking:', error);
      alert('Có lỗi xảy ra khi duyệt booking. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };
  // xử lý từ chối yêu cầu
  const handleReject = async (reason) => {
    setIsProcessing(true);
    try {
      await bookingService.rejectCarApproval(bookingData.vehicle?.id);
      addActivity({
        type: 'rejection',
        title: `Đã từ chối booking xe ${bookingData.vehicle?.modelName}`,
        customer: bookingData.customer?.fullName,
        icon: 'clock',
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      });
      
      alert(`Đã từ chối booking!\n\nLý do từ chối: ${reason}\n\nThông báo đã được gửi tới: ${bookingData.customer?.fullName}\nEmail: ${bookingData.customer?.email}\nSĐT: ${bookingData.customer?.phoneNumber}`);

      navigate('/staff/manage-bookings?tab=paid');
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Có lỗi xảy ra khi từ chối booking. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || customerLoading) {
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
        <p className="text-gray-600 mb-4">{error || `Booking với ID "${bookingIdNum}" không tồn tại hoặc đã bị xóa.`}</p>
        <button
          onClick={() => navigate('/staff/manage-bookings?tab=pending_approval')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Quay lại danh sách booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <HeaderSection
        carData={bookingData?.vehicle}
        isProcessing={isProcessing}
        onNavigateBack={() => navigate('/staff/manage-bookings?tab=pending_approval')}
      />
      <CustomerInfoSection customer={customerData} />
      <CarInfoSection car={bookingData?.vehicle} />
      <RentalInfoSection 
        bookingData={bookingData}
      />
      <ApprovalActionsSection 
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </div>
  );
}