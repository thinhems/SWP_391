import api from "./api";

export const bookingService = {
  // lấy danh sách booking
  getAllBookings: async () => {
    try {
      const response = await api.get('/Booking/GetAllBookingsForStaff');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // lấy danh sách tất cả booking (cho admin)
  getAllBookingsForAdmin: async () => {
    try {
      const response = await api.get('/Booking');
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
  updateStatusCar: async (idCar) => {
    try {
      const response = await api.put(`/Vehicle/AutpUpdateStatus/${idCar}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // từ chối duyệt xe
  rejectCarApproval: async (idCar) => {
    try {
      const response = await api.put(`/Vehicle/StaffRefusedStatus/${idCar}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};