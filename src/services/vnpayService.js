import api from './api';

export const vnpayService = {
  // Tạo URL thanh toán VNPay
  createPaymentUrl: async (paymentData) => {
    try {
      const response = await api.post('/payment/vnpay/create-payment-url', paymentData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating VNPay payment URL:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Không thể tạo URL thanh toán VNPay' 
      };
    }
  },

  // Xử lý kết quả thanh toán từ VNPay
  handlePaymentResult: async (queryParams) => {
    try {
      const response = await api.get('/payment/vnpay/result', { params: queryParams });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error handling VNPay payment result:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Không thể xử lý kết quả thanh toán' 
      };
    }
  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: async (orderId) => {
    try {
      const response = await api.get(`/payment/vnpay/status/${orderId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Không thể kiểm tra trạng thái thanh toán' 
      };
    }
  },

  // Tạo dữ liệu thanh toán cho VNPay
  createPaymentData: (bookingData) => {
    const {
      customerName,
      phone,
      email,
      carModel,
      station,
      rentalType,
      pricing,
      rentDate,
      returnDate,
      duration
    } = bookingData;

    // Tạo order ID duy nhất
    const orderId = `EV_RENT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Tạo mô tả đơn hàng
    const orderDescription = `Thuê xe ${carModel} - ${rentalType} - ${station}`;
    
    return {
      orderId,
      amount: pricing.totalAmount,
      orderDescription,
      customerInfo: {
        name: customerName,
        phone,
        email
      },
      bookingInfo: {
        carModel,
        station,
        rentalType,
        rentDate,
        returnDate,
        duration,
        pricing
      },
      returnUrl: `${window.location.origin}/payment/result`,
      cancelUrl: `${window.location.origin}/booking/${bookingData.carModelId}`
    };
  },

  // Chuyển hướng đến VNPay
  redirectToVNPay: (paymentUrl) => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      throw new Error('URL thanh toán không hợp lệ');
    }
  }
};
