import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Trash2,
  ArrowLeft,
  Save,
  ShieldCheck
} from 'lucide-react';
import { ROOM_TYPES, AMENITIES_LIST } from '../constants/roomConstants';

export const EditRoom = () => {
  const { rooms, pageParams, updateRoom, navigateTo, addToast } = useApp();

  const roomToEdit = rooms.find((r) => r.id === pageParams) || rooms[0];

  const [formData, setFormData] = useState(roomToEdit || {});

  useEffect(() => {
    if (roomToEdit) {
      setFormData(roomToEdit);
    }
  }, [roomToEdit]);

  if (!roomToEdit) {
    return (
      <div className="app-container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Room Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('my-listings')}>
          Back to Listings
        </button>
      </div>
    );
  }

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities?.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...(prev.amenities || []), amenity]
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateRoom(roomToEdit.id, formData);
  };

  return (
    <div className="post-room-page animate-fade-in">
      <div className="app-container" style={{ maxWidth: '840px' }}>
        <div className="details-nav-bar" style={{ marginBottom: '16px' }}>
          <button
            className="details-back-btn"
            onClick={() => navigateTo('my-listings')}
          >
            <ArrowLeft size={18} />
            <span>Back to My Listings</span>
          </button>
        </div>

        <div className="wizard-header text-center">
          <span className="section-tag">EDIT LISTING</span>
          <h1 className="section-title">Update Room Details</h1>
        </div>

        <form onSubmit={handleSave} className="wizard-form-box card">
          <div className="form-group">
            <label className="form-label">Listing Title *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Room Type</label>
              <select
                className="form-select"
                value={formData.roomType || 'Studio'}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              >
                {ROOM_TYPES.filter((t) => t.value !== 'all').map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Monthly Rent ($ USD) *</label>
              <input
                type="number"
                required
                className="form-input"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Distance to Campus</label>
              <input
                type="text"
                className="form-input"
                value={formData.distanceToCampus || ''}
                onChange={(e) => setFormData({ ...formData, distanceToCampus: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={4}
              className="form-textarea"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amenities</label>
            <div className="amenities-selection-grid">
              {AMENITIES_LIST.map((amenity) => {
                const isChecked = formData.amenities?.includes(amenity);
                return (
                  <div
                    key={amenity}
                    className={`amenity-toggle-chip ${isChecked ? 'active' : ''}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <CheckCircle2 size={16} color={isChecked ? '#2563EB' : '#94A3B8'} />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="wizard-footer-buttons">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => navigateTo('my-listings')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ marginLeft: 'auto' }}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
