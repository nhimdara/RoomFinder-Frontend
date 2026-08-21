import apiClient from './api';

export const bookingService = {
  /**
   * Student: Get all my bookings
   */
  getStudentBookings: async () => {
    const response = await apiClient.get('bookings');
    return response.data || [];
  },

  /**
   * Student: Create a new booking request
   */
  createBooking: async (bookingData) => {
    const payload = {
      room_id: bookingData.roomId || bookingData.room_id,
      move_in_date: bookingData.moveInDate || bookingData.move_in_date,
      move_out_date: bookingData.moveOutDate || bookingData.move_out_date,
      message: bookingData.message || bookingData.notes || ''
    };
    const response = await apiClient.post('bookings', payload);
    return response.data;
  },

  /**
   * Student: Get single booking details
   */
  getBookingById: async (id) => {
    const response = await apiClient.get(`bookings/${id}`);
    return response.data;
  },

  /**
   * Student: Cancel a booking
   */
  cancelBooking: async (id) => {
    const response = await apiClient.put(`bookings/${id}/cancel`);
    return response.data;
  },

  /**
   * Owner: Get incoming booking requests for owner's rooms
   */
  getOwnerBookings: async () => {
    const response = await apiClient.get('owner/bookings');
    return response.data || [];
  },

  /**
   * Owner: Approve a booking request
   */
  approveOwnerBooking: async (id) => {
    const response = await apiClient.put(`owner/bookings/${id}/approve`);
    return response.data;
  },

  /**
   * Owner: Reject a booking request
   */
  rejectOwnerBooking: async (id) => {
    const response = await apiClient.put(`owner/bookings/${id}/reject`);
    return response.data;
  },

  /**
   * Admin: Get all platform bookings
   */
  getAdminBookings: async (params = {}) => {
    const response = await apiClient.get('admin/bookings', params);
    return response.data || [];
  },

  /**
   * Admin: Update booking status
   */
  updateAdminBooking: async (id, status) => {
    const response = await apiClient.put(`admin/bookings/${id}`, { status });
    return response.data;
  }
};

export default bookingService;
