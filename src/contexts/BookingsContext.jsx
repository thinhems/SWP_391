import React, { createContext, useState, useContext, useEffect } from 'react';
import { bookingService } from '../services/booking.api';
import bookingData from '../data/booking.json';

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

  // call api get danh sach booking
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      // const data = await bookingService.getAllBookings();
      // Sử dụng dữ liệu mẫu từ booking.json với timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      // Map dữ liệu để thêm idBooking
      const mappedData = bookingData.map(booking => ({
        ...booking,
        idBooking: booking.id
      }));
      setBookings(mappedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
  // Lọc bookings theo station
  const filteredBookings = userStation
    ? bookings.filter(booking => booking.stationID === userStation)
    : bookings;
  // data cung cấp trong context
  const bookingsData = {
    // lấy danh sách booking theo trạng thái
    getBookingsByStatus: (status) => {
      return filteredBookings.filter(booking => booking.status === status);
    },
    // lấy booking theo ID
    getBookingById: (id) => filteredBookings.find(booking => booking.idBooking === id)
  };
  // Tự động cập nhật status xe + booking
  const autoUpdateStatusBooking = async (carId) => { 
    try {
      await bookingService.updateStatusBooking(carId);
      await fetchBookings();
    } catch (error) {
      console.error('Error updating car status:', error);
      throw error;
    }
  };
  // từ chối yêu cầu thuê xe
  const rejectCarApproval = async (carId) => { 
    try {
      await bookingService.rejectCarApproval(carId);
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
  // Load bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

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