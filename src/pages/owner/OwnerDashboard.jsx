import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  Calendar
} from 'lucide-react';

export const OwnerDashboard = () => {
  const { rooms, inquiries, updateInquiryStatus, navigateTo } = useApp();

  const totalRooms = rooms.length;
  const activeRooms = rooms.filter((r) => r.status === 'active').length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending');
  const estimatedRevenue = rooms.reduce((acc, r) => acc + (r.status === 'active' ? r.price : 0), 0);
  const occupancyRate = Math.round(((totalRooms - activeRooms) / (totalRooms || 1)) * 100) || 75;

  return (
    <div className="owner-dashboard-page animate-fade-in">
      <div className="app-container">
        {/* Dashboard Header Bar */}
        <div className="dashboard-top-header">
          <div>
            <span className="section-tag">LANDLORD PORTAL</span>
            <h1 className="dashboard-main-title">Property Overview & Analytics</h1>
            <p className="dashboard-sub">
              Manage your student room listings, monitor tenant bookings, and optimize monthly occupancy.
            </p>
          </div>
          <div className="dashboard-header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigateTo('my-listings')}
            >
              <Building2 size={16} />
              <span>Manage Listings</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigateTo('post-room')}
            >
              <PlusCircle size={16} />
              <span>+ Post New Room</span>
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards (Figma Style) */}
        <div className="dashboard-metrics-grid">
          {/* Card 1 */}
          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap blue">
                <Building2 size={22} color="#2563EB" />
              </div>
              <span className="metric-trend up">
                <TrendingUp size={13} /> +1 New
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{totalRooms}</span>
              <span className="metric-unit">Rooms</span>
            </div>
            <span className="metric-label">Total Listed Properties</span>
          </div>

          {/* Card 2 */}
          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap green">
                <TrendingUp size={22} color="#10B981" />
              </div>
              <span className="metric-trend up">
                <TrendingUp size={13} /> +12.4%
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{occupancyRate}%</span>
              <span className="metric-unit">Occupied</span>
            </div>
            <span className="metric-label">Average Occupancy Rate</span>
          </div>

          {/* Card 3 */}
          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap amber">
                <Users size={22} color="#F59E0B" />
              </div>
              <span className="metric-trend highlight">
                {pendingInquiries.length} Pending
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">{totalInquiries}</span>
              <span className="metric-unit">Requests</span>
            </div>
            <span className="metric-label">Tenant Inquiries & Tours</span>
          </div>

          {/* Card 4 */}
          <div className="metric-card card">
            <div className="metric-top">
              <div className="metric-icon-wrap purple">
                <DollarSign size={22} color="#8B5CF6" />
              </div>
              <span className="metric-trend up">
                <TrendingUp size={13} /> +8.2%
              </span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-num">${estimatedRevenue.toLocaleString()}</span>
              <span className="metric-unit">/ mo</span>
            </div>
            <span className="metric-label">Projected Monthly Revenue</span>
          </div>
        </div>

        {/* Analytics & Performance Charts Row */}
        <div className="dashboard-charts-grid">
          {/* Revenue Trend Line Chart */}
          <div className="dashboard-chart-box card">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-box-title">Revenue & Inquiries Growth</h3>
                <p className="chart-box-sub">Last 6 Months Performance</p>
              </div>
              <div className="chart-legend-row">
                <span className="legend-item blue">
                  <span className="legend-dot" /> Monthly Revenue ($)
                </span>
                <span className="legend-item cyan">
                  <span className="legend-dot" /> Tenant Inquiries
                </span>
              </div>
            </div>

            {/* Simulated Clean SVG Vector Curve matching Figma */}
            <div className="chart-svg-wrap">
              <svg viewBox="0 0 600 220" className="chart-svg">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" strokeWidth="1.5" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#F1F5F9" strokeWidth="1.5" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#F1F5F9" strokeWidth="1.5" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#F1F5F9" strokeWidth="1.5" />

                {/* Area Fill */}
                <path
                  d="M 20 170 C 100 150, 180 180, 260 120 C 340 70, 420 110, 500 50 L 580 40 L 580 190 L 20 190 Z"
                  fill="url(#chartGradient)"
                />

                {/* Smooth Curve */}
                <path
                  d="M 20 170 C 100 150, 180 180, 260 120 C 340 70, 420 110, 500 50 L 580 40"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="20" cy="170" r="4.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2" />
                <circle cx="140" cy="162" r="4.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2" />
                <circle cx="260" cy="120" r="4.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2" />
                <circle cx="380" cy="90" r="4.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2" />
                <circle cx="500" cy="50" r="5.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="580" cy="40" r="5.5" fill="#2563EB" stroke="#ffffff" strokeWidth="2.5" />
              </svg>
              <div className="chart-x-labels">
                <span>March</span>
                <span>April</span>
                <span>May</span>
                <span>June</span>
                <span>July</span>
                <span>August (Current)</span>
              </div>
            </div>
          </div>

          {/* Quick Listing Status Overview */}
          <div className="dashboard-status-box card">
            <h3 className="chart-box-title">Listing Portfolio</h3>
            <p className="chart-box-sub">Active vs Occupied Units</p>

            <div className="status-bars-stack">
              <div className="status-bar-row">
                <div className="status-label-group">
                  <span className="dot active" />
                  <span>Available for Rent</span>
                </div>
                <strong>{activeRooms} units</strong>
              </div>
              <div className="status-progress-track">
                <div
                  className="status-progress-fill blue"
                  style={{ width: `${(activeRooms / (totalRooms || 1)) * 100}%` }}
                />
              </div>

              <div className="status-bar-row" style={{ marginTop: '16px' }}>
                <div className="status-label-group">
                  <span className="dot occupied" />
                  <span>Currently Rented</span>
                </div>
                <strong>{totalRooms - activeRooms} units</strong>
              </div>
              <div className="status-progress-track">
                <div
                  className="status-progress-fill green"
                  style={{ width: `${((totalRooms - activeRooms) / (totalRooms || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="dashboard-tip-card card" style={{ marginTop: '20px' }}>
              <ShieldCheck size={18} color="#2563EB" />
              <p>
                <strong>Pro Landlord Tip:</strong> Listings with 4+ HD photos and verified utility breakdowns receive <strong>2.8x more tour inquiries</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Applications & Inquiries Table */}
        <div className="dashboard-inquiries-card card">
          <div className="section-header-row" style={{ marginBottom: '16px' }}>
            <div>
              <h3 className="chart-box-title">Recent Tenant Inquiries & Tour Bookings</h3>
              <p className="chart-box-sub">Approve or reply to prospective student tenants</p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('owner-inquiries')}
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="inquiries-table-wrapper">
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>Student Applicant</th>
                  <th>Target Room</th>
                  <th>Desired Move-in</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div className="applicant-cell">
                        <img
                          src={inq.applicantAvatar}
                          alt={inq.applicantName}
                          className="applicant-thumb"
                        />
                        <div>
                          <strong className="applicant-name">{inq.applicantName}</strong>
                          <span className="applicant-meta">{inq.university || inq.applicantEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="room-inq-cell">
                        <span className="room-inq-title">{inq.roomTitle}</span>
                        <span className="room-inq-duration">{inq.duration}</span>
                      </div>
                    </td>
                    <td>
                      <span className="date-cell">
                        <Calendar size={13} /> {inq.moveInDate}
                      </span>
                    </td>
                    <td>
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
                        {inq.status === 'pending' && '⏳ Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-row">
                        {inq.status === 'pending' && (
                          <>
                            <button
                              className="btn-action-icon approve"
                              title="Approve Application"
                              onClick={() => updateInquiryStatus(inq.id, 'approved')}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button
                              className="btn-action-icon decline"
                              title="Decline"
                              onClick={() => updateInquiryStatus(inq.id, 'declined')}
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            alert(`Contacting ${inq.applicantName} at ${inq.applicantPhone || inq.applicantEmail}`);
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>Reply</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
