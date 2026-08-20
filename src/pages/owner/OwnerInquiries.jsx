import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export const OwnerInquiries = () => {
  const { inquiries, updateInquiryStatus, navigateTo, addToast } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === 'pending') return inq.status === 'pending';
    if (filter === 'approved') return inq.status === 'approved';
    if (filter === 'declined') return inq.status === 'declined';
    return true;
  });

  return (
    <div className="owner-inquiries-page animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <div className="section-header-row" style={{ marginTop: '24px', marginBottom: '24px' }}>
          <div>
            <span className="section-tag">TENANT APPLICATIONS</span>
            <h1 className="section-title">Student Tour Requests & Applications ({inquiries.length})</h1>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Review student background, planned move-in dates, and manage booking approvals.
            </p>
          </div>
          <div className="inquiries-filter-tabs">
            <button
              className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({inquiries.length})
            </button>
            <button
              className={`tab-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({inquiries.filter((i) => i.status === 'pending').length})
            </button>
            <button
              className={`tab-btn ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved ({inquiries.filter((i) => i.status === 'approved').length})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="applications-stack">
          {filteredInquiries.map((inq) => (
            <div key={inq.id} className="application-card card">
              <div className="application-header">
                {/* Applicant Info */}
                <div className="applicant-profile-meta">
                  <img
                    src={inq.applicantAvatar}
                    alt={inq.applicantName}
                    className="applicant-large-avatar"
                  />
                  <div>
                    <div className="applicant-name-row">
                      <h3 className="applicant-full-name">{inq.applicantName}</h3>
                      <span
                        className={`badge ${
                          inq.status === 'approved'
                            ? 'badge-success'
                            : inq.status === 'declined'
                            ? 'badge-danger'
                            : 'badge-warning'
                        }`}
                      >
                        {inq.status === 'approved' && '✅ Approved'}
                        {inq.status === 'declined' && '❌ Declined'}
                        {inq.status === 'pending' && '⏳ Pending Review'}
                      </span>
                    </div>
                    <p className="applicant-sub-meta">
                      <GraduationCap size={14} /> {inq.university || 'University Student'} • Submitted {inq.createdAt}
                    </p>
                  </div>
                </div>

                {/* Target Room */}
                <div
                  className="application-room-target"
                  onClick={() => navigateTo('room-details', inq.roomId)}
                >
                  <img src={inq.roomImage} alt={inq.roomTitle} />
                  <div>
                    <span className="target-room-label">Applying for Room:</span>
                    <h4 className="target-room-title">{inq.roomTitle}</h4>
                  </div>
                </div>
              </div>

              <div className="application-details-row">
                <div className="app-detail-chip">
                  <Calendar size={14} color="#2563EB" />
                  <span>Target Move-in: <strong>{inq.moveInDate}</strong></span>
                </div>
                <div className="app-detail-chip">
                  <Clock size={14} color="#2563EB" />
                  <span>Lease Duration: <strong>{inq.duration}</strong></span>
                </div>
                <div className="app-detail-chip">
                  <Phone size={14} color="#2563EB" />
                  <span>Phone: <strong>{inq.applicantPhone || 'Provided upon approval'}</strong></span>
                </div>
              </div>

              {/* Message from student */}
              <div className="application-message-box">
                <p className="app-msg-quote">"{inq.message}"</p>
              </div>

              {/* Action Buttons */}
              <div className="application-footer-actions">
                <div className="contact-actions-row">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      addToast(`Calling ${inq.applicantName}... 📞`);
                    }}
                  >
                    <Phone size={14} />
                    <span>Call Student</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      addToast(`Email composer opened for ${inq.applicantEmail} ✉️`);
                    }}
                  >
                    <Mail size={14} />
                    <span>Send Email</span>
                  </button>
                </div>

                <div className="approval-actions-row">
                  {inq.status !== 'approved' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateInquiryStatus(inq.id, 'approved')}
                    >
                      <CheckCircle2 size={15} />
                      <span>Approve & Accept</span>
                    </button>
                  )}
                  {inq.status !== 'declined' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateInquiryStatus(inq.id, 'declined')}
                    >
                      <XCircle size={15} />
                      <span>Decline</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
