import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InquiryModal } from '../components/room/InquiryModal';
import { RoomCard } from '../components/room/RoomCard';
import {
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  Star,
  Maximize2,
  Calendar,
  Layers,
  Clock,
  Wifi,
  Wind,
  Bath,
  CheckCircle2,
  MessageSquare,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Car,
  Utensils,
  Dumbbell,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export const RoomDetails = () => {
  const { rooms, pageParams, navigateTo, favorites, toggleFavorite, addToast } = useApp();

  // Selected room by ID or default to first
  const room = rooms.find((r) => r.id === pageParams) || rooms[0];
  const isFav = favorites.includes(room?.id);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!room) {
    return (
      <div className="app-container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Room Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('rooms')}>
          Back to Explore
        </button>
      </div>
    );
  }

  const similarRooms = rooms.filter((r) => r.id !== room.id && r.roomType === room.roomType).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Listing link copied to clipboard! 📋');
    } else {
      addToast('Listing link ready to share');
    }
  };

  return (
    <div className="room-details-page animate-fade-in">
      <div className="app-container">
        {/* Breadcrumbs & Back Bar */}
        <div className="details-nav-bar">
          <button
            className="details-back-btn"
            onClick={() => navigateTo('rooms')}
          >
            <ChevronLeft size={18} />
            <span>Back to All Rooms</span>
          </button>
          <div className="details-action-buttons">
            <button className="btn btn-secondary btn-sm" onClick={handleShare}>
              <Share2 size={15} />
              <span>Share</span>
            </button>
            <button
              className={`btn btn-secondary btn-sm ${isFav ? 'btn-fav-active' : ''}`}
              onClick={() => toggleFavorite(room.id)}
            >
              <Heart
                size={15}
                color={isFav ? '#ef4444' : 'currentColor'}
                fill={isFav ? '#ef4444' : 'none'}
              />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title & Location Header */}
        <div className="details-header-section">
          <div className="details-title-stack">
            <div className="details-badge-row">
              <span className="badge badge-primary">{room.roomType}</span>
              {room.verified && (
                <span className="badge badge-success">
                  <ShieldCheck size={13} /> Verified Listing
                </span>
              )}
              {room.status === 'occupied' && (
                <span className="badge badge-warning">Currently Occupied</span>
              )}
            </div>
            <h1 className="details-main-title">{room.title}</h1>
            <div className="details-meta-row">
              <div className="details-address">
                <MapPin size={16} color="#2563EB" />
                <span>{room.address}, {room.city}</span>
              </div>
              <div className="details-rating-badge">
                <Star size={15} fill="#F59E0B" color="#F59E0B" />
                <span><strong>{room.rating.toFixed(1)}</strong> ({room.reviewCount} verified reviews)</span>
              </div>
              <div className="details-campus-dist">
                <GraduationCap size={16} color="#059669" />
                <span>{room.distanceToCampus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid (Figma Mosaic Style) */}
        <div className="details-gallery-grid">
          <div
            className="gallery-hero-photo"
            onClick={() => {
              setActivePhotoIdx(0);
              setIsLightboxOpen(true);
            }}
          >
            <img src={room.images[0]} alt={room.title} />
            <span className="gallery-view-all-btn">
              <span>View All {room.images.length} Photos</span>
            </span>
          </div>

          <div className="gallery-thumbs-col">
            {room.images.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                className="gallery-thumb-wrap"
                onClick={() => {
                  setActivePhotoIdx(idx + 1);
                  setIsLightboxOpen(true);
                }}
              >
                <img src={imgUrl} alt={`${room.title} preview ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Split: Left (Details & Amenities) / Right (Sticky Booking Card) */}
        <div className="details-body-layout">
          {/* Left Column */}
          <div className="details-content-main">
            {/* Quick Key Specs Bar */}
            <div className="details-specs-grid card">
              <div className="spec-card">
                <span className="spec-label">Room Type</span>
                <strong className="spec-val">{room.roomType}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Room Area</span>
                <strong className="spec-val">{room.size}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Floor</span>
                <strong className="spec-val">{room.floor}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Available From</span>
                <strong className="spec-val">{room.availableFrom}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Min. Lease</span>
                <strong className="spec-val">{room.minLease}</strong>
              </div>
            </div>

            {/* Room Description */}
            <div className="details-section-block">
              <h2 className="details-sub-title">About this Property</h2>
              <p className="details-desc-paragraph">{room.description}</p>
            </div>

            {/* Amenities Grid */}
            <div className="details-section-block">
              <h2 className="details-sub-title">Amenities & Features</h2>
              <div className="details-amenities-grid">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="details-amenity-item">
                    <div className="amenity-check-circle">
                      <CheckCircle2 size={16} color="#2563EB" />
                    </div>
                    <span className="amenity-text">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proximity & Nearby Landmarks */}
            <div className="details-section-block">
              <h2 className="details-sub-title">Campus & Transit Proximity</h2>
              <div className="proximity-cards-grid">
                {room.nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="proximity-card card">
                    <MapPin size={18} color="#2563EB" />
                    <div>
                      <h4 className="proximity-name">{place.name}</h4>
                      <p className="proximity-dist">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="details-section-block">
              <h2 className="details-sub-title">House Rules & Policies</h2>
              <div className="house-rules-list">
                {room.houseRules.map((rule, idx) => (
                  <div key={idx} className="house-rule-item">
                    <Info size={16} color="#64748B" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Tenant Reviews */}
            <div className="details-section-block">
              <div className="section-header-row" style={{ marginBottom: '16px' }}>
                <div>
                  <h2 className="details-sub-title" style={{ margin: 0 }}>
                    Tenant Reviews ({room.reviews?.length || 0})
                  </h2>
                </div>
                <div className="reviews-average-chip">
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <strong>{room.rating.toFixed(1)}</strong> out of 5
                </div>
              </div>

              <div className="reviews-list-col">
                {room.reviews && room.reviews.length > 0 ? (
                  room.reviews.map((rev) => (
                    <div key={rev.id} className="review-card card">
                      <div className="review-header">
                        <img src={rev.avatar} alt={rev.author} className="review-avatar" />
                        <div>
                          <h4 className="review-author">{rev.author}</h4>
                          <p className="review-role">{rev.role} • {rev.date}</p>
                        </div>
                        <div className="review-stars">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="empty-reviews-text">No reviews yet. Be the first student to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Landlord Action Card */}
          <div className="details-sidebar-col">
            <div className="booking-card card">
              {/* Pricing Header */}
              <div className="booking-price-header">
                <div className="booking-price-stack">
                  <span className="booking-price-num">${room.price}</span>
                  <span className="booking-price-period">/ month</span>
                </div>
                {room.utilitiesIncluded ? (
                  <span className="badge badge-success">Utilities Included</span>
                ) : (
                  <span className="badge badge-gray">+ Bills Approx. $30/mo</span>
                )}
              </div>

              <div className="booking-deposit-info">
                <span>Security Deposit: <strong>${room.deposit}</strong> (Refundable)</span>
              </div>

              <div className="booking-divider" />

              {/* Verified Landlord Profile */}
              <div className="booking-host-profile">
                <img
                  src={room.landlord.avatar}
                  alt={room.landlord.name}
                  className="booking-host-avatar"
                />
                <div className="booking-host-meta">
                  <span className="host-name">{room.landlord.name}</span>
                  <span className="host-status">
                    <ShieldCheck size={13} color="#10B981" /> Verified Superhost
                  </span>
                  <span className="host-response-speed">
                    ⚡ Responds {room.landlord.responseTime}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="booking-action-buttons">
                <button
                  className="btn btn-primary btn-lg booking-cta-btn"
                  onClick={() => setIsInquiryModalOpen(true)}
                >
                  <Calendar size={18} />
                  <span>Schedule a Tour</span>
                </button>

                <button
                  className="btn btn-secondary btn-lg booking-message-btn"
                  onClick={() => setIsInquiryModalOpen(true)}
                >
                  <MessageSquare size={18} />
                  <span>Send Message to Host</span>
                </button>
              </div>

              <div className="booking-phone-direct">
                <Phone size={14} color="#64748B" />
                <span>Call Landlord: <strong>{room.landlord.phone}</strong></span>
              </div>

              {/* Trust Guarantees */}
              <div className="booking-guarantees">
                <div className="guarantee-item">
                  <ShieldCheck size={15} color="#10B981" />
                  <span>Zero upfront booking fees</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>RoomFinder student lease protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms Recommendation */}
        {similarRooms.length > 0 && (
          <div className="details-similar-section">
            <h2 className="section-title">Similar {room.roomType} Rooms You Might Like</h2>
            <div className="rooms-grid-container" style={{ marginTop: '20px' }}>
              {similarRooms.map((simRoom) => (
                <RoomCard key={simRoom.id} room={simRoom} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry / Tour Modal */}
      <InquiryModal
        room={room}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
};
