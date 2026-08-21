import apiClient from './api';

export const adminService = {
  /**
   * Get Admin dashboard metrics & statistics
   */
  getDashboard: async () => {
    const response = await apiClient.get('admin/dashboard');
    return response.data || {};
  },

  /**
   * Get all registered users with role and status filters
   */
  getUsers: async (params = {}) => {
    const response = await apiClient.get('admin/users', params);
    return response.data || [];
  },

  /**
   * Get user details
   */
  getUserById: async (id) => {
    const response = await apiClient.get(`admin/users/${id}`);
    return response.data;
  },

  /**
   * Suspend a user account
   */
  suspendUser: async (id) => {
    const response = await apiClient.put(`admin/users/${id}/suspend`);
    return response.data;
  },

  /**
   * Reactivate a user account
   */
  activateUser: async (id) => {
    const response = await apiClient.put(`admin/users/${id}/activate`);
    return response.data;
  },

  /**
   * Get all rooms for admin review (including pending/rejected)
   */
  getRooms: async (params = {}) => {
    const response = await apiClient.get('admin/rooms', params);
    return response.data || [];
  },

  /**
   * Get single room for admin review
   */
  getRoomById: async (id) => {
    const response = await apiClient.get(`admin/rooms/${id}`);
    return response.data;
  },

  /**
   * Approve a room listing
   */
  approveRoom: async (id) => {
    const response = await apiClient.put(`admin/rooms/${id}/approve`);
    return response.data;
  },

  /**
   * Reject a room listing
   */
  rejectRoom: async (id, reason = 'Inaccurate photos or price mismatch.') => {
    const response = await apiClient.put(`admin/rooms/${id}/reject`, { reason });
    return response.data;
  },

  /**
   * Get all user reports
   */
  getReports: async (params = {}) => {
    const response = await apiClient.get('admin/reports', params);
    return response.data || [];
  },

  /**
   * Get single report details
   */
  getReportById: async (id) => {
    const response = await apiClient.get(`admin/reports/${id}`);
    return response.data;
  },

  /**
   * Update report status and add admin note
   */
  updateReport: async (id, data = {}) => {
    const response = await apiClient.put(`admin/reports/${id}`, data);
    return response.data;
  },

  /**
   * Get all reviews for moderation
   */
  getReviews: async (params = {}) => {
    const response = await apiClient.get('admin/reviews', params);
    return response.data || [];
  },

  /**
   * Update review status
   */
  updateReview: async (id, data = {}) => {
    const response = await apiClient.put(`admin/reviews/${id}`, data);
    return response.data;
  },

  /**
   * Delete abusive review
   */
  deleteReview: async (id) => {
    const response = await apiClient.delete(`admin/reviews/${id}`);
    return response;
  }
};

export default adminService;
