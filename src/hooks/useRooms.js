import { useApp } from '../context/AppContext';

export const useRooms = () => {
  const {
    rooms,
    favorites,
    toggleFavorite,
    searchFilters,
    setSearchFilters,
    addRoom,
    updateRoom,
    deleteRoom,
    toggleRoomStatus,
    inquiries,
    submitInquiry
  } = useApp();

  return {
    rooms,
    favorites,
    toggleFavorite,
    searchFilters,
    setSearchFilters,
    addRoom,
    updateRoom,
    deleteRoom,
    toggleRoomStatus,
    inquiries,
    submitInquiry
  };
};

export default useRooms;
