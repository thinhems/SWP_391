import api from "./api";

export const customersService = { 
  // Lấy danh sách khách hàng
  getCustomers: async () => {
    try {
      const response = await api.get('/User');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
}