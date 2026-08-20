/**
 * Base API client service for RoomFinder
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = {
  get: async (endpoint) => {
    // Simulated mock API latency for instant response
    return Promise.resolve({ data: null, status: 200 });
  },
  post: async (endpoint, data) => {
    return Promise.resolve({ data, status: 200 });
  },
  put: async (endpoint, data) => {
    return Promise.resolve({ data, status: 200 });
  },
  delete: async (endpoint) => {
    return Promise.resolve({ success: true, status: 200 });
  }
};

export default apiClient;
