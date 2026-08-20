import { INITIAL_ROOMS } from '../data/mockRooms';

export const roomService = {
  getAllRooms: () => {
    try {
      const saved = localStorage.getItem('rf_rooms');
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  },

  getRoomById: (id) => {
    const all = roomService.getAllRooms();
    return all.find((r) => r.id === id) || null;
  },

  searchRooms: (filters) => {
    const rooms = roomService.getAllRooms();
    return rooms.filter((r) => {
      if (filters.keyword) {
        const query = filters.keyword.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(query);
        const matchesAddress = r.address.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAddress) return false;
      }
      if (filters.roomType && filters.roomType !== 'all') {
        if (r.roomType !== filters.roomType) return false;
      }
      if (filters.maxPrice && r.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }
};

export default roomService;
