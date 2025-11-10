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
   * @param {number} bookingData.rentalType - Loại thuê (1: daily, 2: weekly, 3: monthly)
   * @param {number} [bookingData.rentTime] - Số tuần/tháng thuê (áp dụng khi RentalType = 2 hoặc 3)
   * @returns {Promise<Object>} Response từ API
   */
  async createBooking(bookingData) {
    try {
      // API Booking sử dụng FormData
      const formData = new FormData();
      formData.append('ModelID', bookingData.modelId);
      formData.append('RenterID', bookingData.renterId);
      formData.append('StationID', bookingData.stationId);
      formData.append('StartDate', bookingData.startDate);
      formData.append('EndDate', bookingData.endDate);
      formData.append('RentalType', bookingData.rentalType || 1); // Default to daily if not provided
      if (bookingData.rentTime !== undefined && bookingData.rentTime !== null) {
        formData.append('RentTime', bookingData.rentTime);
      }
      
      console.log('Booking form data:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      // Phải xóa Content-Type header để browser tự set với boundary
      const response = await api.post('/Booking', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: [(data) => data] // Không transform FormData
      });

      console.log('Booking response:', response.data);

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating booking:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      console.error('Error response headers:', error.response?.headers);
      
      // Try to get detailed error message
      let errorMessage = 'Không thể tạo đơn thuê xe';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          errorMessage = JSON.stringify(error.response.data.errors);
        }
      }
      
      return {
        success: false,
        error: errorMessage
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
  },

  /**
   * Lấy danh sách booking theo renterID (userID)
   * @param {number} renterId
   */
  async getBookingsByRenter(renterId) {
    if (!renterId) {
      return { success: false, error: 'Thiếu renterId' };
    }
    try {
      const response = await api.get(`/Booking/GetBookingsByRenter/${renterId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching bookings by renter:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải danh sách hợp đồng'
      };
    }
  },

  /**
   * Gửi email OTP để xác nhận ký hợp đồng
   * @param {number} bookingId - ID của booking cần ký
   * @returns {Promise<Object>}
   */
  async sendSignatureEmail(bookingId) {
    try {
      const response = await api.post(`/Email/${bookingId}/send-signature-email`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error sending signature email:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể gửi email xác nhận'
      };
    }
  }
};
