import api from "./api";

export const carService = {
  // Lấy danh sách xe
  getCars: async () => {
    try {
      const response = await api.get("/Vehicle");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Lấy thông tin xe theo ID
  getCarById: async (id) => {
    try {
      const response = await api.get(`/Vehicle/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Cập nhật thông tin xe
  updateCar: async (id, carData) => {
    try {
      const formData = new FormData();
      formData.append('PlateNumber', carData.plateNumber || '');
      formData.append('ModelID', carData.modelID || '');
      formData.append('StationID', carData.stationID || '');
      formData.append('Location', carData.location || '');
      formData.append('BatteryLevel', carData.batteryLevel || '');
      formData.append('Odometer', carData.odometer || '');
      formData.append('Color', carData.color || '');
      formData.append('Status', carData.status !== undefined ? carData.status : '');
      // call api dùng kiểu dữ liệu multipart/form-data
      const response = await api.put(`/Vehicle/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in updateCar:', error.response?.data || error.message);
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