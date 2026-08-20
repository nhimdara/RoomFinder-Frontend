import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Star,
  MapPin,
  ShieldCheck,
  Wifi,
  Wind,
  Bath,
  Maximize2,
  Calendar,
  Check
} from 'lucide-react';

export const RoomCard = ({ room, isSelected = false, onSelect = null }) => {
  const { favorites, toggleFavorite, navigateTo } = useApp();
  const isFav = favorites.includes(room.id);

  return (
    <div
      className={`room-card card ${isSelected ? 'selected-border' : ''}`}
      onClick={() => {
        if (onSelect) onSelect(room);
      }}
    >
      {/* Image Thumbnail Container */}
      <div className="room-card-image-wrap">
        <img
          src={room.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
          alt={room.title}
          className="room-card-img"
          loading="lazy"
        />

        {/* Status & Category Badges */}
        <div className="room-card-top-badges">
          <span className="room-badge-type">{room.roomType}</span>
          {room.status === 'occupied' && (
            <span className="badge badge-warning">Occupied</span>
          )}
          {room.verified && (
            <span className="room-badge-verified">
              <ShieldCheck size={13} /> Verified
            </span>
          )}
        </div>

        {/* Heart / Favorite Button */}
        <button
          className={`room-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(room.id);
          }}
          title={isFav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            size={18}
            color={isFav ? '#ef4444' : '#ffffff'}
            fill={isFav ? '#ef4444' : 'rgba(0,0,0,0.3)'}
          />
        </button>

        {/* Price Overlay Banner */}
        <div className="room-card-price-overlay">
          <div className="room-price-stack">
            <span className="room-price-val">${room.price}</span>
            <span className="room-price-period">/ month</span>
          </div>
          {room.utilitiesIncluded && (
            <span className="room-util-tag">Bills Incl.</span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="room-card-content">
        {/* Rating and Distance */}
        <div className="room-card-meta-row">
          <div className="room-rating-pill">
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span className="rating-score">{room.rating.toFixed(1)}</span>
            <span className="review-count">({room.reviewCount})</span>
          </div>
          <div className="room-distance-tag">
            <span>{room.distanceToCampus}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="room-card-title"
          title={room.title}
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('room-details', room.id);
          }}
        >
          {room.title}
        </h3>

        {/* Address */}
        <div className="room-card-address">
          <MapPin size={14} color="#64748B" />
          <span>{room.address}</span>
        </div>

        {/* Key Features / Amenities */}
        <div className="room-amenities-row">
          <span className="amenity-chip">
            <Maximize2 size={13} /> {room.size}
          </span>
          <span className="amenity-chip">
            <Wifi size={13} /> Wi-Fi
          </span>
          <span className="amenity-chip">
            <Wind size={13} /> AC
          </span>
          <span className="amenity-chip">
            <Bath size={13} /> {room.roomType === 'Shared' ? 'Shared Bath' : 'Private Bath'}
          </span>
        </div>

        {/* Landlord Snippet & Action Button */}
        <div className="room-card-footer">
          <div className="room-landlord-brief">
            <img
              src={room.landlord.avatar}
              alt={room.landlord.name}
              className="landlord-mini-avatar"
            />
            <div className="landlord-mini-text">
              <span className="landlord-mini-name">{room.landlord.name}</span>
              <span className="landlord-mini-role">Superhost</span>
            </div>
          </div>

          <button
            className="btn btn-outline-primary btn-sm room-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('room-details', room.id);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
