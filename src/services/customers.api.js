import api from "./api";

export const customersService = { 
  // Lấy danh sách tất cả users
  getAllUsers: async () => {
    try {
      const response = await api.get('/User/GetAllRentersForStaff');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Lấy danh sách khách hàng (roleID = 1)
  getCustomers: async () => {
    try {
      const response = await api.get('/User');
      const users = response.data;
      // Filter chỉ lấy customers (roleID = 1)
      return users.filter(user => user.roleID === 1 || user.roleID === '1' || user.role === 1 || user.role === '1');
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Lấy danh sách nhân viên (roleID = 2)
  getStaff: async () => {
    try {
      const response = await api.get('/User');
      const users = response.data;
      // Filter chỉ lấy staff (roleID = 2)
      return users.filter(user => user.roleID === 2 || user.roleID === '2' || user.role === 2 || user.role === '2');
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  }
}