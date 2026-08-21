import apiClient from './api';

export const userService = {
  /**
   * Get user profile
   */
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('auth/me');
      return response.data;
    } catch {
      return null;
    }
  },

  /**
   * Update profile details (name, phone, gender, profile_image)
   */
  updateUserProfile: async (profileData) => {
    const isFormData = typeof FormData !== 'undefined' && profileData instanceof FormData;
    const response = await apiClient.put('user/profile', profileData);
    if (response?.data) {
      localStorage.setItem('rf_user', JSON.stringify(response.data));
    }
    return response;
  },

  /**
   * Change user password
   */
  changePassword: async ({ current_password, password, password_confirmation }) => {
    const response = await apiClient.put('user/password', {
      current_password,
      password,
      password_confirmation
    });
    return response;
  },

  /**
   * Submit a room report
   */
  reportRoom: async (roomId, reportData) => {
    const response = await apiClient.post(`rooms/${roomId}/reports`, reportData);
    return response.data;
  }
};

export default userService;
