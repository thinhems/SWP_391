import api from "./api";

export const bookingService = {

  getBookingByCarId: async (idCar) => {
    try {
      const response = await api.get(`/Booking/GetByCar/${idCar}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};