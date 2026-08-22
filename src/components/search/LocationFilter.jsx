import React from 'react';
import { useApp } from '../../context/AppContext';

export const LocationFilter = ({ selectedLocation, onSelectLocation }) => {
  const { popularLocations } = useApp();

  return (
    <div className="filter-group">
      <label className="filter-group-title">Campus &amp; Hub Vicinity</label>
      <div className="filter-type-grid">
        <button
          type="button"
          className={`filter-type-chip ${!selectedLocation ? 'selected' : ''}`}
          onClick={() => onSelectLocation('')}
        >
          All Locations
        </button>
        {popularLocations.map((loc, idx) => (
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
