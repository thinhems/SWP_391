import { useState, useEffect } from 'react';
import { useBookings } from '../../../contexts/BookingsContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import StatsSection from './StatsSection';
import TabsSection from './TabsSection';
import ListCarsSection from './ListBookingSection';

export default function ManagerBookingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'pending_approval');
  const { bookingsData, loading, setUserStation, rejectCarApproval } = useBookings();
  const { user } = useAuth();

  // Cập nhật station của user vào BookingsContext khi component mount
  useEffect(() => {
    setUserStation(user.station);
  }, [user.station]);

  // xử lý đồng bộ tab với URL 
  useEffect(() => {
    if (tabFromUrl) {
      if (tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
      }
    } else {
      const tabToSet = activeTab || 'pending_approval';
      setSearchParams({ tab: tabToSet }, { replace: true });
    }
  }, [tabFromUrl]);

  // Phân loại bookings theo trạng thái
  const organizedBookings = {
    pending_approval: bookingsData.getBookingsByStatus(1), // Đã thanh toán, chờ staff phê duyệt
    pending_contract: bookingsData.getBookingsByStatus(2), // Đã duyệt, chờ khách ký hđ
    pending_handover: bookingsData.getBookingsByStatus(3), // Đã ký, chờ bàn giao
    rented: bookingsData.getBookingsByStatus(4) // Đang trong hđ
  };
  
  // Lọc bookings theo tab
  const filteredBookings = organizedBookings[activeTab] || [];
  
  const handleCancelContract = async (booking) => {
    await rejectCarApproval(booking.id);
    alert(`Hợp đồng ${booking.id} đã được hủy thành công.`);
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải dữ liệu booking</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Booking</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin và trạng thái các booking trong hệ thống</p>
        </div>
      </div>
      <StatsSection bookings={organizedBookings} />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} bookings={organizedBookings} />
      <ListCarsSection bookings={filteredBookings} activeTab={activeTab} onCancelContract={handleCancelContract} />
    </div>
  );
}