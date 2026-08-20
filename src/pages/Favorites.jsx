import React from 'react';
import { useApp } from '../context/AppContext';
import { RoomCard } from '../components/room/RoomCard';
import { Heart, Search, ArrowRight, Trash2 } from 'lucide-react';

export const Favorites = () => {
  const { rooms, favorites, navigateTo, setFavorites, addToast } = useApp();

  const favoriteRooms = rooms.filter((r) => favorites.includes(r.id));

  return (
    <div className="favorites-page animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <div className="section-header-row" style={{ marginTop: '24px', marginBottom: '24px' }}>
          <div>
            <span className="section-tag">SAVED LISTINGS</span>
            <h1 className="section-title">My Favorite Rooms ({favoriteRooms.length})</h1>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Compare your saved student rooms and book tours before they get taken.
            </p>
          </div>
          {favoriteRooms.length > 0 && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigateTo('rooms')}
            >
              <span>Explore More Rooms</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Favorite Rooms Grid or Empty State */}
        {favoriteRooms.length > 0 ? (
          <div className="rooms-grid-container">
            {favoriteRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="favorites-empty-state card">
            <div className="empty-fav-icon">
              <Heart size={44} color="#EF4444" fill="#FEE2E2" />
            </div>
            <h3>No Saved Rooms Yet</h3>
            <p>
              Click the heart icon on any room listing while browsing to save it to your wishlist and easily compare prices.
            </p>
            <button
              className="btn btn-primary btn-lg"
              style={{ marginTop: '16px' }}
              onClick={() => navigateTo('rooms')}
            >
              <Search size={18} />
              <span>Browse Student Rooms</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
