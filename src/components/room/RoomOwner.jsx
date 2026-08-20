import React from 'react';
import { ShieldCheck, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const RoomOwner = ({ landlord, onContactClick }) => {
  if (!landlord) return null;

  return (
    <div className="landlord-card card">
      <div className="landlord-header">
        <img
          src={landlord.avatar}
          alt={landlord.name}
          className="landlord-avatar"
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4 className="landlord-name">{landlord.name}</h4>
            {landlord.verifiedHost && (
              <span className="badge badge-success" style={{ fontSize: '10.5px' }}>
                <ShieldCheck size={12} /> Verified
              </span>
            )}
          </div>
          <p className="landlord-role">{landlord.role || 'Property Landlord'}</p>
        </div>
      </div>

      <div className="landlord-stats">
        <div className="landlord-stat-item">
          <span className="stat-label">Response Rate</span>
          <span className="stat-val">{landlord.responseRate || '99%'}</span>
        </div>
        <div className="landlord-stat-item">
          <span className="stat-label">Response Time</span>
          <span className="stat-val">{landlord.responseTime || 'Within 15 mins'}</span>
        </div>
        <div className="landlord-stat-item">
          <span className="stat-label">Listings</span>
          <span className="stat-val">{landlord.totalListings || 1} Rooms</span>
        </div>
      </div>

      {onContactClick && (
        <button
          className="btn btn-secondary"
          style={{ width: '100%', marginTop: '14px' }}
          onClick={onContactClick}
        >
          <MessageSquare size={16} />
          <span>Message Host</span>
        </button>
      )}
    </div>
  );
};

export default RoomOwner;
