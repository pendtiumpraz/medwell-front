import apiClient from './client';

export const vitalsAPI = {
  // Log blood pressure
  logBloodPressure: async (data) => {
    return await apiClient.post('/vitals/blood-pressure', data);
  },

  // Log blood glucose
  logGlucose: async (data) => {
    return await apiClient.post('/vitals/blood-glucose', data);
  },

  // Log temperature
  logTemperature: async (data) => {
    return await apiClient.post('/vitals/temperature', data);
  },

  // Log SpO2
  logSpo2: async (data) => {
    return await apiClient.post('/vitals/spo2', data);
  },

  // Log weight
  logWeight: async (data) => {
    return await apiClient.post('/vitals/weight', data);
  },

  // Get vital history
  getHistory: async (params) => {
    return await apiClient.get('/vitals/history', { params });
  },

  // Get vital trends
  getTrends: async (params) => {
    return await apiClient.get('/vitals/trends', { params });
  },

  // Get latest vitals
  getLatest: async () => {
    return await apiClient.get('/vitals/latest');
  },
};

export default vitalsAPI;
