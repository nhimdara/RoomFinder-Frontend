import React from 'react';

export const PriceFilter = ({
  minPrice = 0,
  maxPrice = 600,
  currentMax = 600,
  onChange
}) => {
  return (
    <div className="filter-group">
      <div className="price-slider-header">
        <label className="filter-group-title">Monthly Budget</label>
        <span className="price-range-badge">Up to ${currentMax}/mo</span>
      </div>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={10}
        value={currentMax}
        onChange={(e) => onChange(Number(e.target.value))}
        className="price-range-slider"
      />
      <div className="price-slider-labels">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
