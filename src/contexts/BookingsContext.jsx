import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { bookingService } from '../services/booking.api';

const BookingsContext = createContext();

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userStation, setUserStation] = useState(null);
  const isFirstLoadRef = useRef(true); // ← Thêm ref

  // call api get danh sach booking
  const fetchBookings = async () => {
    // Không fetch nếu chưa có userStation
    if (!userStation) {
      return;
    }
    if (isFirstLoadRef.current) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await bookingService.getAllBookings(userStation);
      setBookings(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      throw err;
    } finally {
      if (isFirstLoadRef.current) {
        setLoading(false);
        isFirstLoadRef.current = false;
      }
    }
  };
  // Load bookings on mount
  useEffect(() => {
    fetchBookings();
    // tự động làm mới danh sách xe mỗi 20 giây
    const intervalId = setInterval(() => {
      // Kiểm tra nếu đang ở trang con của manage-cars thì không fetch
      const currentPath = window.location.pathname;
      const isInManageBookingPage = currentPath.includes('/manage-bookings');
      const isInDetailPage = currentPath.includes('/approval-review') 
                          || currentPath.includes('/car-delivery')
                          || currentPath.includes('/car-return')
      // Chỉ refresh khi ở trang manage-cars và KHÔNG ở các trang chi tiết
      if (isInManageBookingPage && !isInDetailPage) {
        fetchBookings();
      }
    }, 20000);
    // cleanup interval khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [userStation]);

  // lấy thông tin booking theo id xe
  const getBookingByCarId = async (idCar) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getBookingByCarId(idCar);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch booking by car ID');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // data cung cấp trong context
  const bookingsData = {
    // lấy danh sách booking theo trạng thái
    getBookingsByStatus: (status) => {
      return bookings.filter(booking => booking.status === status);
    },
    // lấy booking theo ID
    getBookingById: (id) => bookings.find(booking => booking.id === id)
  };
  // Tự động cập nhật status xe + booking
  const autoUpdateStatusBooking = async (bookingId) => { 
    try {
      await bookingService.updateStatusBooking(bookingId);
      setBookings(prevBookings => prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: booking.status + 1 } : booking
      ));
      await fetchBookings();
    } catch (error) {
      console.error('Error updating car status:', error);
      throw error;
    }
  };
  // từ chối yêu cầu thuê xe
  const rejectCarApproval = async (bookingId) => { 
    try {
      await bookingService.rejectCarApproval(bookingId);
      setBookings(prevBookings => prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 6 } : booking
      ));
      await fetchBookings();
    } catch (error) {
      throw error;
    }
  };
  // khởi tạo biên bản bàn giao và tự động duyệt status xe + booking, dành cho bàn giao xe
  const createHandover = async (handoverData) => {
    try {
      await bookingService.createHandover(handoverData);
      await fetchBookings();
    } catch (error) {
      throw error;
    }
  };
  

  const value = {
    bookingsData,
    loading,
    error,
    fetchBookings,
    getBookingByCarId,
    autoUpdateStatusBooking,
    rejectCarApproval,
    createHandover,
    setUserStation,
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};