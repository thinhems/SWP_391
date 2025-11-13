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
   * Lấy chi tiết booking (dùng API for Staff với response đầy đủ hơn)
   * @param {number} bookingId - ID của booking
   * @returns {Promise<Object>}
   */
  async getBookingDetail(bookingId) {
    try {
      // Sử dụng API for Staff để có response đầy đủ hơn (bao gồm model, customer, vehicle)
      const response = await api.get(`/Booking/GetBookingByIdForStaff/${bookingId}`);
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
      console.log('Sending signature email for bookingId:', bookingId);
      const response = await api.post(`/Email/${bookingId}/send-signature-email`);
      return {
        success: true,
        data: response.data,
        verificationLink: response.data // Link xác thực sẽ ở đây
      };
    } catch (error) {
      console.error('Error sending signature email:', error);
      // Log chi tiết để debug
      console.error('BookingId:', bookingId);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message || 'Không thể gửi email xác nhận'
      };
    }
  },

  /**
   * Xác thực chữ ký điện tử qua token
   * @param {string} token - Token từ email
   * @returns {Promise<Object>}
   */
  async confirmSignature(token) {
    try {
      console.log('Confirming signature with token:', token);
      const response = await api.get(`/Email/confirm-signature`, {
        params: { token }
      });
      return {
        success: true,
        data: response.data,
        message: 'Xác thực chữ ký thành công'
      };
    } catch (error) {
      console.error('Error confirming signature:', error);
      console.error('Token:', token);
      console.error('Error details:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message || 'Không thể xác thực chữ ký'
      };
    }
  },

  /**
   * Cập nhật status xe tự động
   * @param {number} vehicleId - ID của xe cần cập nhật status
   * @returns {Promise<Object>}
   */
  async updateVehicleStatus(vehicleId) {
    try {
      const response = await api.put(`/Vehicle/AutpUpdateStatus/${vehicleId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating vehicle status:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể cập nhật trạng thái xe'
      };
    }
  }
};
