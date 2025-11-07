import apiClient from './client';

export const wearablesAPI = {
  // Get connection status
  getStatus: async () => {
    return await apiClient.get('/wearables/status');
  },

  // Sync Fitbit data
  syncFitbit: async () => {
    return await apiClient.post('/wearables/fitbit/sync');
  },

  // Sync Huawei data
  syncHuawei: async () => {
    return await apiClient.post('/wearables/huawei/sync');
  },

  // Sync Apple Watch data (send from HealthKit)
  syncApple: async (healthData) => {
    return await apiClient.post('/wearables/apple/sync', healthData);
  },

  // Disconnect wearable
  disconnect: async () => {
    return await apiClient.delete('/wearables/disconnect');
  },

  // Get wearable data
  getData: async (params) => {
    return await apiClient.get('/wearables/data', { params });
  },

  // Get today's data
  getTodayData: async () => {
    return await apiClient.get('/wearables/data/today');
  },
};

export default wearablesAPI;
