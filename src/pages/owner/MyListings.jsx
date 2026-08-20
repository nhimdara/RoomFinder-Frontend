import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  ShieldCheck,
  MapPin,
  DollarSign,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const MyListings = () => {
  const { rooms, toggleRoomStatus, deleteRoom, navigateTo } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredListings = rooms.filter((r) => {
    if (filterStatus === 'active') return r.status === 'active';
    if (filterStatus === 'occupied') return r.status === 'occupied';
    return true;
  });

  return (
    <div className="my-listings-page animate-fade-in">
      <div className="app-container">
        {/* Header */}
        <div className="section-header-row" style={{ marginTop: '24px', marginBottom: '24px' }}>
          <div>
            <span className="section-tag">MANAGEMENT</span>
            <h1 className="section-title">My Property Listings ({rooms.length})</h1>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Keep your room availability status up to date to receive inquiries from students.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('post-room')}
          >
            <PlusCircle size={16} />
            <span>+ Add New Room</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="listings-filter-tabs">
          <button
            className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Listings ({rooms.length})
          </button>
          <button
            className={`tab-btn ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Available ({rooms.filter((r) => r.status === 'active').length})
          </button>
          <button
            className={`tab-btn ${filterStatus === 'occupied' ? 'active' : ''}`}
            onClick={() => setFilterStatus('occupied')}
          >
            Occupied ({rooms.filter((r) => r.status === 'occupied').length})
          </button>
        </div>

        {/* Listings Cards List */}
        <div className="listings-cards-stack">
          {filteredListings.map((room) => (
            <div key={room.id} className="owner-listing-card card">
              <img
                src={room.images[0]}
                alt={room.title}
                className="owner-listing-img"
              />

              <div className="owner-listing-info">
                <div className="owner-listing-badges">
                  <span className="badge badge-primary">{room.roomType}</span>
                  <span
                    className={`badge ${
                      room.status === 'active' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {room.status === 'active' ? '🟢 Available' : '🟡 Rented / Occupied'}
                  </span>
                  <span className="badge badge-gray">{room.size}</span>
                </div>

                <h3
                  className="owner-listing-title"
                  onClick={() => navigateTo('room-details', room.id)}
                >
                  {room.title}
                </h3>

                <div className="owner-listing-address">
                  <MapPin size={14} color="#64748B" />
                  <span>{room.address}, {room.city}</span>
                </div>

                <div className="owner-listing-financials">
                  <span className="financial-price">
                    <strong>${room.price}</strong> / month
                  </span>
                  <span className="financial-deposit">
                    Deposit: ${room.deposit}
                  </span>
                  <span className="financial-views">
                    ⭐ {room.rating.toFixed(1)} ({room.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Status Toggle & Action Controls */}
              <div className="owner-listing-actions">
                <button
                  className={`btn-status-toggle ${room.status === 'active' ? 'is-active' : ''}`}
                  onClick={() => toggleRoomStatus(room.id)}
                  title="Toggle Availability"
                >
                  {room.status === 'active' ? (
                    <>
                      <ToggleRight size={22} color="#10B981" />
                      <span>Set Occupied</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={22} color="#94A3B8" />
                      <span>Set Available</span>
                    </>
                  )}
                </button>

                <div className="actions-button-group">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigateTo('room-details', room.id)}
                    title="Preview public listing"
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigateTo('edit-room', room.id)}
                    title="Edit details"
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm(`Delete "${room.title}"?`)) {
                        deleteRoom(room.id);
                      }
                    }}
                    title="Delete listing"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
