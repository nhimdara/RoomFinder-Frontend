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
  X,
  Loader2
} from 'lucide-react';

export const Rooms = () => {
  const { rooms, searchFilters, setSearchFilters, isLoadingRooms } = useApp();
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'map'
  const [selectedRoomOnMap, setSelectedRoomOnMap] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters to rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Keyword search (matches title, address, description)
      if (searchFilters.keyword) {
        const query = searchFilters.keyword.toLowerCase().trim();
        const titleMatch = (room.title || '').toLowerCase().includes(query);
        const addressMatch = (room.address || room.location || '').toLowerCase().includes(query);
        const descMatch = (room.description || '').toLowerCase().includes(query);
        if (!titleMatch && !addressMatch && !descMatch) return false;
      }

      // Room Type filter
      if (searchFilters.roomType && searchFilters.roomType !== 'all') {
        const rType = (room.room_type || room.roomType || '').toLowerCase();
        if (rType !== searchFilters.roomType.toLowerCase()) return false;
      }

      // Price filter
      if (searchFilters.maxPrice && room.price > searchFilters.maxPrice) return false;
      if (searchFilters.minPrice && room.price < searchFilters.minPrice) return false;

      // Amenities filter (must contain all selected amenities)
      if (searchFilters.selectedAmenities && searchFilters.selectedAmenities.length > 0) {
        const roomAmenities = Array.isArray(room.amenities)
          ? room.amenities.map((a) => (typeof a === 'string' ? a.toLowerCase() : (a.name || '').toLowerCase()))
          : [];
        const hasAll = searchFilters.selectedAmenities.every((a) =>
          roomAmenities.some((ra) => ra.includes(a.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchFilters.sortBy === 'price-low') return a.price - b.price;
      if (searchFilters.sortBy === 'price-high') return b.price - a.price;
      if (searchFilters.sortBy === 'rating') return (b.average_rating || b.rating || 0) - (a.average_rating || a.rating || 0);
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

        {/* Main Content Layout */}
        <div className="rooms-content-layout">
          {/* Left Sidebar Filter */}
          <aside className={`rooms-filter-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="mobile-filter-header">
              <h3>Filter Rooms</h3>
              <button
                className="close-filter-btn"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar />
          </aside>

          {/* Center / Right Content Panel */}
          <main className="rooms-main-view">
            {isLoadingRooms ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Loader2 size={32} className="spin-animate" style={{ color: 'var(--primary, #3b82f6)', margin: '0 auto 12px' }} />
                <p style={{ color: '#64748b' }}>Fetching accommodation listings...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="empty-rooms-card card text-center">
                <Search size={42} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
                <h3>No Rooms Found</h3>
                <p>Try adjusting your search terms, price limit, or removing some amenities filters.</p>
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '16px' }}
                  onClick={() =>
                    setSearchFilters({
                      keyword: '',
                      roomType: 'all',
                      minPrice: 0,
                      maxPrice: 600,
                      selectedAmenities: [],
                      sortBy: 'recommended'
                    })
                  }
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'split' && (
                  <div className="split-view-container">
                    <div className="split-grid-col">
                      <RoomGrid
                        rooms={filteredRooms}
                        selectedRoomId={selectedRoomOnMap?.id}
                        onRoomSelect={(r) => setSelectedRoomOnMap(r)}
                      />
                    </div>
                    <div className="split-map-col">
                      <InteractiveMap
                        rooms={filteredRooms}
                        selectedRoom={selectedRoomOnMap}
                        onSelectRoom={(r) => setSelectedRoomOnMap(r)}
                      />
                    </div>
                  </div>
                )}

                {viewMode === 'grid' && (
                  <div className="grid-only-container">
                    <RoomGrid rooms={filteredRooms} />
                  </div>
                )}

                {viewMode === 'map' && (
                  <div className="map-only-container">
                    <InteractiveMap
                      rooms={filteredRooms}
                      selectedRoom={selectedRoomOnMap}
                      onSelectRoom={(r) => setSelectedRoomOnMap(r)}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
