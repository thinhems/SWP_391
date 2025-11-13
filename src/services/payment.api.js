import api from './api';

export const paymentService = {
  /**
   * Get all payments
   * @returns {Promise} Payment list
   */
  getAllPayments: async () => {
    try {
      const response = await api.get('/Payment/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }
};

export default paymentService;
