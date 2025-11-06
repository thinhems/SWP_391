import api from './api';

export const bookingService = {
  /**
   * Tạo booking mới
   * @param {Object} bookingData - Dữ liệu booking
   * @param {number} bookingData.modelId - ID của model xe
   * @param {number} bookingData.renterId - ID của người thuê (user ID)
   * @param {number} bookingData.stationId - ID của station
   * @param {string} bookingData.startDate - Ngày bắt đầu (ISO string)
   * @param {string} bookingData.endDate - Ngày kết thúc (ISO string)
   * @returns {Promise<Object>} Response từ API
   */
  async createBooking(bookingData) {
    try {
      // Tạo FormData thay vì JSON object
      const formData = new FormData();
      formData.append('ModelID', bookingData.modelId);
      formData.append('RenterID', bookingData.renterId);
      formData.append('StationID', bookingData.stationId);
      formData.append('StartDate', bookingData.startDate);
      formData.append('EndDate', bookingData.endDate);
      
      console.log('Booking form data:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const response = await api.post('/Booking', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating booking:', error);
      console.error('Error response:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tạo đơn thuê xe'
      };
    }
  },

  /**
   * Lấy danh sách booking của user
   * @param {number} userId - ID của user
   * @returns {Promise<Object>}
   */
  async getUserBookings(userId) {
    try {
      const response = await api.get(`/Booking/user/${userId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải danh sách đơn thuê'
      };
    }
  },

  /**
   * Lấy chi tiết booking
   * @param {number} bookingId - ID của booking
   * @returns {Promise<Object>}
   */
  async getBookingDetail(bookingId) {
    try {
      const response = await api.get(`/Booking/${bookingId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching booking detail:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải chi tiết đơn thuê'
      };
    }
  }
};
