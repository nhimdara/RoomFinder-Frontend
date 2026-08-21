import apiClient from './api';

export const roomService = {
  /**
   * Get all public approved rooms with filters & pagination
   */
  getRooms: async (filters = {}) => {
    const params = {};

    if (filters.search || filters.keyword) {
      params.search = filters.search || filters.keyword;
    }
    if (filters.minPrice !== undefined && filters.minPrice !== '' && filters.minPrice > 0) {
      params.min_price = filters.minPrice;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
      params.max_price = filters.maxPrice;
    }
    if (filters.roomType && filters.roomType !== 'all') {
      params.room_type = filters.roomType;
    }
    if (filters.genderAllowed && filters.genderAllowed !== 'any') {
      params.gender_allowed = filters.genderAllowed;
    }
    if (filters.availableDate) {
      params.available_date = filters.availableDate;
    }
    if (filters.distance) {
      params.distance = filters.distance;
    }
    if (filters.latitude && filters.longitude) {
      params.latitude = filters.latitude;
      params.longitude = filters.longitude;
      params.radius = filters.radius || 10;
    }
    if (filters.sortBy || filters.sort) {
      const sortMap = {
        'recommended': 'recommended',
        'price-low': 'price_low',
        'price-high': 'price_high',
        'price_asc': 'price_low',
        'price_desc': 'price_high',
        'rating': 'rating',
        'rating_desc': 'rating',
        'distance': 'distance',
        'newest': 'newest'
      };
      params.sort = sortMap[filters.sortBy || filters.sort] || filters.sortBy || filters.sort;
    }
    if (filters.amenities && Array.isArray(filters.amenities)) {
      filters.amenities.forEach((amenity) => {
        const key = amenity.toLowerCase().replace(/[\s-]/g, '_');
        params[key] = 1;
      });
    }
    if (filters.page) params.page = filters.page;
    if (filters.perPage || filters.per_page) params.per_page = filters.perPage || filters.per_page;

    const response = await apiClient.get('rooms', params);
    return response.data || [];
  },

  /**
   * Get featured rooms
   */
  getFeaturedRooms: async () => {
    const response = await apiClient.get('rooms/featured');
    return response.data || [];
  },

  /**
   * Get nearby rooms
   */
  getNearbyRooms: async (latitude = 11.5684, longitude = 104.8913, radius = 10) => {
    const response = await apiClient.get('rooms/nearby', { latitude, longitude, radius });
    return response.data || [];
  },

  /**
   * Get personalized recommended rooms for authenticated student
   */
  getRecommendedRooms: async () => {
    const response = await apiClient.get('rooms/recommended');
    return response.data || [];
  },

  /**
   * Get room by ID
   */
  getRoomById: async (id) => {
    const response = await apiClient.get(`rooms/${id}`);
    return response.data;
  },

  /**
   * Get reviews for a room
   */
  getRoomReviews: async (roomId) => {
    const response = await apiClient.get(`rooms/${roomId}/reviews`);
    return response.data || [];
  },

  /**
   * Get all platform amenities
   */
  getAmenities: async () => {
    const response = await apiClient.get('amenities');
    return response.data || [];
  },

  /**
   * Owner: Get rooms owned by authenticated landlord
   */
  getOwnerRooms: async () => {
    const response = await apiClient.get('owner/rooms');
    return response.data || [];
  },

  /**
   * Owner: Create a new room listing
   */
  createOwnerRoom: async (roomData) => {
    const response = await apiClient.post('owner/rooms', roomData);
    return response.data;
  },

  /**
   * Owner: Get owner's single room details
   */
  getOwnerRoomById: async (id) => {
    const response = await apiClient.get(`owner/rooms/${id}`);
    return response.data;
  },

  /**
   * Owner: Update room listing
   */
  updateOwnerRoom: async (id, roomData) => {
    const response = await apiClient.put(`owner/rooms/${id}`, roomData);
    return response.data;
  },

  /**
   * Owner: Delete room listing
   */
  deleteOwnerRoom: async (id) => {
    const response = await apiClient.delete(`owner/rooms/${id}`);
    return response;
  }
};

export default roomService;
