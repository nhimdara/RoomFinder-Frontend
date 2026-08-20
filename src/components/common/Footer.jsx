import React from 'react';
import { Building2, Heart, Shield, Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { navigateTo, switchRole } = useApp();

  return (
    <footer className="footer-section">
      <div className="app-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => navigateTo('home')}>
              <div className="logo-icon-wrap">
                <Building2 size={24} color="#ffffff" strokeWidth={2.5} />
              </div>
              <div className="logo-text">
                <span className="logo-title">RoomFinder</span>
                <span className="logo-sub">STUDENT HOUSING</span>
              </div>
            </div>
            <p className="footer-description">
              The leading verified marketplace connecting students with trusted landlords and affordable room rentals close to major university campuses.
            </p>
            <div className="footer-badges">
              <span className="badge badge-success">
                <Shield size={13} /> 100% Verified Hosts
              </span>
              <span className="badge badge-primary">
                🎓 Student Friendly
              </span>
            </div>
          </div>

          {/* Quick Links for Students */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">For Students</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => navigateTo('rooms')}>Browse All Rooms</button>
              </li>
              <li>
                <button onClick={() => navigateTo('rooms')}>Near Science Campus</button>
              </li>
              <li>
                <button onClick={() => navigateTo('rooms')}>Studio Apartments</button>
              </li>
              <li>
                <button onClick={() => navigateTo('favorites')}>Saved Favorites</button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')}>Booking Inquiries</button>
              </li>
            </ul>
          </div>

          {/* Links for Landlords */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">For Landlords</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => { switchRole('owner'); navigateTo('post-room'); }}>
                  Post a Free Listing
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('owner'); navigateTo('owner-dashboard'); }}>
                  Owner Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('owner'); navigateTo('my-listings'); }}>
                  Manage Properties
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('owner'); navigateTo('owner-inquiries'); }}>
                  Tenant Applications
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="footer-links-col newsletter-col">
            <h4 className="footer-col-title">Get Campus Deals</h4>
            <p className="footer-newsletter-text">
              Subscribe for newly listed student discounts and zero-deposit listings.
            </p>
            <form
              className="footer-subscribe-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to RoomFinder campus updates!');
              }}
            >
              <input
                type="email"
                placeholder="Enter student email..."
                required
                className="footer-sub-input"
              />
              <button type="submit" className="footer-sub-btn">
                <ArrowRight size={16} />
              </button>
            </form>
            <div className="footer-contact-info">
              <div className="contact-item">
                <Mail size={14} /> support@roomfinder.com
              </div>
              <div className="contact-item">
                <Phone size={14} /> +1 (800) 555-ROOMS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 RoomFinder Inc. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#trust">Trust & Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
