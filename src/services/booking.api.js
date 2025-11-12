import api from "./api";

export const bookingService = {

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

};