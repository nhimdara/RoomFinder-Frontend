import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Heart,
  Search,
  PlusCircle,
  LayoutDashboard,
  Home,
  User,
  SlidersHorizontal,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  Bell
} from 'lucide-react';

export const Navbar = () => {
  const {
    activePage,
    navigateTo,
    favorites,
    currentUser,
    switchRole,
    inquiries,
    setIsAuthModalOpen,
    setAuthMode,
    logoutUser
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  return (
    <header className="navbar-wrapper">
      <div className="app-container navbar-container">
        {/* Brand Logo */}
        <div
          className="brand-logo"
          onClick={() => navigateTo(currentUser.role === 'owner' ? 'owner-dashboard' : 'home')}
        >
          <div className="logo-icon-wrap">
            <Building2 size={24} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div className="logo-text">
            <span className="logo-title">RoomFinder</span>
            <span className="logo-sub">STUDENT HOUSING</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {currentUser.role === 'admin' ? (
            <>
              <button
                className={`nav-link ${activePage === 'admin-dashboard' ? 'active' : ''}`}
                onClick={() => navigateTo('admin-dashboard')}
              >
                <ShieldCheck size={16} color="#2563EB" />
                <span>Admin Console</span>
              </button>
              <button
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                <Home size={16} />
                <span>Live Site</span>
              </button>
              <button
                className={`nav-link ${activePage === 'rooms' ? 'active' : ''}`}
                onClick={() => navigateTo('rooms')}
              >
                <Search size={16} />
                <span>Browse Rooms</span>
              </button>
            </>
          ) : currentUser.role === 'owner' ? (
            <>
              <button
                className={`nav-link ${activePage === 'owner-dashboard' ? 'active' : ''}`}
                onClick={() => navigateTo('owner-dashboard')}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>
              <button
                className={`nav-link ${activePage === 'my-listings' ? 'active' : ''}`}
                onClick={() => navigateTo('my-listings')}
              >
                <Building2 size={16} />
                <span>My Listings</span>
              </button>
              <button
                className={`nav-link ${activePage === 'owner-inquiries' ? 'active' : ''}`}
                onClick={() => navigateTo('owner-inquiries')}
              >
                <Bell size={16} />
                <span>Applications</span>
                {pendingInquiriesCount > 0 && (
                  <span className="nav-badge-count">{pendingInquiriesCount}</span>
                )}
              </button>
              <button
                className={`nav-link ${activePage === 'post-room' ? 'active' : ''}`}
                onClick={() => navigateTo('post-room')}
              >
                <PlusCircle size={16} />
                <span>Post Room</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                <Home size={16} />
                <span>Home</span>
              </button>
              <button
                className={`nav-link ${activePage === 'rooms' ? 'active' : ''}`}
                onClick={() => navigateTo('rooms')}
              >
                <Search size={16} />
                <span>Find Rooms</span>
              </button>
              <button
                className={`nav-link ${activePage === 'favorites' ? 'active' : ''}`}
                onClick={() => navigateTo('favorites')}
              >
                <Heart size={16} />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="nav-badge-count">{favorites.length}</span>
                )}
              </button>
            </>
          )}
        </nav>

        {/* Right Actions: Post Room CTA (Only for Owners) & Auth/Profile */}
        <div className="navbar-actions">
          {/* Primary Action Button: Post Room (Landlords / Owners only) */}
          {currentUser && !currentUser.isGuest && currentUser.role === 'owner' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigateTo('post-room')}
            >
              <PlusCircle size={16} />
              <span>Post a Room</span>
            </button>
          )}

          {/* If Guest (Not Logged In): Show Sign In & Sign Up */}
          {!currentUser || currentUser.isGuest ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
              >
                <User size={15} />
                <span>Sign In</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthModalOpen(true);
                }}
              >
                <span>Sign Up</span>
              </button>
            </div>
          ) : (
            /* Logged In User Profile Avatar & Dropdown */
            <div className="user-menu-wrapper" style={{ position: 'relative' }}>
              <button
                className="user-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser.name || 'User'}
                  className="user-avatar"
                />
                <span className="user-name-label">{currentUser.name}</span>
              </button>

            {isUserMenuOpen && (
              <div className="user-dropdown-menu animate-fade-in">
                <div className="user-dropdown-header">
                  <p className="user-menu-name">{currentUser.name}</p>
                  <p className="user-menu-email">{currentUser.email}</p>
                  <span
                    className={`badge ${
                      currentUser.role === 'admin'
                        ? 'badge-primary'
                        : currentUser.role === 'owner'
                        ? 'badge-success'
                        : 'badge-primary'
                    }`}
                    style={{ marginTop: '6px' }}
                  >
                    {currentUser.role === 'admin'
                      ? '🛡️ Super Administrator'
                      : currentUser.role === 'owner'
                      ? 'Verified Landlord'
                      : 'Student Seeker'}
                  </span>
                </div>
                <div className="user-dropdown-divider" />

                {currentUser.role === 'admin' ? (
                  <>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('admin-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <ShieldCheck size={16} color="#2563EB" />
                      <span>Admin Control Center</span>
                    </button>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('owner-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Building2 size={16} />
                      <span>Landlord Hub Preview</span>
                    </button>
                  </>
                ) : currentUser.role === 'owner' ? (
                  <>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('owner-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard size={16} />
                      <span>Owner Dashboard</span>
                    </button>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('my-listings');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Building2 size={16} />
                      <span>My Listings</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <User size={16} />
                      <span>My Profile & Settings</span>
                    </button>
                    <button
                      className="user-dropdown-item"
                      onClick={() => {
                        navigateTo('favorites');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Heart size={16} />
                      <span>Saved Rooms ({favorites.length})</span>
                    </button>
                    <button
                      className="user-dropdown-item"
                      style={{ color: '#2563EB', fontWeight: 700 }}
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Building2 size={16} />
                      <span>🏠 Become an Owner</span>
                    </button>
                  </>
                )}
                <div className="user-dropdown-divider" />
                <button
                  className="user-dropdown-item"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                >
                  <User size={16} />
                  <span>Switch Account / Sign In</span>
                </button>
                <button
                  className="user-dropdown-item danger"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logoutUser();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-nav-links">
            {currentUser.role === 'student' ? (
              <>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('home');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home size={18} /> Home
                </button>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('rooms');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Search size={18} /> Find Rooms
                </button>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('favorites');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Heart size={18} /> Favorites ({favorites.length})
                </button>
              </>
            ) : (
              <>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('owner-dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </button>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('my-listings');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Building2 size={18} /> My Listings
                </button>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('owner-inquiries');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Bell size={18} /> Applications ({pendingInquiriesCount})
                </button>
                <button
                  className="mobile-link"
                  onClick={() => {
                    navigateTo('post-room');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <PlusCircle size={18} /> Post New Room
                </button>
              </>
            )}
            <button
              className="mobile-link"
              onClick={() => {
                navigateTo('profile');
                setIsMobileMenuOpen(false);
              }}
            >
              <User size={18} /> Profile & Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
