import React from 'react';
import { RoomCard } from './RoomCard';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoomGrid = ({ rooms, selectedRoom = null, onSelectRoom = null, emptyMessage = null }) => {
  const { navigateTo, setSearchFilters } = useApp();

  if (!rooms || rooms.length === 0) {
    return (
      <div className="room-grid-empty card">
        <div className="empty-icon-circle">
          <SearchX size={36} color="#3B82F6" />
        </div>
        <h3 className="empty-title">No matching rooms found</h3>
        <p className="empty-desc">
          {emptyMessage || "Try broadening your filters, adjusting the price slider, or selecting 'All Types'."}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSearchFilters({
              keyword: '',
              roomType: 'all',
              minPrice: 0,
              maxPrice: 600,
              selectedAmenities: [],
              sortBy: 'recommended'
            });
            navigateTo('rooms');
          }}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="rooms-grid-container">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          isSelected={selectedRoom?.id === room.id}
          onSelect={onSelectRoom}
        />
      ))}
    </div>
  );
};
