import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

export const MyBookings = () => {
  const { inquiries, rooms, navigateTo } = useApp();

  return (
    <div className="app-container" style={{ padding: '32px 0 64px' }}>
      <div className="section-header-row" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-main-title">My Bookings & Tour Inquiries</h1>
          <p className="page-sub-title">Status of your room inquiries and scheduled landlord property visits</p>
        </div>
      </div>

      <div className="inquiries-cards-stack">
        {inquiries.map((inq) => {
          const room = rooms.find((r) => r.id === inq.roomId);
          return (
            <div key={inq.id} className="card" style={{ padding: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <img
                src={inq.roomImage || room?.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80'}
                alt={inq.roomTitle}
                style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px' }}
              />

              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{inq.roomTitle}</h3>
                  <span
                    className={`badge ${
                      inq.status === 'approved'
                        ? 'badge-success'
                        : inq.status === 'declined'
                        ? 'badge-danger'
                        : 'badge-warning'
                    }`}
                  >
                    {inq.status === 'approved' && '✅ Tour Confirmed'}
                    {inq.status === 'pending' && '⏳ Awaiting Landlord'}
                    {inq.status === 'declined' && '❌ Declined'}
                  </span>
                </div>

                <p style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <span><Calendar size={13} style={{ verticalAlign: '-2px' }} /> Move-in: {inq.moveInDate}</span>
                  <span><Clock size={13} style={{ verticalAlign: '-2px' }} /> Lease: {inq.duration}</span>
                  <span>Created: {inq.createdAt}</span>
                </p>

                {inq.message && (
                  <p style={{ fontSize: '13px', color: '#334155', fontStyle: 'italic', marginTop: '6px', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px' }}>
                    "{inq.message}"
                  </p>
                )}
              </div>

              <div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateTo('room-details', inq.roomId)}
                >
                  View Listing
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
