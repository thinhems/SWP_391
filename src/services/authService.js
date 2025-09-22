import api from './api';

// Mock accounts for local testing
const MOCK_USERS = [
  {
    id: '1',
    name: ' Admin',
    email: 'admin@gmail.com',
    password: '1',
    role: 'Admin'
  },
  {
    id: '2',
    name: ' Staff',
    email: 'staff@gmail.com',
    password: '1',
    role: 'Staff'
  },
  {
    id: '3',
    name: ' Customer',
    email: 'customer@gmail.com',
    password: '1',
    role: 'Customer'
  }
];

const LOCAL_USERS_KEY = 'users';

const getLocalUsers = () => {
  try {
    const json = localStorage.getItem(LOCAL_USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

const setLocalUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // Check mock users
      const mock = MOCK_USERS.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (mock) {
        const responseData = {
          token: `mock-token-${mock.role.toLowerCase()}`,
          user: { id: mock.id, name: mock.name, email: mock.email, role: mock.role }
        };
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        return { success: true, data: responseData };
      }

      // Check locally registered users
      const localUsers = getLocalUsers();
      const found = localUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (found) {
        const responseData = {
          token: `mock-token-${found.role.toLowerCase()}`,
          user: { id: found.id, name: found.name, email: found.email, role: found.role }
        };
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        return { success: true, data: responseData };
      }

      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const users = getLocalUsers();
      const exists = users.some((u) => u.email === userData.email);
      if (exists) {
        return { success: false, error: 'Email already registered' };
      }

      const newUser = {
        id: String(Date.now()),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'Customer'
      };
      const updated = [...users, newUser];
      setLocalUsers(updated);
      return { success: true, data: { user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } } };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
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

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      localStorage.setItem('token', token);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Token refresh failed' 
      };
    }
  }
};
