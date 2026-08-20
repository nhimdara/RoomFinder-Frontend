import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { RoomGrid } from '../components/room/RoomGrid';
import { InteractiveMap } from '../components/map/InteractiveMap';
import {
  LayoutGrid,
  Columns,
  Map as MapIcon,
  SlidersHorizontal,
  Search,
  X
} from 'lucide-react';

export const Rooms = () => {
  const { rooms, searchFilters, setSearchFilters } = useApp();
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'map'
  const [selectedRoomOnMap, setSelectedRoomOnMap] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters to rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Keyword search (matches title, address, district, university)
      if (searchFilters.keyword) {
        const query = searchFilters.keyword.toLowerCase();
        const match =
          room.title.toLowerCase().includes(query) ||
          room.address.toLowerCase().includes(query) ||
          room.district.toLowerCase().includes(query) ||
          room.distanceToCampus.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Room Type filter
      if (searchFilters.roomType && searchFilters.roomType !== 'all') {
        if (room.roomType !== searchFilters.roomType) return false;
      }

      // Price filter
      if (room.price > searchFilters.maxPrice) return false;

      // Amenities filter (must contain all selected amenities)
      if (searchFilters.selectedAmenities && searchFilters.selectedAmenities.length > 0) {
        const hasAllAmenities = searchFilters.selectedAmenities.every((a) =>
          room.amenities.includes(a)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchFilters.sortBy === 'price-low') return a.price - b.price;
      if (searchFilters.sortBy === 'price-high') return b.price - a.price;
      if (searchFilters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [rooms, searchFilters]);

  return (
    <div className="rooms-explore-page animate-fade-in">
      <div className="app-container">
        {/* Top Control Bar */}
        <div className="rooms-top-bar">
          <div className="rooms-count-info">
            <h1 className="rooms-page-title">Available Student Rooms</h1>
            <p className="rooms-page-sub">
              Showing <strong>{filteredRooms.length}</strong> verified properties
              {searchFilters.keyword && ` matching "${searchFilters.keyword}"`}
            </p>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="view-mode-controls">
            {/* Mobile filter toggle trigger */}
            <button
              className="btn btn-secondary btn-sm mobile-filter-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <SlidersHorizontal size={15} />
              <span>Filters</span>
            </button>

            <div className="view-toggle-pill">
              <button
                className={`view-btn ${viewMode === 'split' ? 'active' : ''}`}
                onClick={() => setViewMode('split')}
                title="Split View (Grid & Map)"
              >
                <Columns size={16} />
                <span className="btn-label-desktop">Split View</span>
              </button>
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View Only"
              >
                <LayoutGrid size={16} />
                <span className="btn-label-desktop">Grid</span>
              </button>
              <button
                className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                title="Map View Only"
              >
                <MapIcon size={16} />
                <span className="btn-label-desktop">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags Bar */}
        {(searchFilters.keyword ||
          searchFilters.roomType !== 'all' ||
          searchFilters.maxPrice < 600 ||
          searchFilters.selectedAmenities.length > 0) && (
          <div className="active-filters-chips-bar">
            <span className="active-filters-label">Active Filters:</span>
            {searchFilters.keyword && (
              <span className="active-filter-chip">
                "{searchFilters.keyword}"
                <button
                  onClick={() =>
                    setSearchFilters((prev) => ({ ...prev, keyword: '' }))
                  }
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {searchFilters.roomType !== 'all' && (
              <span className="active-filter-chip">
                Type: {searchFilters.roomType}
                <button
                  onClick={() =>
                    setSearchFilters((prev) => ({ ...prev, roomType: 'all' }))
                  }
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {searchFilters.maxPrice < 600 && (
              <span className="active-filter-chip">
                Under ${searchFilters.maxPrice}/mo
                <button
                  onClick={() =>
                    setSearchFilters((prev) => ({ ...prev, maxPrice: 600 }))
                  }
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {searchFilters.selectedAmenities.map((amenity) => (
              <span key={amenity} className="active-filter-chip">
                {amenity}
                <button
                  onClick={() =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      selectedAmenities: prev.selectedAmenities.filter(
                        (a) => a !== amenity
                      )
                    }))
                  }
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Main Content Layout */}
        <div className={`rooms-main-layout view-${viewMode}`}>
          {/* Left Column: Filter Sidebar */}
          <div className="rooms-filter-col">
            <FilterSidebar
              totalResults={filteredRooms.length}
              isMobileOpen={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>

          {/* Middle Column: Room Listings */}
          {viewMode !== 'map' && (
            <div className="rooms-listings-col">
              <RoomGrid
                rooms={filteredRooms}
                selectedRoom={selectedRoomOnMap}
                onSelectRoom={(r) => setSelectedRoomOnMap(r)}
              />
            </div>
          )}

          {/* Right Column: Interactive Map */}
          {viewMode !== 'grid' && (
            <div className="rooms-map-col">
              <InteractiveMap
                rooms={filteredRooms}
                selectedRoom={selectedRoomOnMap}
                onSelectRoom={(r) => setSelectedRoomOnMap(r)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
