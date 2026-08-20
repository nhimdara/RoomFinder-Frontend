import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Building2,
  Mail,
  Send,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Star,
  Eye,
  Trash2,
  Clock,
  Search,
  FileText,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  UserPlus
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    rooms,
    owners,
    ownerRequests = [],
    adminLogs,
    broadcastEmails,
    verifyOwner,
    createOwner,
    approveOwnerRequest,
    rejectOwnerRequest,
    approveRoomListing,
    rejectRoomListing,
    featureRoomListing,
    sendAdminEmail,
    navigateTo,
    addToast
  } = useApp();

  // Active Tab: 'overview' | 'requests' | 'owners' | 'room-requests' | 'emails' | 'logs'
  const [activeTab, setActiveTab] = useState('overview');

  const pendingRequests = ownerRequests.filter((r) => r.status === 'pending');

  // Search & Filters
  const [ownerSearch, setOwnerSearch] = useState('');
  const [roomFilter, setRoomFilter] = useState('all'); // 'all' | 'pending' | 'active' | 'featured'

  // New Owner Modal State
  const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false);
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [newOwnerPhone, setNewOwnerPhone] = useState('');

  // Email Composer State
  const [emailRecipient, setEmailRecipient] = useState('All Landlords');
  const [emailSubject, setEmailSubject] = useState('RoomFinder Landlord Verification & Quality Notice');
  const [emailTemplate, setEmailTemplate] = useState('custom');
  const [emailBody, setEmailBody] = useState(
    'Dear Landlords, please review your room availability and ensure high-resolution photos are uploaded for the upcoming semester student intake.'
  );

  // Filtered lists
  const filteredOwners = owners.filter(
    (o) =>
      o.name.toLowerCase().includes(ownerSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(ownerSearch.toLowerCase())
  );

  const pendingRooms = rooms.filter((r) => !r.verified || r.status === 'draft');
  const activeRooms = rooms.filter((r) => r.status === 'active');
  const featuredRooms = rooms.filter((r) => r.featured);

  const handleTemplateChange = (templateType) => {
    setEmailTemplate(templateType);
    if (templateType === 'verification-approved') {
      setEmailSubject('✅ Your RoomFinder Landlord Account has been Approved!');
      setEmailBody(
        'Congratulations! Your property owner profile and identity documents have been verified by RoomFinder Super Admin. You can now publish unlimited student room listings.'
      );
    } else if (templateType === 'room-request') {
      setEmailSubject('📋 Room Listing Submission Update & Feedback');
      setEmailBody(
        'Hello Landlord, your room listing submission has been reviewed by our administration team. Please provide proof of utilities or floor area to complete full verification.'
      );
    } else if (templateType === 'commission-notice') {
      setEmailSubject('💵 Monthly Rental Performance & Payout Summary');
      setEmailBody(
        'Dear Host, your student room performance summary for this month is ready to view. Thank you for maintaining high student satisfaction ratings!'
      );
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailSubject || !emailBody) {
      addToast('Please provide both subject and message body', 'error');
      return;
    }
    sendAdminEmail({
      subject: emailSubject,
      recipients: emailRecipient,
      type: emailTemplate === 'custom' ? 'Announcement' : 'Administrative',
      body: emailBody
    });
    // Reset composer
    setEmailSubject('');
    setEmailBody('');
  };

  const handleCreateOwner = (e) => {
    e.preventDefault();
    if (!newOwnerName || !newOwnerEmail) {
      addToast('Please provide owner name and email', 'error');
      return;
    }
    createOwner({
      name: newOwnerName,
      email: newOwnerEmail,
      phone: newOwnerPhone || '+1 (555) 000-1122',
      identityDoc: 'Government ID (Super Admin Verified)'
    });
    setIsAddOwnerModalOpen(false);
    setNewOwnerName('');
    setNewOwnerEmail('');
    setNewOwnerPhone('');
  };

  return (
    <div className="admin-dashboard-page animate-fade-in">
      <div className="app-container">
        {/* Top Header */}
        <div className="admin-top-banner card">
          <div className="admin-banner-info">
            <div className="admin-badge-pill">
              <ShieldAlert size={14} color="#2563EB" />
              <span>SUPER ADMIN CONSOLE</span>
            </div>
            <h1 className="admin-main-title">Platform Operations & Landlord Management</h1>
            <p className="admin-sub-title">
              Control property owner accounts, verify student room requests, dispatch email broadcasts, and monitor platform activity.
            </p>
          </div>

          <div className="admin-quick-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('emails');
              }}
            >
              <Mail size={16} />
              <span>Compose Email</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIsAddOwnerModalOpen(true)}
            >
              <UserPlus size={16} />
              <span>+ Add Landlord</span>
            </button>
          </div>
        </div>

        {/* 4 Platform KPI Cards */}
        <div className="dashboard-metrics-grid" style={{ marginTop: '24px' }}>
          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap blue">
                <Users size={22} color="#2563EB" />
              </div>
              <span className="metric-trend up">
                <TrendingUp size={13} /> Active
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{owners.length + 12}</span>
              <span className="metric-unit">Users</span>
            </div>
            <span className="metric-label">Total Platform Users ({owners.length} Landlords)</span>
          </div>

          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap green">
                <Building2 size={22} color="#10B981" />
              </div>
              <span className="metric-trend up">
                {activeRooms.length} Live
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{rooms.length}</span>
              <span className="metric-unit">Units</span>
            </div>
            <span className="metric-label">Total Room Listings ({pendingRooms.length} Pending Review)</span>
          </div>

          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap amber">
                <ShieldCheck size={22} color="#F59E0B" />
              </div>
              <span className="metric-trend highlight">
                {owners.filter((o) => o.status === 'pending').length} Verification Req.
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{owners.filter((o) => o.status === 'verified').length}</span>
              <span className="metric-unit">Verified</span>
            </div>
            <span className="metric-label">Verified Landlord Hosts</span>
          </div>

          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap purple">
                <Mail size={22} color="#8B5CF6" />
              </div>
              <span className="metric-trend up">
                100% Delivered
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{broadcastEmails.length}</span>
              <span className="metric-unit">Broadcasts</span>
            </div>
            <span className="metric-label">Admin Email Communications</span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="admin-nav-tabs card" style={{ marginTop: '24px' }}>
          <button
            className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 System Overview
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📝 Verification Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'owners' ? 'active' : ''}`}
            onClick={() => setActiveTab('owners')}
          >
            👥 Landlords ({owners.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'room-requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('room-requests')}
          >
            🏠 Room Approval Queue ({rooms.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'emails' ? 'active' : ''}`}
            onClick={() => setActiveTab('emails')}
          >
            ✉️ Email Center
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            📜 Audit Logs ({adminLogs.length})
          </button>
        </div>

        {/* TAB: VERIFICATION APPLICATIONS QUEUE */}
        {activeTab === 'requests' && (
          <div className="admin-tab-content card animate-fade-in" style={{ marginTop: '24px', padding: '24px' }}>
            <div className="section-header-row" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="chart-box-title">Landlord Verification Applications</h3>
                <p className="chart-box-sub">
                  Review applicant details, submitted ownership deeds, and messages written to Super Admin
                </p>
              </div>
            </div>

            {ownerRequests.length > 0 ? (
              <div className="admin-requests-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {ownerRequests.map((req) => (
                  <div
                    key={req.id}
                    className="card"
                    style={{
                      padding: '20px',
                      border: '1px solid',
                      borderColor: req.status === 'pending' ? '#F59E0B' : '#E2E8F0',
                      background: req.status === 'pending' ? '#FFFBEB' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: '#2563EB',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '16px'
                          }}
                        >
                          {req.applicantName.charAt(0)}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>{req.applicantName}</h4>
                          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                            {req.applicantEmail} • {req.applicantPhone}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          className={`badge ${
                            req.status === 'approved'
                              ? 'badge-success'
                              : req.status === 'declined'
                              ? 'badge-danger'
                              : 'badge-warning'
                          }`}
                        >
                          {req.status === 'approved' && '✅ Approved Landlord'}
                          {req.status === 'declined' && '❌ Declined'}
                          {req.status === 'pending' && '⏳ Needs Admin Approval'}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>{req.submittedAt}</span>
                      </div>
                    </div>

                    {/* Property Area & Documents */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', background: 'rgba(255,255,255,0.8)', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '13px' }}>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Property Area</span>
                        <strong>{req.propertyArea}</strong>
                      </div>
                      <div style={{ fontSize: '13px' }}>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Submitted Document</span>
                        <strong>{req.documentType}</strong>
                      </div>
                    </div>

                    {/* Message Written to Admin */}
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        ✉️ Message / Note Written to Admin:
                      </span>
                      <p style={{ fontSize: '13px', color: '#1E293B', background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontStyle: 'italic', margin: 0 }}>
                        "{req.messageToAdmin}"
                      </p>
                    </div>

                    {/* Actions */}
                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => rejectOwnerRequest(req.id, 'Information incomplete')}
                        >
                          <XCircle size={14} />
                          <span>Decline Application</span>
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => approveOwnerRequest(req.id)}
                        >
                          <CheckCircle2 size={14} />
                          <span>Approve & Grant Landlord Access</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '32px' }}>
                No pending landlord verification requests at this moment.
              </p>
            )}
          </div>
        )}

        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="admin-tab-content animate-fade-in" style={{ marginTop: '24px' }}>
            <div className="dashboard-charts-grid">
              {/* Quick Owner Verification Queue */}
              <div className="card" style={{ padding: '24px' }}>
                <div className="section-header-row" style={{ marginBottom: '16px' }}>
                  <div>
                    <h3 className="chart-box-title">Pending Landlord Verifications</h3>
                    <p className="chart-box-sub">Owners requiring document approval before posting rooms</p>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('owners')}
                  >
                    Manage All <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="admin-owners-list">
                  {owners.map((owner) => (
                    <div key={owner.id} className="admin-owner-row">
                      <img src={owner.avatar} alt={owner.name} className="applicant-thumb" />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '14px' }}>{owner.name}</strong>
                          <span
                            className={`badge ${
                              owner.status === 'verified'
                                ? 'badge-success'
                                : owner.status === 'suspended'
                                ? 'badge-danger'
                                : 'badge-warning'
                            }`}
                          >
                            {owner.status === 'verified' && 'Verified Host'}
                            {owner.status === 'pending' && 'Needs Review'}
                            {owner.status === 'suspended' && 'Suspended'}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0' }}>
                          {owner.email} • {owner.identityDoc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {owner.status !== 'verified' ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => verifyOwner(owner.id, 'verified')}
                          >
                            <CheckCircle2 size={14} />
                            <span>Verify & Approve</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEmailRecipient(owner.email);
                              setActiveTab('emails');
                            }}
                          >
                            <Mail size={13} />
                            <span>Message</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Publishing Requests Snippet */}
              <div className="card" style={{ padding: '24px' }}>
                <div className="section-header-row" style={{ marginBottom: '16px' }}>
                  <div>
                    <h3 className="chart-box-title">Room Approval Queue</h3>
                    <p className="chart-box-sub">Verify listings against student standards</p>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab('room-requests')}
                  >
                    View Queue <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="admin-rooms-mini-list">
                  {rooms.slice(0, 4).map((room) => (
                    <div key={room.id} className="admin-room-mini-item">
                      <img src={room.images[0]} alt={room.title} className="popup-img" style={{ width: '64px', height: '50px', borderRadius: '6px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700 }}>{room.title}</h4>
                        <p style={{ fontSize: '11px', color: '#64748B' }}>
                          ${room.price}/mo • Landlord: {room.landlord.name}
                        </p>
                      </div>
                      <div>
                        {room.verified ? (
                          <span className="badge badge-success" style={{ fontSize: '11px' }}>
                            <ShieldCheck size={12} /> Live
                          </span>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => approveRoomListing(room.id)}
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LANDLORD / OWNER MANAGEMENT */}
        {activeTab === 'owners' && (
          <div className="admin-tab-content card animate-fade-in" style={{ marginTop: '24px', padding: '24px' }}>
            <div className="section-header-row" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="chart-box-title">Registered Property Owners</h3>
                <p className="chart-box-sub">Authorize landlords, verify ID credentials, and control publishing permissions</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Search landlord by name or email..."
                  className="form-input"
                  style={{ width: '280px' }}
                  value={ownerSearch}
                  onChange={(e) => setOwnerSearch(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setIsAddOwnerModalOpen(true)}
                >
                  <UserPlus size={16} />
                  <span>Register Owner</span>
                </button>
              </div>
            </div>

            <div className="inquiries-table-wrapper">
              <table className="inquiries-table">
                <thead>
                  <tr>
                    <th>Landlord Details</th>
                    <th>ID / Ownership Document</th>
                    <th>Properties</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOwners.map((owner) => (
                    <tr key={owner.id}>
                      <td>
                        <div className="applicant-cell">
                          <img src={owner.avatar} alt={owner.name} className="applicant-thumb" />
                          <div>
                            <strong className="applicant-name">{owner.name}</strong>
                            <span className="applicant-meta">{owner.email} • {owner.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', color: '#475569' }}>
                          {owner.identityDoc}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: '13px' }}>
                          {owner.totalProperties} Listed ({owner.activeRooms} Active)
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            owner.status === 'verified'
                              ? 'badge-success'
                              : owner.status === 'suspended'
                              ? 'badge-danger'
                              : 'badge-warning'
                          }`}
                        >
                          {owner.status === 'verified' && '✅ Verified'}
                          {owner.status === 'pending' && '⏳ Pending Review'}
                          {owner.status === 'suspended' && '🚫 Suspended'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-row">
                          {owner.status !== 'verified' ? (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => verifyOwner(owner.id, 'verified')}
                            >
                              <CheckCircle2 size={14} /> Verify
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => verifyOwner(owner.id, 'suspended')}
                              title="Suspend Landlord"
                            >
                              Suspend
                            </button>
                          )}

                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEmailRecipient(owner.email);
                              setActiveTab('emails');
                            }}
                          >
                            <Mail size={13} /> Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ROOM APPROVAL QUEUE */}
        {activeTab === 'room-requests' && (
          <div className="admin-tab-content card animate-fade-in" style={{ marginTop: '24px', padding: '24px' }}>
            <div className="section-header-row" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="chart-box-title">Room Listing Approval & Quality Review</h3>
                <p className="chart-box-sub">Inspect listings submitted by owners before they appear to students</p>
              </div>
              <div className="listings-filter-tabs" style={{ margin: 0 }}>
                <button
                  className={`tab-btn ${roomFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('all')}
                >
                  All ({rooms.length})
                </button>
                <button
                  className={`tab-btn ${roomFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('pending')}
                >
                  Unverified ({pendingRooms.length})
                </button>
                <button
                  className={`tab-btn ${roomFilter === 'featured' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('featured')}
                >
                  Featured ({featuredRooms.length})
                </button>
              </div>
            </div>

            <div className="listings-cards-stack">
              {rooms
                .filter((r) => {
                  if (roomFilter === 'pending') return !r.verified || r.status === 'draft';
                  if (roomFilter === 'featured') return r.featured;
                  return true;
                })
                .map((room) => (
                  <div key={room.id} className="owner-listing-card card">
                    <img src={room.images[0]} alt={room.title} className="owner-listing-img" />

                    <div className="owner-listing-info">
                      <div className="owner-listing-badges">
                        <span className="badge badge-primary">{room.roomType}</span>
                        <span className={`badge ${room.verified ? 'badge-success' : 'badge-warning'}`}>
                          {room.verified ? '✅ Verified & Live' : '⏳ Needs Admin Verification'}
                        </span>
                        {room.featured && <span className="badge badge-primary">⭐ Featured</span>}
                      </div>

                      <h3
                        className="owner-listing-title"
                        onClick={() => navigateTo('room-details', room.id)}
                      >
                        {room.title}
                      </h3>

                      <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                        {room.address} • Landlord: <strong>{room.landlord.name}</strong> ({room.landlord.email})
                      </p>

                      <div className="owner-listing-financials">
                        <span className="financial-price">
                          <strong>${room.price}</strong> / month
                        </span>
                        <span className="financial-deposit">
                          Deposit: ${room.deposit}
                        </span>
                        <span className="financial-views">
                          Proximity: {room.distanceToCampus}
                        </span>
                      </div>
                    </div>

                    <div className="owner-listing-actions">
                      <div className="actions-button-group">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => navigateTo('room-details', room.id)}
                        >
                          <Eye size={14} /> Preview
                        </button>

                        <button
                          className={`btn ${room.featured ? 'btn-secondary' : 'btn-outline-primary'} btn-sm`}
                          onClick={() => featureRoomListing(room.id)}
                          title="Feature on Home Page"
                        >
                          <Star size={14} fill={room.featured ? '#F59E0B' : 'none'} color="#F59E0B" />
                          <span>{room.featured ? 'Featured' : 'Feature'}</span>
                        </button>

                        {!room.verified ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => approveRoomListing(room.id)}
                          >
                            <CheckCircle2 size={14} /> Approve & Publish
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => rejectRoomListing(room.id, 'Returned for revision')}
                          >
                            <XCircle size={14} /> Return Draft
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: EMAIL BROADCAST CENTER */}
        {activeTab === 'emails' && (
          <div className="admin-tab-content animate-fade-in" style={{ marginTop: '24px' }}>
            <div className="dashboard-charts-grid">
              {/* Email Composer */}
              <div className="card" style={{ padding: '24px' }}>
                <div className="section-header-row" style={{ marginBottom: '16px' }}>
                  <div>
                    <h3 className="chart-box-title">Create & Send Email Notification</h3>
                    <p className="chart-box-sub">Dispatch notifications to landlords regarding room requests or verification</p>
                  </div>
                </div>

                <form onSubmit={handleSendEmail} className="admin-email-form">
                  <div className="form-group">
                    <label className="form-label">Recipient Group / Email</label>
                    <select
                      className="form-select"
                      value={emailRecipient}
                      onChange={(e) => setEmailRecipient(e.target.value)}
                    >
                      <option value="All Landlords">📢 All Registered Landlords ({owners.length})</option>
                      <option value="Unverified Landlords">⏳ Unverified Landlords with Pending Requests</option>
                      <option value="All Students">🎓 All Registered Students</option>
                      {owners.map((o) => (
                        <option key={o.id} value={o.email}>
                          👤 {o.name} ({o.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Template Presets</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className={`filter-type-chip ${emailTemplate === 'verification-approved' ? 'selected' : ''}`}
                        onClick={() => handleTemplateChange('verification-approved')}
                      >
                        ✅ Landlord Approved
                      </button>
                      <button
                        type="button"
                        className={`filter-type-chip ${emailTemplate === 'room-request' ? 'selected' : ''}`}
                        onClick={() => handleTemplateChange('room-request')}
                      >
                        📋 Room Listing Feedback
                      </button>
                      <button
                        type="button"
                        className={`filter-type-chip ${emailTemplate === 'commission-notice' ? 'selected' : ''}`}
                        onClick={() => handleTemplateChange('commission-notice')}
                      >
                        💵 Performance & Payout
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Subject *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g. Action Required: Update your room availability"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Body *</label>
                    <textarea
                      rows={5}
                      required
                      className="form-textarea"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Write your email announcement or instructions..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={16} />
                    <span>Send Email Notification</span>
                  </button>
                </form>
              </div>

              {/* Sent Broadcasts History */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 className="chart-box-title" style={{ marginBottom: '4px' }}>Dispatched Notifications</h3>
                <p className="chart-box-sub" style={{ marginBottom: '16px' }}>Record of sent system emails</p>

                <div className="admin-email-history-list">
                  {broadcastEmails.map((mail) => (
                    <div key={mail.id} className="admin-email-history-card card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="badge badge-primary">{mail.type || 'Notice'}</span>
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
                          ✓ {mail.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, margin: '4px 0' }}>{mail.subject}</h4>
                      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                        To: <strong>{mail.recipients}</strong> • {mail.sentAt}
                      </p>
                      <p style={{ fontSize: '12.5px', color: '#475569', fontStyle: 'italic', background: '#F8FAFC', padding: '8px', borderRadius: '6px' }}>
                        "{mail.body}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="admin-tab-content card animate-fade-in" style={{ marginTop: '24px', padding: '24px' }}>
            <h3 className="chart-box-title" style={{ marginBottom: '4px' }}>Platform Activity & Security Audit Trail</h3>
            <p className="chart-box-sub" style={{ marginBottom: '20px' }}>Comprehensive record of administrative decisions, verifications, and room status updates</p>

            <div className="admin-logs-stack">
              {adminLogs.map((log) => (
                <div key={log.id} className="admin-log-item card">
                  <div className="log-badge-col">
                    <span className={`badge ${log.badge === 'success' ? 'badge-success' : log.badge === 'danger' ? 'badge-danger' : log.badge === 'warning' ? 'badge-warning' : 'badge-primary'}`}>
                      {log.action}
                    </span>
                  </div>
                  <div className="log-details-col" style={{ flex: 1 }}>
                    <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>
                      Target: <strong>{log.target}</strong>
                    </p>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      Performed by: {log.actor} • {log.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add / Register Landlord Modal */}
      {isAddOwnerModalOpen && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setIsAddOwnerModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddOwnerModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="auth-header">
              <h3 className="auth-title">Register & Authorize Landlord</h3>
              <p className="auth-subtitle">Add a verified property owner to the platform</p>
            </div>

            <form onSubmit={handleCreateOwner} className="auth-form">
              <div className="form-group">
                <label className="form-label">Landlord Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Robert Vance"
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="robert.vance@realty.com"
                  value={newOwnerEmail}
                  onChange={(e) => setNewOwnerEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 888-9999"
                  value={newOwnerPhone}
                  onChange={(e) => setNewOwnerPhone(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                <ShieldCheck size={18} />
                <span>Create & Authorize Owner</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
