import api from "./api";

export const customersService = { 
  // Lấy danh sách tất cả users
  getAllUsers: async () => {
    try {
      const response = await api.get('/User/GetAllRenters', {
        timeout: 30000 // 30 giây
      });
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
  },
  // LẤY THÔNG TIN KHÁCH HÀNG THEO ID
  getCustomerById: async (userId) => {
    try {
      const response = await api.get(`/User/GetRenter/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer by ID:', error);
      throw error;
    }
  },
  // cập nhật trạng thái verify khách hàng
  updateVerificationStatus: async (userId, status) => {
    try {
      const response = await api.put(`/User/UpdateVerifiedStatus/${userId}/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error updating verification status:', error);
      throw error;
    }
  },
  // update type khách hàng
  updateTypeCus: async (userId, type) => {
    try {
      const formData = new FormData();
      formData.append('FullName', '');
      formData.append('Email', '');
      formData.append('Phone', '');
      formData.append('Address', '');
      formData.append('Type', type);
      formData.append('IsEmailVerified', '');

      const response = await api.put(`/User/UpdateRenter/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo nhân viên mới
  createStaff: async (staffData) => {
    try {
      const formData = new FormData();
      formData.append('UserID', staffData.userId);
      formData.append('StationID', staffData.stationId);
      formData.append('StaffCode', staffData.staffCode);

      const response = await api.post('/User/CreateStaffProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating staff:', error);
      throw error;
    }
  }
}