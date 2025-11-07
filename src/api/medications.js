import apiClient from './client';

export const medicationsAPI = {
  // Get all medications
  getAll: async (params) => {
    return await apiClient.get('/medications', { params });
  },

  // Get medication detail
  getById: async (id) => {
    return await apiClient.get(`/medications/${id}`);
  },

  // Accept/decline consent
  consent: async (id, status, comment) => {
    return await apiClient.post(`/medications/${id}/consent`, {
      status,
      comment,
    });
  },

  // Get medication schedule
  getSchedule: async (params) => {
    return await apiClient.get('/medications/schedule', { params });
  },

  // Get today's schedule
  getTodaySchedule: async () => {
    return await apiClient.get('/medications/schedule/today');
  },

  // Log medication
  log: async (data) => {
    return await apiClient.post('/medications/log', data);
  },

  // Mark as taken
  markTaken: async (scheduleId) => {
    return await apiClient.post(`/medications/${scheduleId}/taken`);
  },

  // Mark as delayed
  markDelayed: async (scheduleId, minutes) => {
    return await apiClient.post(`/medications/${scheduleId}/delayed`, {
      delayed_minutes: minutes,
    });
  },

  // Mark as missed
  markMissed: async (scheduleId) => {
    return await apiClient.post(`/medications/${scheduleId}/missed`);
  },

  // Get adherence rate
  getAdherenceRate: async (period = 'week') => {
    return await apiClient.get('/medications/adherence/rate', {
      params: { period },
    });
  },
};

export default medicationsAPI;
