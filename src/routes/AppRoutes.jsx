import React from 'react';
import { useApp } from '../context/AppContext';

// Layouts
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Public Pages
import { Home } from '../pages/Home';
import { Rooms } from '../pages/Rooms';
import { RoomDetails } from '../pages/RoomDetails';
import { Favorites } from '../pages/Favorites';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

// Owner Pages
import { OwnerDashboard } from '../pages/owner/OwnerDashboard';
import { MyListings } from '../pages/owner/MyListings';
import { OwnerInquiries } from '../pages/owner/OwnerInquiries';
import { PostRoom } from '../pages/PostRoom';
import { EditRoom } from '../pages/EditRoom';

// Student Pages
import { Dashboard as StudentDashboard } from '../pages/student/Dashboard';
import { MyBookings } from '../pages/student/MyBookings';

// Super Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';

export const AppRoutes = () => {
  const { activePage, currentUser, navigateTo, setIsAuthModalOpen, setAuthMode } = useApp();

  const isOwner = currentUser?.role === 'owner' || currentUser?.role === 'admin';
  const isAdmin = currentUser?.role === 'admin';

  // Guard for Owner Only Routes
  const renderOwnerGuard = (Component) => {
    if (isOwner) return Component;
    return (
      <div className="app-container" style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '580px' }}>
        <div className="card" style={{ padding: '40px 24px' }}>
          <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ fontSize: '28px' }}>🔒</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>Landlord Portal Restricted</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
            The Landlord Dashboard and Property Management tools are only accessible to registered property owners.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => navigateTo('home')}>
              Back to Home
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              Sign In as Landlord
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Guard for Super Admin Only Routes
  const renderAdminGuard = (Component) => {
    if (isAdmin) return Component;
    return (
      <div className="app-container" style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '580px' }}>
        <div className="card" style={{ padding: '40px 24px' }}>
          <div style={{ width: '64px', height: '64px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ fontSize: '28px' }}>🛡️</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>Super Admin Access Required</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
            This operations center is reserved for platform administrators.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => navigateTo('home')}>
              Back to Home
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              Sign In as Super Admin
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentRoute = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'rooms':
        return <Rooms />;
      case 'room-details':
        return <RoomDetails />;
      case 'favorites':
        return <Favorites />;
      case 'profile':
        return <Profile />;
      case 'login':
        return (
          <AuthLayout>
            <Login />
          </AuthLayout>
        );
      case 'register':
        return (
          <AuthLayout>
            <Register />
          </AuthLayout>
        );
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'my-bookings':
        return <MyBookings />;
      case 'owner-dashboard':
        return renderOwnerGuard(<OwnerDashboard />);
      case 'my-listings':
      case 'my-rooms':
        return renderOwnerGuard(<MyListings />);
      case 'owner-inquiries':
      case 'room-management':
        return renderOwnerGuard(<OwnerInquiries />);
      case 'post-room':
        return <PostRoom />;
      case 'edit-room':
        return renderOwnerGuard(<EditRoom />);
      case 'admin-dashboard':
        return renderAdminGuard(<AdminDashboard />);
      default:
        return <Home />;
    }
  };

  if (activePage === 'login' || activePage === 'register') {
    return renderCurrentRoute();
  }

  return <MainLayout>{renderCurrentRoute()}</MainLayout>;
};

export default AppRoutes;
