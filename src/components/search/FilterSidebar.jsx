import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  DollarSign,
  Home,
  CheckSquare,
  Square,
  ShieldCheck,
  ArrowUpDown
} from 'lucide-react';
import { ROOM_TYPES, AMENITIES_LIST } from '../../constants/roomConstants';

export const FilterSidebar = ({ totalResults = 0, isMobileOpen = false, onCloseMobile = null }) => {
  const { searchFilters, setSearchFilters } = useApp();

  const handleReset = () => {
    setSearchFilters({
      keyword: '',
      roomType: 'all',
      minPrice: 0,
      maxPrice: 600,
      selectedAmenities: [],
      sortBy: 'recommended'
    });
  };

  const toggleAmenity = (amenity) => {
    setSearchFilters((prev) => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter((a) => a !== amenity)
          : [...prev.selectedAmenities, amenity]
      };
    });
  };

  return (
    <aside className={`filter-sidebar card ${isMobileOpen ? 'mobile-filter-open' : ''}`}>
      {/* Header with Title & Reset Button */}
      <div className="filter-header">
        <div className="filter-header-title">
          <SlidersHorizontal size={18} color="#2563EB" />
          <h3>Filters</h3>
          <span className="results-pill">{totalResults} rooms</span>
        </div>
        <button className="filter-reset-btn" onClick={handleReset} title="Reset all filters">
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Keyword Search */}
      <div className="filter-group">
        <label className="filter-label">
          <Search size={14} /> Location / University
        </label>
        <div className="filter-input-wrap">
          <input
            type="text"
            className="form-input"
            placeholder="Search campus, city or street..."
            value={searchFilters.keyword}
            onChange={(e) =>
              setSearchFilters((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Price Slider */}
      <div className="filter-group">
        <div className="filter-label-row">
          <label className="filter-label">
            <DollarSign size={14} /> Max Monthly Budget
          </label>
          <span className="price-range-val">${searchFilters.maxPrice}/mo</span>
        </div>
        <input
          type="range"
          min="100"
          max="600"
          step="10"
          className="price-slider"
          value={searchFilters.maxPrice}
          onChange={(e) =>
            setSearchFilters((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value)
            }))
          }
        />
        <div className="price-slider-scale">
          <span>$100</span>
          <span>$350</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Room Types */}
      <div className="filter-group">
        <label className="filter-label">
          <Home size={14} /> Room Category
        </label>
        <div className="filter-type-grid">
          {ROOM_TYPES.map((type) => {
            const isSelected = searchFilters.roomType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                className={`filter-type-chip ${isSelected ? 'selected' : ''}`}
                onClick={() =>
                  setSearchFilters((prev) => ({
                    ...prev,
                    roomType: type.value
                  }))
                }
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="filter-group">
        <label className="filter-label">
          <ArrowUpDown size={14} /> Sort By
        </label>
        <select
          className="form-select"
          value={searchFilters.sortBy}
          onChange={(e) =>
            setSearchFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value="recommended">⭐ Recommended & Verified</option>
          <option value="price-low">💵 Price: Low to High</option>
          <option value="price-high">💎 Price: High to Low</option>
          <option value="rating">🌟 Highest Rating</option>
        </select>
      </div>

      {/* Amenities Checkbox List */}
      <div className="filter-group">
        <label className="filter-label">Amenities & Features</label>
        <div className="amenities-checkbox-list">
          {AMENITIES_LIST.map((amenity) => {
            const checked = searchFilters.selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className={`amenity-checkbox-item ${checked ? 'checked' : ''}`}
                onClick={() => toggleAmenity(amenity)}
              >
                <div className="checkbox-box">
                  {checked ? (
                    <CheckSquare size={16} color="#2563EB" />
                  ) : (
                    <Square size={16} color="#94A3B8" />
                  )}
                </div>
                <span className="amenity-name">{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {isMobileOpen && onCloseMobile && (
        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%', marginTop: '16px' }}
          onClick={onCloseMobile}
        >
          Apply Filters ({totalResults} Rooms)
        </button>
      )}
    </aside>
  );
};
