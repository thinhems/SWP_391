import api from "./api";

export const carService = {
  // Lấy danh sách xe
  getCars: async () => {
    try {
      const response = await api.get("/Vehicle", {
        timeout: 30000 // 30 giây
      });
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
  // cập nhật item kiểm tra xe
  updateCarInspectionItem: async (carId, itemData) => {
    try {
      const response = await api.put(`/Vehicle/UpdateCarItems/${carId}`, itemData);
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
  //update ảnh xe
  updateCarImage: async (vehicleId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('vehicleId', vehicleId);
      formData.append('file', imageFile);
      const response = await api.post('/images/upload-vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Xóa ảnh xe theo base64
  deleteCarImage: async (vehicleId, base64Image) => {
    try {
      const requestData = {
        VehicleId: vehicleId,
        Base64Image: base64Image
      };
      
      const response = await api.post('/images/vehicle/delete-by-base64/', requestData);
      return response.data;
    } catch (error) {
      console.error('Error deleting car image:', error.response?.data || error.message);
      throw error;
    }
  },
};