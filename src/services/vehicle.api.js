import api from './api';

export const vehicleService = {
  /**
   * Create a new vehicle
   * @param {Object} vehicleData - Vehicle data
   * @param {number} vehicleData.modelId - Model ID
   * @param {number} vehicleData.stationId - Station ID
   * @param {string} vehicleData.location - Location
   * @param {string} vehicleData.plateNumber - Plate number
   * @param {number} vehicleData.batteryLevel - Battery level (0-100)
   * @param {number} vehicleData.odometer - Odometer reading
   * @param {string} vehicleData.color - Vehicle color
   * @returns {Promise} Created vehicle
   */
  createVehicle: async (vehicleData) => {
    try {
      const formData = new FormData();
      formData.append('ModelID', vehicleData.modelId);
      formData.append('StationID', vehicleData.stationId);
      formData.append('Location', vehicleData.location);
      formData.append('PlateNumber', vehicleData.plateNumber);
      formData.append('BatteryLevel', vehicleData.batteryLevel);
      formData.append('Odometer', vehicleData.odometer);
      formData.append('Color', vehicleData.color);

      const response = await api.post('/Vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  /**
   * Get all vehicles
   * @returns {Promise} Vehicle list
   */
  getAllVehicles: async () => {
    try {
      const response = await api.get('/Vehicle');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }
};

export default vehicleService;
