import apiClient from './client';

export const authAPI = {
  // Login (supports username or email)
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response;
  },

  // Register
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response;
  },

  // Get current user
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response;
  },
};

export default authAPI;
