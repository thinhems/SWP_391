import api from './api';

export const stationService = {
  /**
   * Get all stations
   * @returns {Promise} Station list
   */
  getAllStations: async () => {
    try {
      const response = await api.get('/Station');
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },

  /**
   * Create a new station
   * @param {Object} stationData - Station data
   * @param {string} stationData.name - Station name
   * @param {string} stationData.location - Station location
   * @param {string} stationData.description - Station description
   * @param {number} stationData.capacity - Station capacity
   * @returns {Promise} Created station
   */
  createStation: async (stationData) => {
    try {
      const formData = new FormData();
      formData.append('Name', stationData.name);
      formData.append('Description', stationData.description);
      formData.append('Location', stationData.location);
      formData.append('Capacity', stationData.capacity);

      const response = await api.post('/Station', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating station:', error);
      throw error;
    }
  }
};

export default stationService;
