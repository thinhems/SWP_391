import api from './api';

export const paymentService = {
  // Tạo payment và nhận URL VNPay
  createPayment: async (paymentData) => {
    try {
      console.log('Creating payment with data:', paymentData);
      
      const response = await api.post('/Payment/create', paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Payment API response:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating payment:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Không thể tạo thanh toán' 
      };
    }
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
