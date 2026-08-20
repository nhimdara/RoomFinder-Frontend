import React from 'react';
import { POPULAR_LOCATIONS } from '../../data/mockRooms';

export const LocationFilter = ({ selectedLocation, onSelectLocation }) => {
  return (
    <div className="filter-group">
      <label className="filter-group-title">Campus & Hub Vicinity</label>
      <div className="filter-type-grid">
        <button
          type="button"
          className={`filter-type-chip ${!selectedLocation ? 'selected' : ''}`}
          onClick={() => onSelectLocation('')}
        >
          All Locations
        </button>
        {POPULAR_LOCATIONS.map((loc, idx) => (
          <button
            key={idx}
            type="button"
            className={`filter-type-chip ${selectedLocation === loc.name ? 'selected' : ''}`}
            onClick={() => onSelectLocation(selectedLocation === loc.name ? '' : loc.name)}
          >
            {loc.name.replace('University ', '')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationFilter;
