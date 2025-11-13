import api from './api';

/**
 * Model API Service
 * Xử lý các API liên quan đến Model/Vehicle Models
 */

const modelsApi = {
  /**
   * Lấy tất cả models
   * @returns {Promise<Object>}
   */
  async getAllModels() {
    try {
      const response = await api.get('/Model/GetAll');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching all models:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải danh sách model'
      };
    }
  },

  /**
   * Lấy số lượng model có sẵn theo station ID
   * @param {number} stationId - ID của station
   * @returns {Promise<Object>}
   */
  async getAvailableQuantityByStation(stationId) {
    try {
      const response = await api.get(`/Model/GetAvailableQuantityByStationId/${stationId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching models by station:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải danh sách model theo station'
      };
    }
  },

  /**
   * Lấy chi tiết model theo ID
   * @param {number} modelId - ID của model
   * @returns {Promise<Object>}
   */
  async getModelById(modelId) {
    try {
      const response = await api.get(`/Model/${modelId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching model detail:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải thông tin model'
      };
    }
  }
};

export default modelsApi;
