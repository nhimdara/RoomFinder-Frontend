/**
 * Authentication and OTP Verification Service
 */
export const authService = {
  login: async (email, password, role = 'student') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `user-${Date.now()}`,
          email,
          role,
          name: role === 'owner' ? 'Sarah Jenkins' : role === 'admin' ? 'Super Admin' : 'Alex Rivera',
          token: `jwt-mock-${Date.now()}`
        });
      }, 200);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...userData,
          id: `user-${Date.now()}`,
          token: `jwt-mock-${Date.now()}`
        });
      }, 200);
    });
  },

  sendOtp: async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return { success: true, email, otp };
  },

  verifyOtp: async (email, code, expectedCode) => {
    const isValid = code === expectedCode || code === '849201';
    return { success: isValid };
  },

  resetPassword: async (email, newPassword) => {
    return { success: true, message: 'Password updated successfully' };
  }
};

export default authService;
