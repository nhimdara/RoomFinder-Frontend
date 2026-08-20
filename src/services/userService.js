export const userService = {
  getUserProfile: () => {
    try {
      const saved = localStorage.getItem('rf_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  updateUserProfile: (profileData) => {
    try {
      localStorage.setItem('rf_user', JSON.stringify(profileData));
      return { success: true, profile: profileData };
    } catch {
      return { success: false };
    }
  }
};

export default userService;
