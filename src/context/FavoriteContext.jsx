import React, { createContext, useContext } from 'react';
import { useApp } from './AppContext';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { favorites, toggleFavorite, rooms } = useApp();

  const favoriteRooms = rooms.filter((r) => favorites.includes(r.id));

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoriteRooms,
        toggleFavorite,
        isFavorite: (roomId) => favorites.includes(roomId),
        count: favorites.length
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);

export default FavoriteContext;
