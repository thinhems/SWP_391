import api from "./api";

export const carService = {
  // Lấy danh sách xe
  getCars: async () => {
    try {
      const response = await api.get("/api/Vehicle");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};