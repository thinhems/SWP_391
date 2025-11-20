import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const requestBody = {
        email: credentials.email,
        password: credentials.password
      };
      
      console.log('AuthService - Request:', requestBody);
      
      const response = await api.post('/Auth/login', requestBody);
      console.log('AuthService - Response:', response.data);
      console.log('AuthService - Full response data:', JSON.stringify(response.data, null, 2));

      // Kiểm tra nếu response là error response
      if (response.data?.error || !response.data) {
        // Nếu server trả về error message, throw error với message đó
        throw new Error(response.data?.message || 'Không nhận được phản hồi từ server');
      }

      // API trả về user data trực tiếp, không wrapped trong success/data
      const userData = response.data;
      console.log('AuthService - User data:', userData);

      // Map role từ API
      let mappedRole;
      switch((userData.role || '').toUpperCase()) {
        case 'STAFF':
          mappedRole = 'staff';
          break;
        case 'ADMIN':
          mappedRole = 'admin';
          break;
        case 'RENTER':
          mappedRole = 'renter';
          break;
        default:
          console.warn('Role không xác định:', userData.role);
          mappedRole = 'renter';
      }

      // Tạo user object
      const user = {
        id: userData.userId || userData.id || userData.renterId || null,
        name: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || userData.phoneNumber || '',
        role: mappedRole,
        station: userData.stationId || null,
        verifiedStatus: userData.verifiedStatus || 1
      };

      console.log('AuthService - Mapped user object:', user);
      
      // Nếu không có ID, log warning
      if (!user.id) {
        console.warn('⚠️ User ID not found in API response. Available fields:', Object.keys(userData));
      }

      // Lưu thông tin user
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', userData.token || 'dummy-token');

      return {
        success: true,
        data: {
          token: userData.token || 'dummy-token',
          user
        }
      };    } catch (error) {
      console.error('AuthService - Error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'Đăng nhập thất bại';
      
      // Kiểm tra các trường hợp lỗi khác nhau
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.log('Original error message:', errorMessage);

      // Map error messages
      switch(errorMessage.toLowerCase()) {
        case 'invalid password.':
        case 'incorrect password':
        case 'password is incorrect':
          errorMessage = 'Mật khẩu không chính xác';
          break;
        case 'user not found.':
        case 'email not found':
        case 'account not found':
          errorMessage = 'Tài khoản không tồn tại';
          break;
        case 'invalid credentials':
        case 'invalid username or password':
          errorMessage = 'Thông tin đăng nhập không chính xác';
          break;
        default:
          if (errorMessage.toLowerCase().includes('password')) {
            errorMessage = 'Mật khẩu không chính xác';
          }
      }

      // Throw the error instead of returning failure object
      throw new Error(errorMessage);
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/Auth/register', {
        email: userData.email,
        password: userData.password,
        fullName: userData.name,
        phoneNumber: userData.phone
      });
      return { 
        success: response.data.success, 
        data: response.data.data,
        error: response.data.success ? null : response.data.message
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng ký thất bại' 
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  sendVerificationInfo: async (userId, verificationData) => {
    try {
      const formData = new FormData();
      formData.append('renterid', userId);
      formData.append('idNumber', verificationData.cccdNumber);
      formData.append('driverLicenseNo', verificationData.blxNumber);
      formData.append('idFront', verificationData.cccdFrontImage);
      formData.append('idBack', verificationData.cccdBackImage);
      formData.append('dlFront', verificationData.blxFrontImage);
      formData.append('dlBack', verificationData.blxBackImage);

      const response = await api.post('/RenterProfile/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Cập nhật verifiedStatus trong localStorage sau khi gọi API thành công
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        user.verifiedStatus = 2;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userId, profileData) => {
    try {
      const formData = new FormData();
      formData.append('FullName', profileData.name || '');
      formData.append('Email', '');
      formData.append('Phone', profileData.phone || '');
      formData.append('Address', profileData.address || '');
      formData.append('IsEmailVerified', '');
      formData.append('RoleID', '');

      const response = await api.put(`/User/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Cập nhật thông tin user trong localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        user.name = profileData.name || user.name;
        user.phone = profileData.phone || user.phone;
        user.address = profileData.address || user.address;
        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;