import apiClient from './api';

export const messageService = {
  /**
   * Get all active conversations for current user
   */
  getConversations: async () => {
    const response = await apiClient.get('conversations');
    return response.data || [];
  },

  /**
   * Start a new conversation for a room
   */
  createConversation: async (roomId) => {
    const response = await apiClient.post('conversations', { room_id: roomId });
    return response.data;
  },

  /**
   * Get conversation details
   */
  getConversationById: async (id) => {
    const response = await apiClient.get(`conversations/${id}`);
    return response.data;
  },

  /**
   * Get paginated messages in a conversation
   */
  getMessages: async (conversationId, page = 1) => {
    const response = await apiClient.get(`conversations/${conversationId}/messages`, { page });
    return response.data || [];
  },

  /**
   * Send a message in a conversation
   */
  sendMessage: async (conversationId, messageText, imageFile = null) => {
    let payload;
    if (imageFile) {
      payload = new FormData();
      payload.append('message', messageText || '');
      payload.append('image', imageFile);
    } else {
      payload = { message: messageText };
    }

    const response = await apiClient.post(`conversations/${conversationId}/messages`, payload);
    return response.data;
  },

  /**
   * Mark conversation messages as read
   */
  markConversationRead: async (conversationId) => {
    const response = await apiClient.put(`conversations/${conversationId}/read`);
    return response;
  },

  /**
   * Mark individual message as read
   */
  markMessageRead: async (messageId) => {
    const response = await apiClient.put(`messages/${messageId}/read`);
    return response;
  }
};

export default messageService;
