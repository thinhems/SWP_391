import api from './api';

export const dataService = {
  // Generic CRUD operations
  getAll: async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch data' 
      };
    }
  },

  getById: async (endpoint, id) => {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch item' 
      };
    }
  },

  create: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create item' 
      };
    }
  },

  update: async (endpoint, id, data) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update item' 
      };
    }
  },

  delete: async (endpoint, id) => {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete item' 
      };
    }
  },

  // Search with query parameters
  search: async (endpoint, params) => {
    try {
      const response = await api.get(endpoint, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Search failed' 
      };
    }
  }
};
