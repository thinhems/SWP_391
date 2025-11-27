import api from "./api";

export const bookingService = {
  // lấy danh sách booking
  getAllBookings: async (stationID) => {
    try {
      const response = await api.get(`/Booking/StaffGetBookingByStation/${stationID}`, {
        timeout: 60000 // 60 giây
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // lây thông tin booking theo id xe 
  getBookingByCarId: async (idCar) => {
    try {
      const response = await api.get(`/Booking/GetByCar/${idCar}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // khởi tạo biên bản bàn giao và tự động duyệt status xe + booking, dành cho bàn giao xe
  createHandover: async (handoverData) => {
    try {
      const response = await api.post('/Handover/create', handoverData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Tự động cập nhật status xe + booking dành cho duyệt yêu cầu thuê, trả xe
  updateStatusBooking: async (idBooking) => {
    try {
      const response = await api.put(`/Booking/AutoUpdateBookingStatus/${idBooking}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // từ chối duyệt xe/hủy hợp đồng
  rejectCarApproval: async (idBooking) => {
    try {
      const response = await api.put(`/Booking/RefuseBookingStatus/${idBooking}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};