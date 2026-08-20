import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, MessageSquare, Phone, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const InquiryModal = ({ room, isOpen, onClose }) => {
  const { currentUser, submitInquiry, setIsAuthModalOpen, setAuthMode } = useApp();

  const [date, setDate] = useState('2026-09-01');
  const [inquiryType, setInquiryType] = useState('tour'); // 'tour' | 'book' | 'question'
  const [duration, setDuration] = useState('12 Months');
  const [message, setMessage] = useState(
    `Hello ${room?.landlord?.name || 'Host'}, I am very interested in "${room?.title}". Could we schedule an in-person or video tour?`
  );
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-8901');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !room) return null;

  // If user is not logged in / is guest: Show Sign In Requirement Card
  if (!currentUser || currentUser.isGuest) {
    return (
      <div className="modal-backdrop animate-fade-in" onClick={onClose}>
        <div
          className="modal-content"
          style={{ maxWidth: '440px', padding: '36px 28px', textAlign: 'center', borderRadius: '16px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <User size={28} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Sign In Required
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
            Please log in or create a student account to message verified landlords and schedule room tours.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', borderRadius: '10px' }}
            onClick={() => {
              onClose();
              setAuthMode('login');
              setIsAuthModalOpen(true);
            }}
          >
            <span>Sign In to Continue</span>
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      roomId: room.id,
      roomTitle: room.title,
      roomImage: room.images[0],
      landlordName: room.landlord.name,
      landlordEmail: room.landlord.email,
      moveInDate: date,
      duration: duration,
      inquiryType: inquiryType,
      message: message,
      applicantPhone: phone
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content inquiry-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="inquiry-success-state animate-fade-in">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} color="#10B981" />
            </div>
            <h3>Inquiry Sent Successfully!</h3>
            <p>
              Landlord <strong>{room.landlord.name}</strong> has received your request and typically responds within <strong>{room.landlord.responseTime}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="inquiry-header">
              <h3 className="inquiry-modal-title">Contact Landlord / Schedule Tour</h3>
              <div className="inquiry-room-snippet">
                <img src={room.images[0]} alt={room.title} className="inquiry-room-img" />
                <div>
                  <h4 className="inquiry-room-name">{room.title}</h4>
                  <p className="inquiry-room-price">
                    <strong>${room.price}</strong> / month • {room.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Landlord Contact Card */}
            <div className="inquiry-host-banner">
              <img src={room.landlord.avatar} alt={room.landlord.name} className="host-banner-avatar" />
              <div>
                <div className="host-banner-title">
                  <strong>{room.landlord.name}</strong>
                  <span className="badge badge-success" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    <ShieldCheck size={12} /> Verified Host
                  </span>
                </div>
                <p className="host-banner-rate">⚡ Response rate: {room.landlord.responseRate} ({room.landlord.responseTime})</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="inquiry-form">
              {/* Type of request */}
              <div className="form-group">
                <label className="form-label">Request Type</label>
                <div className="inquiry-type-tabs">
                  <button
                    type="button"
                    className={`type-tab ${inquiryType === 'tour' ? 'active' : ''}`}
                    onClick={() => setInquiryType('tour')}
                  >
                    📅 Schedule Tour
                  </button>
                  <button
                    type="button"
                    className={`type-tab ${inquiryType === 'book' ? 'active' : ''}`}
                    onClick={() => setInquiryType('book')}
                  >
                    📝 Reserve / Apply
                  </button>
                  <button
                    type="button"
                    className={`type-tab ${inquiryType === 'question' ? 'active' : ''}`}
                    onClick={() => setInquiryType('question')}
                  >
                    💬 Ask Question
                  </button>
                </div>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Desired Move-in Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Lease Duration</label>
                  <select
                    className="form-select"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="1 Semester (4 Mos)">1 Semester (4 Mos)</option>
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months (1 Year)</option>
                    <option value="Flexible / Month-to-Month">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Contact Phone</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message to Landlord</label>
                <textarea
                  rows={3}
                  required
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Send Request to {room.landlord.name.split(' ')[0]}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
