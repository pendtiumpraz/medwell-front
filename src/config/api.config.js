// API Configuration
// Manage different API URLs for different environments

const API_CONFIGS = {
  // Local development (Expo web, simulators)
  development: {
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 30000,
  },
  
  // Production server
  production: {
    baseURL: 'https://medwell.esteh.id/api/v1',
    timeout: 30000,
  },
  
  // Staging (optional)
  staging: {
    baseURL: 'https://staging.medwell.esteh.id/api/v1',
    timeout: 30000,
  },
};

// Get current environment
const ENV = __DEV__ ? 'development' : 'production';

// Export configuration based on environment
export const API_CONFIG = API_CONFIGS[ENV];

export default API_CONFIG;
