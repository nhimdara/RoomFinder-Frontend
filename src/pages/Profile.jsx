import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit2,
  Save,
  FileText,
  Send,
  X,
  Sparkles,
  MapPin,
  FileCheck
} from 'lucide-react';

export const Profile = () => {
  const {
    currentUser,
    setCurrentUser,
    inquiries,
    navigateTo,
    addToast,
    submitOwnerVerification,
    ownerRequests,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  // Verification modal state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [applicantArea, setApplicantArea] = useState('University Science Campus District');
  const [docType, setDocType] = useState('Property Ownership Deed & National ID');
  const [docNumber, setDocNumber] = useState('DEED-2026-9941');
  const [adminMessage, setAdminMessage] = useState(
    'Hello Admin, I own a 3-unit studio building near Tech Campus and would like to list them for student tenants. Please review my attached deed and approve my host account.'
  );

  // If user is guest / not logged in: Show Auth Required Screen
  if (!currentUser || currentUser.isGuest) {
    return (
      <div className="profile-page-wrapper animate-fade-in">
        <div className="app-container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '40px 32px', textAlign: 'center', borderRadius: '16px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px'
              }}
            >
              <User size={30} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Sign In to View Profile
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
              Please sign in with your account to access your personal details, tour inquiries, and landlord verification settings.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', borderRadius: '10px' }}
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              <User size={18} />
              <span>Sign In / Create Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const myInquiries = inquiries.filter(
    (inq) => inq.applicantEmail === currentUser?.email || inq.applicantName === currentUser?.name
  );

  // Check if current user has an active pending or approved verification request
  const myVerificationRequest = ownerRequests?.find(
    (r) => r.applicantId === currentUser.id || r.applicantEmail === currentUser.email
  );

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name,
      phone,
      email
    }));
    setIsEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (!applicantArea || !docType || !adminMessage) {
      addToast('Please fill all required verification fields', 'error');
      return;
    }
    submitOwnerVerification({
      propertyArea: applicantArea,
      documentType: `${docType} (#${docNumber})`,
      messageToAdmin: adminMessage
    });
    setIsVerifyModalOpen(false);
  };

  return (
    <div className="profile-page-wrapper animate-fade-in">
      <div className="app-container">
        <div className="profile-layout">
          {/* Left Column: User Card */}
          <div className="profile-user-card card">
            <div className="profile-avatar-wrap">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar-img" />
              <span className="profile-verified-check">
                <ShieldCheck size={16} color="#ffffff" />
              </span>
            </div>

            <h2 className="profile-user-name">{currentUser.name}</h2>
            <p className="profile-user-email">{currentUser.email}</p>

            <div className="profile-role-badge">
              <span
                className={`badge ${
                  currentUser.role === 'owner'
                    ? 'badge-success'
                    : currentUser.role === 'admin'
                    ? 'badge-primary'
                    : 'badge-primary'
                }`}
              >
                {currentUser.role === 'owner'
                  ? '🏠 Verified Property Landlord'
                  : currentUser.role === 'admin'
                  ? '🛡️ Super Administrator'
                  : '🎓 Verified Student Account'}
              </span>
            </div>

            <div className="profile-quick-stats">
              <div className="profile-stat-item">
                <strong>{myInquiries.length}</strong>
                <span>Tours / Inquiries</span>
              </div>
              <div className="profile-stat-item">
                <strong>100%</strong>
                <span>Verified ID</span>
              </div>
            </div>

            {/* Landlord Verification Request State for Students */}
            {currentUser.role === 'student' && (
              <>
                {myVerificationRequest?.status === 'pending' || currentUser.ownerRequestStatus === 'pending' ? (
                  <div
                    className="card"
                    style={{
                      marginTop: '20px',
                      padding: '16px',
                      background: '#FEF3C7',
                      border: '1.5px solid #F59E0B',
                      borderRadius: '12px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Clock size={18} color="#D97706" />
                      <strong style={{ fontSize: '13px', color: '#92400E' }}>
                        Application Pending Approval
                      </strong>
                    </div>
                    <p style={{ fontSize: '11.5px', color: '#B45309', lineHeight: 1.4, margin: 0 }}>
                      Your landlord verification request is in the Super Admin review queue. You will receive an approval notification shortly.
                    </p>
                  </div>
                ) : (
                  <div
                    className="become-owner-card card"
                    style={{
                      marginTop: '20px',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      border: '1.5px solid #BFDBFE',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: '#ffffff'
                      }}
                    >
                      <Building2 size={20} />
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1E3A8A', marginBottom: '4px' }}>
                      Have Rooms to Rent?
                    </h4>
                    <p style={{ fontSize: '12px', color: '#3B82F6', marginBottom: '12px', lineHeight: 1.4 }}>
                      Apply for landlord verification and get authorized by admin to publish student rooms.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', fontSize: '12.5px', fontWeight: 700 }}
                      onClick={() => setIsVerifyModalOpen(true)}
                    >
                      🏠 Apply to Become an Owner
                    </button>
                  </div>
                )}
              </>
            )}

            {/* If Already an Owner */}
            {currentUser.role === 'owner' && (
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => navigateTo('owner-dashboard')}
                >
                  <Building2 size={16} />
                  <span>Open Landlord Portal</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Inquiries Tracker & Details */}
          <div className="profile-main-content">
            {/* Account Information Form */}
            <div className="card profile-section-card">
              <div className="section-header-row" style={{ marginBottom: '16px' }}>
                <h3 className="section-title" style={{ fontSize: '18px' }}>Personal Information</h3>
                {!isEditing ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={14} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSave}
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>

              <div className="profile-info-grid">
                <div className="info-item">
                  <label className="info-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <p className="info-val">{currentUser.name}</p>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <p className="info-val">{currentUser.email}</p>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <p className="info-val">{currentUser.phone}</p>
                  )}
                </div>

                <div className="info-item">
                  <label className="info-label">Account Verification</label>
                  <p className="info-val" style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} /> Identity & Student Email Verified
                  </p>
                </div>
              </div>
            </div>

            {/* My Sent Inquiries & Applications */}
            <div className="card profile-section-card" style={{ marginTop: '24px' }}>
              <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '16px' }}>
                My Applications & Tour Requests ({myInquiries.length})
              </h3>

              {myInquiries.length > 0 ? (
                <div className="profile-inquiries-list">
                  {myInquiries.map((inq) => (
                    <div key={inq.id} className="profile-inquiry-item card">
                      <img
                        src={inq.roomImage}
                        alt={inq.roomTitle}
                        className="profile-inquiry-img"
                      />
                      <div className="profile-inquiry-details">
                        <div className="profile-inquiry-top">
                          <h4
                            className="profile-inquiry-title"
                            onClick={() => navigateTo('room-details', inq.roomId)}
                          >
                            {inq.roomTitle}
                          </h4>
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

                        <div className="profile-inquiry-meta">
                          <span>
                            <Calendar size={14} /> Move-in: <strong>{inq.moveInDate}</strong>
                          </span>
                          <span>
                            <Clock size={14} /> Duration: <strong>{inq.duration}</strong>
                          </span>
                        </div>

                        <p className="profile-inquiry-msg">"{inq.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-inquiries-note">
                  You have not submitted any tour requests yet. Browse rooms to get in touch with verified landlords!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Become an Owner Verification Modal */}
      {isVerifyModalOpen && (
        <div
          className="modal-backdrop animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)'
          }}
          onClick={() => setIsVerifyModalOpen(false)}
        >
          <div
            className="modal-content animate-slide-up"
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px 32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              border: '1px solid #E2E8F0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="modal-close-btn"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F1F5F9',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B',
                transition: 'all 0.2s'
              }}
              onClick={() => setIsVerifyModalOpen(false)}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                Apply for Landlord Verification
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Submit your property information and identity credentials for Super Admin review and authorization.
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerificationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={currentUser.name}
                    disabled
                    style={{ background: '#F8FAFC', color: '#64748B', padding: '9px 12px', fontSize: '13px' }}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Property Vicinity *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={applicantArea}
                    onChange={(e) => setApplicantArea(e.target.value)}
                    placeholder="e.g. Science Campus, District 1"
                    style={{ padding: '9px 12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    ID / Document Type *
                  </label>
                  <select
                    className="form-select"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    style={{ padding: '9px 12px', fontSize: '13px' }}
                  >
                    <option value="Property Ownership Deed & National ID">🏠 Property Deed & ID</option>
                    <option value="Government Building Lease License">📜 Building Lease License</option>
                    <option value="Host Passport & Utility Proof">🛂 Passport & Utility</option>
                    <option value="Realty Business Registration">🏢 Realty Business License</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Document ID / Ref # *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    placeholder="e.g. DEED-2026-9941"
                    style={{ padding: '9px 12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Message & Request Note to Super Admin *
                </label>
                <textarea
                  rows={3}
                  required
                  className="form-textarea"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="Write a message explaining your student property details and why you want to list on RoomFinder..."
                  style={{ padding: '10px 12px', fontSize: '13px', lineHeight: 1.4, resize: 'vertical' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#1E40AF'
                }}
              >
                <ShieldCheck size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                <span>Super Admin typically reviews and verifies ownership credentials within 2-4 hours.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px',
                  borderRadius: '10px'
                }}
              >
                <Send size={16} />
                <span>Submit Verification to Admin</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
