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
  Maximize2
} from 'lucide-react';

export const RoomCard = ({ room, isSelected = false, onSelect = null }) => {
  const { favorites, toggleFavorite, navigateTo } = useApp();
  if (!room) return null;

  const isFav = favorites.includes(room.id);

  // Extract normalized fields
  const firstImage =
    (room.images && room.images.length > 0 && (typeof room.images[0] === 'string' ? room.images[0] : room.images[0]?.url)) ||
    room.image ||
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';

  const roomType = room.room_type || room.roomType || 'Room';
  const price = room.price || 0;
  const rating = Number(room.average_rating || room.rating || 5.0).toFixed(1);
  const reviewCount = room.reviews_count ?? room.reviewCount ?? 0;
  const isVerified = room.is_verified ?? room.verified ?? false;
  const distance =
    room.distance_from_rupp !== undefined
      ? `${room.distance_from_rupp} km from RUPP`
      : room.distanceToCampus || 'Near campus';

  const ownerName = room.owner?.name || room.landlord?.name || 'Verified Owner';
  const ownerAvatar =
    room.owner?.avatar ||
    room.owner?.profile_image ||
    room.landlord?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  const sizeText = room.size || (roomType === 'apartment' ? '45 m²' : '25 m²');

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
          src={firstImage}
          alt={room.title}
          className="room-card-img"
          loading="lazy"
        />

        {/* Status & Category Badges */}
        <div className="room-card-top-badges">
          <span className="room-badge-type" style={{ textTransform: 'capitalize' }}>
            {roomType}
          </span>
          {room.status === 'rented' || room.status === 'occupied' ? (
            <span className="badge badge-warning">Rented</span>
          ) : null}
          {isVerified && (
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
            <span className="room-price-val">${price}</span>
            <span className="room-price-period">/ month</span>
          </div>
          {(room.electricity_included || room.water_included || room.utilitiesIncluded) && (
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
            <span className="rating-score">{rating}</span>
            <span className="review-count">({reviewCount})</span>
          </div>
          <div className="room-distance-tag">
            <span>{distance}</span>
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
          <span>{room.address || room.location || 'Phnom Penh, Cambodia'}</span>
        </div>

        {/* Key Features / Amenities */}
        <div className="room-amenities-row">
          <span className="amenity-chip">
            <Maximize2 size={13} /> {sizeText}
          </span>
          <span className="amenity-chip">
            <Wifi size={13} /> Wi-Fi
          </span>
          <span className="amenity-chip">
            <Wind size={13} /> AC
          </span>
          <span className="amenity-chip">
            <Bath size={13} /> {room.private_bathroom ? 'Private Bath' : 'Bathroom'}
          </span>
        </div>

        {/* Landlord Snippet & Action Button */}
        <div className="room-card-footer">
          <div className="room-landlord-brief">
            <img
              src={ownerAvatar}
              alt={ownerName}
              className="landlord-mini-avatar"
            />
            <div className="landlord-mini-text">
              <span className="landlord-mini-name">{ownerName}</span>
              <span className="landlord-mini-role">Landlord</span>
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

export default RoomCard;
