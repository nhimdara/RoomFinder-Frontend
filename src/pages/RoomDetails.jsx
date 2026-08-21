import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import roomService from '../services/roomService';
import bookingService from '../services/bookingService';
import userService from '../services/userService';
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
  ShieldAlert,
  Loader2,
  Flag
} from 'lucide-react';

export const RoomDetails = () => {
  const { rooms, pageParams, navigateTo, favorites, toggleFavorite, addToast, currentUser } = useApp();

  const [room, setRoom] = useState(() => rooms.find((r) => r.id === pageParams || String(r.id) === String(pageParams)) || null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('incorrect_price');
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  // Fetch full room detail & reviews from backend
  useEffect(() => {
    const loadDetails = async () => {
      const targetId = pageParams || (rooms[0] && rooms[0].id);
      if (!targetId) return;

      setIsLoading(true);
      try {
        const data = await roomService.getRoomById(targetId);
        if (data) {
          setRoom(data);
          if (data.reviews) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        console.error('Failed to load room details:', err);
      } finally {
        setIsLoading(false);
      }

      try {
        const revData = await roomService.getRoomReviews(targetId);
        if (Array.isArray(revData)) {
          setReviews(revData);
        }
      } catch (e) {
        // reviews might already be inside room data
      }
    };

    loadDetails();
  }, [pageParams, rooms]);

  if (isLoading && !room) {
    return (
      <div className="app-container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <Loader2 size={36} className="spin-animate" style={{ color: 'var(--primary, #3b82f6)', margin: '0 auto 16px' }} />
        <h3>Loading Room Details...</h3>
      </div>
    );
  }

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

  const isFav = favorites.includes(room.id);

  // Normalize images
  const imageList = (room.images && room.images.length > 0)
    ? room.images.map((img) => (typeof img === 'string' ? img : img.url))
    : [room.image || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'];

  const roomType = room.room_type || room.roomType || 'Room';
  const isVerified = room.is_verified ?? room.verified ?? false;
  const rating = Number(room.average_rating || room.rating || 5.0).toFixed(1);
  const reviewCount = reviews.length || room.reviews_count || room.reviewCount || 0;
  const distance = room.distance_from_rupp !== undefined
    ? `${room.distance_from_rupp} km from RUPP campus`
    : room.distanceToCampus || 'Short walk to campus';

  const ownerObj = room.owner || room.landlord || {
    name: 'Verified Landlord',
    email: 'contact@roomfinder.com',
    phone: '012345678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  const amenitiesList = Array.isArray(room.amenities)
    ? room.amenities.map((a) => (typeof a === 'string' ? a : a.name))
    : ['Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Security'];

  const similarRooms = rooms.filter((r) => r.id !== room.id && (r.room_type === room.room_type || r.roomType === room.roomType)).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Listing link copied to clipboard! 📋');
    } else {
      addToast('Listing link ready to share');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('Please sign in as a student to book this room.', 'info');
      navigateTo('login');
      return;
    }
    if (currentUser.role !== 'student') {
      addToast('Only student accounts can send booking requests.', 'info');
      return;
    }

    setIsSubmittingBooking(true);
    try {
      await bookingService.createBooking({
        room_id: room.id,
        move_in_date: moveInDate,
        move_out_date: moveOutDate || null,
        message: bookingMessage
      });
      addToast('Booking request sent to landlord! 🎉', 'success');
      setIsBookingModalOpen(false);
      setBookingMessage('');
    } catch (err) {
      addToast(err.message || 'Failed to submit booking request.', 'danger');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('Please sign in to report a listing.', 'info');
      navigateTo('login');
      return;
    }

    setIsSubmittingReport(true);
    try {
      await userService.reportRoom(room.id, {
        reason: reportReason,
        description: reportDescription
      });
      addToast('Thank you. Your report has been submitted to admin moderation.', 'success');
      setIsReportModalOpen(false);
      setReportDescription('');
    } catch (err) {
      addToast(err.message || 'Failed to submit report.', 'danger');
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div className="room-details-page animate-fade-in">
      <div className="app-container">
        {/* Breadcrumbs & Back Bar */}
        <div className="details-nav-bar">
          <button className="details-back-btn" onClick={() => navigateTo('rooms')}>
            <ChevronLeft size={18} />
            <span>Back to All Rooms</span>
          </button>
          <div className="details-action-buttons">
            <button className="btn btn-secondary btn-sm" onClick={() => setIsReportModalOpen(true)}>
              <Flag size={15} />
              <span>Report</span>
            </button>
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
              <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                {roomType}
              </span>
              {isVerified && (
                <span className="badge badge-success">
                  <ShieldCheck size={14} /> Verified Student Housing
                </span>
              )}
              {room.status === 'rented' && (
                <span className="badge badge-warning">Currently Rented</span>
              )}
            </div>
            <h1 className="details-room-title">{room.title}</h1>
            <div className="details-meta-line">
              <div className="meta-item">
                <MapPin size={16} color="#64748b" />
                <span>{room.address || room.location || 'Phnom Penh, Cambodia'}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontWeight: 500 }}>{distance}</span>
              </div>
              <div className="meta-item">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 600 }}>{rating}</span>
                <span style={{ color: '#64748b' }}>({reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Price Header Card */}
          <div className="details-price-badge-header">
            <div className="price-big-num">
              <span className="currency">$</span>
              <span className="amount">{room.price}</span>
              <span className="term">/month</span>
            </div>
            <p className="price-sub">Available: {room.available_date || 'Now'}</p>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="details-gallery-grid">
          <div className="gallery-main-photo-wrap">
            <img
              src={imageList[activePhotoIdx] || imageList[0]}
              alt={room.title}
              className="gallery-main-img"
            />
            {imageList.length > 1 && (
              <>
                <button
                  className="gallery-nav-btn prev"
                  onClick={() =>
                    setActivePhotoIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
                  }
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="gallery-nav-btn next"
                  onClick={() =>
                    setActivePhotoIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
                  }
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="gallery-thumbnails-col">
            {imageList.slice(0, 4).map((photoUrl, idx) => (
              <div
                key={idx}
                className={`gallery-thumb-item ${activePhotoIdx === idx ? 'active-thumb' : ''}`}
                onClick={() => setActivePhotoIdx(idx)}
              >
                <img src={photoUrl} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout: Two Columns */}
        <div className="details-body-grid">
          {/* Left Column: Information & Amenities & Reviews */}
          <div className="details-main-column">
            {/* Quick Specs Bar */}
            <div className="card specs-card-bar">
              <div className="spec-bar-item">
                <Maximize2 size={20} className="spec-icon" />
                <div>
                  <span className="spec-label">Room Type</span>
                  <span className="spec-val" style={{ textTransform: 'capitalize' }}>
                    {roomType}
                  </span>
                </div>
              </div>
              <div className="spec-bar-item">
                <Calendar size={20} className="spec-icon" />
                <div>
                  <span className="spec-label">Gender Allowed</span>
                  <span className="spec-val" style={{ textTransform: 'capitalize' }}>
                    {room.gender_allowed || 'Any'}
                  </span>
                </div>
              </div>
              <div className="spec-bar-item">
                <Layers size={20} className="spec-icon" />
                <div>
                  <span className="spec-label">Distance to RUPP</span>
                  <span className="spec-val">{distance}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card details-section-card">
              <h3 className="section-card-title">About this Accommodation</h3>
              <p className="details-description-text" style={{ whiteSpace: 'pre-line' }}>
                {room.description ||
                  'Clean, comfortable student accommodation situated in a quiet neighborhood close to university faculties and transit.'}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="card details-section-card">
              <h3 className="section-card-title">Amenities & Highlights</h3>
              <div className="amenities-tag-grid">
                {amenitiesList.map((item, idx) => (
                  <div key={idx} className="amenity-feature-box">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reviews Section */}
            <div className="card details-section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="section-card-title" style={{ margin: 0 }}>
                  Student Reviews ({reviews.length})
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={18} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>{rating}</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  No reviews yet for this room. Be the first student to review!
                </p>
              ) : (
                <div className="reviews-list-stack">
                  {reviews.map((rev, idx) => (
                    <div key={rev.id || idx} className="review-item-card">
                      <div className="review-header-row">
                        <div className="reviewer-info">
                          <img
                            src={rev.user?.profile_image || rev.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                            alt={rev.user?.name || rev.author || 'Student'}
                            className="reviewer-avatar"
                          />
                          <div>
                            <div className="reviewer-name">{rev.user?.name || rev.author || 'Student Member'}</div>
                            <div className="review-date">{rev.created_at ? new Date(rev.created_at).toLocaleDateString() : rev.date || 'Recent'}</div>
                          </div>
                        </div>
                        <div className="review-stars-pill">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="review-text">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Host & Booking CTA */}
          <div className="details-sidebar-column">
            {/* Action / Booking Card */}
            <div className="card booking-action-sidebar-card">
              <div className="sidebar-price-header">
                <div>
                  <span className="sb-price">${room.price}</span>
                  <span className="sb-period"> / month</span>
                </div>
                <span className="badge badge-success">Available</span>
              </div>

              <div className="sidebar-booking-features">
                <div className="sb-feature-row">
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>No upfront agent broker fees</span>
                </div>
                <div className="sb-feature-row">
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>Verified university landlord</span>
                </div>
                <div className="sb-feature-row">
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>Direct landlord communication</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={() => setIsBookingModalOpen(true)}
              >
                Request Booking / Tour
              </button>

              <button
                className="btn btn-outline-primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => {
                  if (!currentUser) {
                    addToast('Please sign in to send a direct message.', 'info');
                    navigateTo('login');
                    return;
                  }
                  navigateTo('messages', { roomId: room.id, ownerId: ownerObj.id });
                }}
              >
                <MessageSquare size={16} />
                <span>Message Landlord</span>
              </button>
            </div>

            {/* Landlord Contact Profile Card */}
            <div className="card landlord-profile-card">
              <div className="landlord-card-header">
                <img
                  src={ownerObj.avatar || ownerObj.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={ownerObj.name}
                  className="landlord-full-avatar"
                />
                <div>
                  <h4 className="landlord-full-name">{ownerObj.name}</h4>
                  <span className="landlord-verified-tag">
                    <ShieldCheck size={13} /> Verified Property Landlord
                  </span>
                </div>
              </div>

              <div className="landlord-contact-methods">
                {ownerObj.phone && (
                  <div className="contact-row">
                    <Phone size={15} color="#64748b" />
                    <span>{ownerObj.phone}</span>
                  </div>
                )}
                {ownerObj.email && (
                  <div className="contact-row">
                    <Mail size={15} color="#64748b" />
                    <span>{ownerObj.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        {similarRooms.length > 0 && (
          <div className="similar-rooms-section" style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
              Similar Student Accommodations Nearby
            </h3>
            <div className="rooms-grid">
              {similarRooms.map((sRoom) => (
                <RoomCard key={sRoom.id} room={sRoom} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>Request Room Booking</h3>
              <button className="modal-close" onClick={() => setIsBookingModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div>
                <label className="form-label">Move-In Date</label>
                <input
                  type="date"
                  required
                  className="form-input"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Move-Out Date (Optional)</label>
                <input
                  type="date"
                  className="form-input"
                  value={moveOutDate}
                  onChange={(e) => setMoveOutDate(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Message / Note to Landlord</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  placeholder="Tell the landlord about yourself (faculty, academic year, preferred tour times)..."
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmittingBooking}>
                {isSubmittingBooking ? 'Submitting Request...' : 'Confirm Booking Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsReportModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>Report Listing</h3>
              <button className="modal-close" onClick={() => setIsReportModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div>
                <label className="form-label">Reason for Report</label>
                <select
                  className="form-select"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="incorrect_price">Incorrect Price / Hidden Fees</option>
                  <option value="fake_listing">Fake or Duplicate Listing</option>
                  <option value="scam">Suspected Scam</option>
                  <option value="incorrect_location">Incorrect Location</option>
                  <option value="inappropriate_content">Inappropriate Photos/Text</option>
                  <option value="owner_behavior">Unprofessional Owner Behavior</option>
                  <option value="other">Other Reason</option>
                </select>
              </div>
              <div>
                <label className="form-label">Description of Issue</label>
                <textarea
                  className="form-input"
                  rows={3}
                  required
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Provide details so our administrators can investigate..."
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmittingReport}>
                {isSubmittingReport ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
