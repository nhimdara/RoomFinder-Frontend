import apiClient from './api';

/**
 * Authentication and OTP Verification Service using Laravel Sanctum Backend
 */
export const authService = {
  login: async (identifier, password, deviceName = 'web-browser') => {
    const response = await apiClient.post('auth/login', {
      identifier,
      password,
      device_name: deviceName
    });

    if (response?.data?.token) {
      localStorage.setItem('rf_token', response.data.token);
      localStorage.setItem('rf_user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('auth/register', userData);
    return response.data;
  },

  sendOtp: async (identifier, type = 'register') => {
    const response = await apiClient.post('auth/send-otp', {
      identifier,
      type
    });
    return response;
  },

  verifyOtp: async (identifier, otp, type = 'register', deviceName = 'web-browser') => {
    const response = await apiClient.post('auth/verify-otp', {
      identifier,
      otp,
      type,
      device_name: deviceName
    });

    if (response?.data?.token) {
      localStorage.setItem('rf_token', response.data.token);
      localStorage.setItem('rf_user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  resendOtp: async (identifier, type = 'register') => {
    const response = await apiClient.post('auth/resend-otp', {
      identifier,
      type
    });
    return response;
  },

  forgotPassword: async (identifier) => {
    const response = await apiClient.post('auth/forgot-password', {
      identifier
    });
    return response;
  },

  resetPassword: async ({ identifier, otp, password, password_confirmation }) => {
    const response = await apiClient.post('auth/reset-password', {
      identifier,
      otp,
      password,
      password_confirmation
    });
    return response;
  },

  getMe: async () => {
    try {
      const response = await apiClient.get('auth/me');
      if (response?.data) {
        localStorage.setItem('rf_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return null;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('auth/logout');
    } catch {
      // Continue clearing local state regardless
    } finally {
      localStorage.removeItem('rf_token');
      localStorage.removeItem('rf_user');
    }
    return { success: true };
  }
};

export default authService;
