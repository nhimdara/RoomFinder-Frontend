import apiClient from './api';

export const notificationService = {
  /**
   * Get authenticated user's notifications
   */
  getNotifications: async () => {
    const response = await apiClient.get('notifications');
    return response.data || [];
  },

  /**
   * Mark a single notification as read
   */
  markRead: async (id) => {
    const response = await apiClient.put(`notifications/${id}/read`);
    return response.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllRead: async () => {
    const response = await apiClient.put('notifications/read-all');
    return response;
  }
};

export default notificationService;
