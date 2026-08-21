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
    const st = (inq.status || 'pending').toLowerCase();
    if (filter === 'pending') return st === 'pending';
    if (filter === 'approved') return st === 'approved';
    if (filter === 'rejected' || filter === 'declined') return st === 'rejected' || st === 'declined';
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
              Pending ({inquiries.filter((i) => (i.status || 'pending').toLowerCase() === 'pending').length})
            </button>
            <button
              className={`tab-btn ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved ({inquiries.filter((i) => (i.status || '').toLowerCase() === 'approved').length})
            </button>
          </div>
        </div>

        {/* Applications List */}
        {filteredInquiries.length === 0 ? (
          <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
            <Users size={40} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3>No Inquiries Found</h3>
            <p style={{ color: '#64748b' }}>No booking requests currently match this filter tab.</p>
          </div>
        ) : (
          <div className="applications-stack">
            {filteredInquiries.map((inq) => {
              const studentName = inq.student?.name || inq.applicantName || 'Student Applicant';
              const studentAvatar = inq.student?.profile_image || inq.applicantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
              const studentEmail = inq.student?.email || inq.applicantEmail || '';
              const studentPhone = inq.student?.phone || inq.applicantPhone || '';
              const roomTitle = inq.room?.title || inq.roomTitle || 'Room Listing';
              const roomId = inq.room?.id || inq.room_id || inq.roomId;
              const roomImage = inq.room?.images?.[0]?.url || (typeof inq.room?.images?.[0] === 'string' ? inq.room?.images?.[0] : null) || inq.roomImage || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80';
              const moveIn = inq.move_in_date || inq.moveInDate || 'Immediately';
              const status = (inq.status || 'pending').toLowerCase();
              const createdAt = inq.created_at ? new Date(inq.created_at).toLocaleDateString() : inq.createdAt || 'Recent';

              return (
                <div key={inq.id} className="application-card card">
                  <div className="application-header">
                    {/* Applicant Info */}
                    <div className="applicant-profile-meta">
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="applicant-large-avatar"
                      />
                      <div>
                        <div className="applicant-name-row">
                          <h3 className="applicant-full-name">{studentName}</h3>
                          <span
                            className={`badge ${
                              status === 'approved'
                                ? 'badge-success'
                                : status === 'rejected' || status === 'declined'
                                ? 'badge-danger'
                                : 'badge-warning'
                            }`}
                          >
                            {status === 'approved' && '✅ Approved'}
                            {(status === 'rejected' || status === 'declined') && '❌ Declined'}
                            {status === 'pending' && '⏳ Pending Review'}
                          </span>
                        </div>
                        <p className="applicant-sub-meta">
                          <GraduationCap size={14} /> University Student • Submitted {createdAt}
                        </p>
                      </div>
                    </div>

                    {/* Target Room */}
                    <div
                      className="application-room-target"
                      onClick={() => navigateTo('room-details', roomId)}
                    >
                      <img src={roomImage} alt={roomTitle} />
                      <div>
                        <span className="target-room-label">Applying for Room:</span>
                        <h4 className="target-room-title">{roomTitle}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="application-details-row">
                    <div className="app-detail-chip">
                      <Calendar size={14} color="#2563EB" />
                      <span>Target Move-in: <strong>{moveIn}</strong></span>
                    </div>
                    {studentPhone && (
                      <div className="app-detail-chip">
                        <Phone size={14} color="#2563EB" />
                        <span>Phone: <strong>{studentPhone}</strong></span>
                      </div>
                    )}
                    {studentEmail && (
                      <div className="app-detail-chip">
                        <Mail size={14} color="#2563EB" />
                        <span>Email: <strong>{studentEmail}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Message from student */}
                  {inq.message && (
                    <div className="application-message-box">
                      <p className="app-msg-quote">"{inq.message}"</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="application-footer-actions">
                    <div className="contact-actions-row">
                      {studentPhone && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            addToast(`Phone: ${studentPhone} 📞`);
                          }}
                        >
                          <Phone size={14} />
                          <span>Call Student</span>
                        </button>
                      )}
                      {studentEmail && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            addToast(`Email: ${studentEmail} ✉️`);
                          }}
                        >
                          <Mail size={14} />
                          <span>Send Email</span>
                        </button>
                      )}
                    </div>

                    <div className="approval-actions-row">
                      {status !== 'approved' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateInquiryStatus(inq.id, 'approved')}
                        >
                          <CheckCircle2 size={15} />
                          <span>Approve & Accept</span>
                        </button>
                      )}
                      {status !== 'rejected' && status !== 'declined' && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateInquiryStatus(inq.id, 'rejected')}
                        >
                          <XCircle size={15} />
                          <span>Decline</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerInquiries;
