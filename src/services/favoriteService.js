import apiClient from './api';

export const favoriteService = {
  /**
   * Get all student favorite rooms
   */
  getFavorites: async () => {
    const response = await apiClient.get('favorites');
    return response.data || [];
  },

  /**
   * Add a room to student favorites
   */
  addFavorite: async (roomId) => {
    const response = await apiClient.post(`favorites/${roomId}`);
    return response.data;
  },

  /**
   * Remove a room from student favorites
   */
  removeFavorite: async (roomId) => {
    const response = await apiClient.delete(`favorites/${roomId}`);
    return response;
  }
};

export default favoriteService;
