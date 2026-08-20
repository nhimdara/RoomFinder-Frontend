import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Search, Calendar, MapPin, ArrowRight, Building2, User } from 'lucide-react';
import { RoomCard } from '../../components/room/RoomCard';

export const Dashboard = () => {
  const { currentUser, favorites, rooms, inquiries, navigateTo } = useApp();

  const favoriteRooms = rooms.filter((r) => favorites.includes(r.id));
  const myInquiries = inquiries.filter(
    (i) => i.applicantEmail === currentUser?.email || i.applicantName === currentUser?.name
  );

  return (
    <div className="app-container" style={{ padding: '32px 0 64px' }}>
      {/* Student Welcome Header */}
      <div className="card" style={{ padding: '28px', marginBottom: '28px', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid #3B82F6' }}
          />
          <div style={{ flex: 1 }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Student Housing Hub</span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>Welcome, {currentUser.name}!</h1>
            <p style={{ fontSize: '13.5px', color: '#94A3B8' }}>Track your saved properties, scheduled campus visits, and rental inquiries.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigateTo('rooms')}>
            <Search size={16} />
            <span>Explore Campus Rooms</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="dashboard-metrics-grid" style={{ marginBottom: '32px' }}>
        <div className="metric-card card" onClick={() => navigateTo('favorites')} style={{ cursor: 'pointer' }}>
          <div className="metric-top">
            <div className="metric-icon-wrap blue">
              <Heart size={20} color="#2563EB" />
            </div>
            <span className="metric-trend up">Saved</span>
          </div>
          <div className="metric-value-wrap">
            <span className="metric-num">{favorites.length}</span>
            <span className="metric-unit">Rooms</span>
          </div>
          <span className="metric-label">Bookmarked Favorites</span>
        </div>

        <div className="metric-card card" onClick={() => navigateTo('profile')} style={{ cursor: 'pointer' }}>
          <div className="metric-top">
            <div className="metric-icon-wrap green">
              <Calendar size={20} color="#10B981" />
            </div>
            <span className="metric-trend up">Active</span>
          </div>
          <div className="metric-value-wrap">
            <span className="metric-num">{myInquiries.length || 2}</span>
            <span className="metric-unit">Requests</span>
          </div>
          <span className="metric-label">Tour & Application Requests</span>
        </div>

        <div className="metric-card card">
          <div className="metric-top">
            <div className="metric-icon-wrap purple">
              <Building2 size={20} color="#8B5CF6" />
            </div>
            <span className="metric-trend up">Live</span>
          </div>
          <div className="metric-value-wrap">
            <span className="metric-num">{rooms.length}</span>
            <span className="metric-unit">Listings</span>
          </div>
          <span className="metric-label">Available Near Campus</span>
        </div>
      </div>

      {/* Favorites Preview */}
      <div className="section-header-row" style={{ marginBottom: '16px' }}>
        <div>
          <h2 className="section-title">Your Saved Properties</h2>
          <p className="section-subtitle">Quickly compare pricing and specs for your favorite listings</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('favorites')}>
          <span>View All ({favorites.length})</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {favoriteRooms.length > 0 ? (
        <div className="rooms-grid" style={{ marginBottom: '36px' }}>
          {favoriteRooms.slice(0, 3).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '40px', textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>You haven't saved any rooms yet.</p>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('rooms')}>Browse Available Rooms</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
