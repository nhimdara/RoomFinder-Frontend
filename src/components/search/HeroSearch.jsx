import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Home, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { ROOM_TYPES } from '../../constants/roomConstants';

export const HeroSearch = () => {
  const { searchFilters, setSearchFilters, navigateTo } = useApp();

  const [locationKeyword, setLocationKeyword] = useState(searchFilters.keyword || '');
  const [roomType, setRoomType] = useState(searchFilters.roomType || 'all');
  const [budgetTier, setBudgetTier] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();

    let min = 0;
    let max = 600;
    if (budgetTier === 'under200') {
      min = 0;
      max = 200;
    } else if (budgetTier === '200-350') {
      min = 200;
      max = 350;
    } else if (budgetTier === '350-500') {
      min = 350;
      max = 500;
    } else if (budgetTier === '500plus') {
      min = 500;
      max = 1000;
    }

    setSearchFilters((prev) => ({
      ...prev,
      keyword: locationKeyword,
      roomType: roomType,
      minPrice: min,
      maxPrice: max
    }));

    navigateTo('rooms');
  };

  const handleQuickTag = (tagType, value) => {
    if (tagType === 'keyword') {
      setSearchFilters((prev) => ({ ...prev, keyword: value }));
    } else if (tagType === 'type') {
      setSearchFilters((prev) => ({ ...prev, roomType: value }));
    } else if (tagType === 'amenity') {
      setSearchFilters((prev) => ({
        ...prev,
        selectedAmenities: [value]
      }));
    } else if (tagType === 'budget') {
      setSearchFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: value }));
    }
    navigateTo('rooms');
  };

  return (
    <div className="hero-search-wrapper">
      <form onSubmit={handleSearch} className="hero-search-card">
        {/* Location Input */}
        <div className="hero-search-col">
          <div className="hero-input-label">
            <MapPin size={15} color="#2563EB" />
            <span>Location or Campus</span>
          </div>
          <input
            type="text"
            className="hero-text-input"
            placeholder="e.g. Science Campus, District 1, Franklin..."
            value={locationKeyword}
            onChange={(e) => setLocationKeyword(e.target.value)}
          />
        </div>

        <div className="hero-search-divider" />

        {/* Room Type Selector */}
        <div className="hero-search-col">
          <div className="hero-input-label">
            <Home size={15} color="#2563EB" />
            <span>Room Type</span>
          </div>
          <select
            className="hero-select-input"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            {ROOM_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hero-search-divider" />

        {/* Budget Selector */}
        <div className="hero-search-col">
          <div className="hero-input-label">
            <DollarSign size={15} color="#2563EB" />
            <span>Budget</span>
          </div>
          <select
            className="hero-select-input"
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value)}
          >
            <option value="all">Any Price</option>
            <option value="under200">Under $200 / mo</option>
            <option value="200-350">$200 - $350 / mo</option>
            <option value="350-500">$350 - $500 / mo</option>
            <option value="500plus">$500+ / mo</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="hero-search-submit-btn">
          <Search size={18} strokeWidth={2.5} />
          <span>Find Rooms</span>
        </button>
      </form>

      {/* Popular Quick Suggestions Chips */}
      <div className="hero-quick-tags">
        <span className="quick-tags-label">
          <Sparkles size={14} color="#F59E0B" /> Popular Searches:
        </span>
        <button
          type="button"
          className="quick-chip"
          onClick={() => handleQuickTag('keyword', 'Science Campus')}
        >
          🎓 Science Campus
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => handleQuickTag('type', 'Studio')}
        >
          🏢 Private Studio
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => handleQuickTag('budget', 300)}
        >
          💰 Under $300
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => handleQuickTag('amenity', 'Private Bathroom')}
        >
          🚿 Private Bath
        </button>
      </div>
    </div>
  );
};
