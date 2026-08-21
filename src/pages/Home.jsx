import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroSearch } from '../components/search/HeroSearch';
import { RoomCard } from '../components/room/RoomCard';
import { POPULAR_LOCATIONS } from '../constants/roomConstants';
import {
  ShieldCheck,
  Zap,
  BadgePercent,
  MessageSquare,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  CheckCircle2,
  Users,
  PlusCircle,
  Building,
  Search
} from 'lucide-react';

export const Home = () => {
  const { rooms, currentUser = { role: 'student' }, favorites = [], navigateTo, setSearchFilters, switchRole } = useApp();

  const featuredRooms = rooms.filter((r) => r.featured).slice(0, 4);

  return (
    <div className="home-page-wrapper animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="app-container hero-container">
          <div className="hero-content-col">
            <div className="hero-badge">
              <Sparkles size={15} color="#2563EB" />
              <span>#1 Student Housing Platform</span>
            </div>
            <h1 className="hero-main-title">
              Find Your Perfect Room <span className="highlight-text">Near Campus</span>
            </h1>
            <p className="hero-subtitle">
              Explore thousands of verified, affordable student rooms, studios, and shared flats with zero booking fees and direct landlord contact.
            </p>

            {/* Hero Search Box */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Popular Campus Neighborhoods */}
      <section className="home-section popular-locations-section">
        <div className="app-container">
          <div className="section-header-row">
            <div>
              <span className="section-tag">POPULAR CAMPUSES</span>
              <h2 className="section-title">Explore by University & Area</h2>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('rooms')}
            >
              <span>Explore All Locations</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="locations-grid">
            {POPULAR_LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="location-card"
                onClick={() => {
                  setSearchFilters((prev) => ({
                    ...prev,
                    keyword: loc.name
                  }));
                  navigateTo('rooms');
                }}
              >
                <img src={loc.image} alt={loc.name} className="location-img" />
                <div className="location-overlay">
                  <span className="location-tag-pill">{loc.tag}</span>
                  <h3 className="location-name">{loc.name}</h3>
                  <p className="location-room-count">{loc.count} available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Room Listings */}
      <section className="home-section featured-rooms-section">
        <div className="app-container">
          <div className="section-header-row">
            <div>
              <span className="section-tag">VERIFIED & POPULAR</span>
              <h2 className="section-title">Featured Student Accommodations</h2>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigateTo('rooms')}
            >
              <span>View All {rooms.length} Rooms</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="rooms-grid-container">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose RoomFinder Value Pillars */}
      <section className="home-section benefits-section">
        <div className="app-container">
          <div className="benefits-header text-center">
            <span className="section-tag">WHY ROOMFINDER</span>
            <h2 className="section-title">Built Specially for Student Living</h2>
            <p className="section-subtitle">
              We eliminate rental scams and broker markups, giving you transparent verified listings near your classes.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card card">
              <div className="benefit-icon-wrap blue">
                <ShieldCheck size={28} color="#2563EB" />
              </div>
              <h3 className="benefit-title">100% Verified Landlords</h3>
              <p className="benefit-desc">
                Every property and owner is ID-verified and inspected to protect students from ghost listings and scam deposits.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap green">
                <BadgePercent size={28} color="#10B981" />
              </div>
              <h3 className="benefit-title">0% Hidden Booking Fees</h3>
              <p className="benefit-desc">
                Pay what you see. Direct landlord negotiation with transparent utility pricing and student discounts.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap amber">
                <Zap size={28} color="#F59E0B" />
              </div>
              <h3 className="benefit-title">Fast Tour Scheduling</h3>
              <p className="benefit-desc">
                Book physical or virtual video walk-throughs in seconds with guaranteed responses within hours.
              </p>
            </div>

            <div className="benefit-card card">
              <div className="benefit-icon-wrap purple">
                <Users size={28} color="#8B5CF6" />
              </div>
              <h3 className="benefit-title">Verified Student Reviews</h3>
              <p className="benefit-desc">
                Read honest feedback from past students regarding internet speed, soundproofing, and landlord attentiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Banner */}
      <section className="home-section testimonials-section">
        <div className="app-container">
          <div className="testimonials-box card">
            <div className="testimonials-left">
              <span className="section-tag">STUDENT VOICES</span>
              <h2 className="testimonials-title">Loved by 15,000+ Students Across 40+ Campuses</h2>
              <div className="rating-summary-pill">
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span><strong>4.9 / 5</strong> Average Student Rating</span>
              </div>
            </div>

            <div className="testimonials-cards-col">
              <div className="testimonial-card card">
                <div className="testimonial-header">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Student"
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4 className="student-name">Jessica Taylor</h4>
                    <p className="student-major">Architecture Junior, MIT</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  "I was struggling to find an affordable studio 2 weeks before semester started. Found my room on RoomFinder in 2 days and the host even held the keys for me until move-in day!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="home-section owner-cta-section">
        <div className="app-container">
          {currentUser.role === 'student' ? (
            <div className="owner-cta-banner" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1E293B 100%)' }}>
              <div className="owner-cta-content">
                <span className="cta-badge">STUDENT HOUSING</span>
                <h2 className="owner-cta-title">
                  Ready to Find Your Home for Next Semester?
                </h2>
                <p className="owner-cta-desc">
                  Browse hundreds of verified student rooms near your campus with zero middleman fees and instant landlord messaging.
                </p>
                <div className="owner-cta-actions">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigateTo('rooms')}
                  >
                    <Search size={18} />
                    <span>Explore Available Rooms</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigateTo('favorites')}
                  >
                    <span>View Saved Rooms ({favorites.length})</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="owner-cta-banner">
              <div className="owner-cta-content">
                <span className="cta-badge">FOR PROPERTY OWNERS</span>
                <h2 className="owner-cta-title">
                  Have a Room or Apartment to Rent to Students?
                </h2>
                <p className="owner-cta-desc">
                  List your property for free, connect with verified students, and fill vacancies 3x faster with automated tour scheduling.
                </p>
                <div className="owner-cta-actions">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigateTo('post-room')}
                  >
                    <PlusCircle size={18} />
                    <span>List Your Room Free</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigateTo('owner-dashboard')}
                  >
                    <Building size={18} />
                    <span>Explore Landlord Portal</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
