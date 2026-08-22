import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import roomService from '../services/roomService';
import bookingService from '../services/bookingService';
import favoriteService from '../services/favoriteService';
import adminService from '../services/adminService';
import locationService, { FALLBACK_LOCATIONS } from '../services/locationService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Live state from Backend API
  const [rooms, setRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [popularLocations, setPopularLocations] = useState(FALLBACK_LOCATIONS);
  const [favorites, setFavorites] = useState([]); // List of room IDs
  const [inquiries, setInquiries] = useState([]); // Bookings / inquiries
  const [owners, setOwners] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);
  const [broadcastEmails, setBroadcastEmails] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [adminStats, setAdminStats] = useState(null);

  // Loading states
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Authenticated user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Client-side lightweight page router
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState(null);

  // Search & Filter state
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    roomType: 'all',
    minPrice: 0,
    maxPrice: 600,
    selectedAmenities: [],
    sortBy: 'recommended' // 'recommended' | 'price-low' | 'price-high' | 'rating'
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Toast helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Router navigation helper
  const navigateTo = (page, params = null) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch verified rooms from backend
  const fetchRooms = useCallback(async (filters = {}) => {
    setIsLoadingRooms(true);
    try {
      const data = await roomService.getRooms({ per_page: 50, ...filters });
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load rooms from backend:', err);
    } finally {
      setIsLoadingRooms(false);
    }
  }, []);

  // Fetch featured rooms
  const fetchFeaturedRooms = useCallback(async () => {
    try {
      const data = await roomService.getFeaturedRooms();
      setFeaturedRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load featured rooms:', err);
    }
  }, []);

  // Fetch popular campus locations derived from live room data
  const fetchPopularLocations = useCallback(async () => {
    try {
      const data = await locationService.getPopularLocations();
      setPopularLocations(Array.isArray(data) && data.length > 0 ? data : FALLBACK_LOCATIONS);
    } catch {
      setPopularLocations(FALLBACK_LOCATIONS);
    }
  }, []);

  // Fetch user favorites
  const fetchFavorites = useCallback(async () => {
    if (!currentUser || currentUser.role !== 'student') return;
    try {
      const data = await favoriteService.getFavorites();
      const favIds = Array.isArray(data) ? data.map((r) => r.id) : [];
      setFavorites(favIds);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  }, [currentUser]);

  // Fetch inquiries / bookings
  const fetchInquiries = useCallback(async () => {
    if (!currentUser) return;
    try {
      if (currentUser.role === 'owner') {
        const data = await bookingService.getOwnerBookings();
        setInquiries(Array.isArray(data) ? data : []);
      } else if (currentUser.role === 'student') {
        const data = await bookingService.getStudentBookings();
        setInquiries(Array.isArray(data) ? data : []);
      } else if (currentUser.role === 'admin') {
        const data = await bookingService.getAdminBookings();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings/inquiries:', err);
    }
  }, [currentUser]);

  // Fetch admin dashboard stats & data
  const fetchAdminData = useCallback(async () => {
    if (!currentUser || currentUser.role !== 'admin') return;
    try {
      const stats = await adminService.getDashboard();
      setAdminStats(stats);
      const userList = await adminService.getUsers();
      setOwners(Array.isArray(userList) ? userList.filter((u) => u.role === 'owner') : []);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  }, [currentUser]);

  // Validate session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('rf_token');
      if (token) {
        try {
          const user = await authService.getMe();
          if (user) {
            setCurrentUser(user);
          } else {
            localStorage.removeItem('rf_token');
            localStorage.removeItem('rf_user');
            setCurrentUser(null);
          }
        } catch {
          localStorage.removeItem('rf_token');
          localStorage.removeItem('rf_user');
          setCurrentUser(null);
        }
      }
      setIsLoadingAuth(false);
    };

    initAuth();
    fetchRooms();
    fetchFeaturedRooms();
    fetchPopularLocations();
  }, [fetchRooms, fetchFeaturedRooms, fetchPopularLocations]);

  // Sync user-dependent data
  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
      fetchInquiries();
      if (currentUser.role === 'admin') {
        fetchAdminData();
      }
    }
  }, [currentUser, fetchFavorites, fetchInquiries, fetchAdminData]);

  // Auth actions
  const loginUser = (userObj) => {
    setCurrentUser(userObj);
    setIsAuthModalOpen(false);
    addToast(
      `Welcome back, ${userObj.name}! Logged in as ${
        userObj.role === 'admin'
          ? 'Super Administrator'
          : userObj.role === 'owner'
          ? 'Property Owner'
          : 'Student'
      }.`,
      'success'
    );
    if (userObj.role === 'admin') {
      navigateTo('admin-dashboard');
    } else if (userObj.role === 'owner') {
      navigateTo('owner-dashboard');
    } else {
      navigateTo('home');
    }
  };

  const logoutUser = async () => {
    await authService.logout();
    setCurrentUser(null);
    setFavorites([]);
    setInquiries([]);
    addToast('Signed out successfully', 'info');
    navigateTo('home');
  };

  // Toggle favorite room via live API
  const toggleFavorite = async (roomId) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      addToast('Please log in to save favorite rooms.', 'info');
      return;
    }
    if (currentUser.role !== 'student') {
      addToast('Only student accounts can save favorites.', 'info');
      return;
    }

    const isFav = favorites.includes(roomId);
    try {
      if (isFav) {
        await favoriteService.removeFavorite(roomId);
        setFavorites((prev) => prev.filter((id) => id !== roomId));
        addToast('Removed from your saved rooms', 'info');
      } else {
        await favoriteService.addFavorite(roomId);
        setFavorites((prev) => [...prev, roomId]);
        addToast('Saved to your favorites ❤️', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to update favorites', 'danger');
    }
  };

  // Switch role (for UI development/testing)
  const switchRole = (newRole) => {
    if (currentUser) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
      addToast(`Switched view to ${newRole === 'owner' ? 'Property Owner / Landlord' : newRole === 'admin' ? 'Super Admin' : 'Student'} mode`);
    }
  };

  // Add new room listing via backend API
  const addRoom = async (roomData) => {
    try {
      const created = await roomService.createOwnerRoom(roomData);
      setRooms((prev) => [created, ...prev]);
      addToast('New room listing submitted for verification! 🎉', 'success');
      navigateTo('my-listings');
      return created;
    } catch (err) {
      addToast(err.message || 'Failed to publish room listing', 'danger');
      throw err;
    }
  };

  // Update existing room
  const updateRoom = async (roomId, updatedData) => {
    try {
      const updated = await roomService.updateOwnerRoom(roomId, updatedData);
      setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, ...updated } : r)));
      addToast('Room listing updated successfully!', 'success');
      navigateTo('my-listings');
      return updated;
    } catch (err) {
      addToast(err.message || 'Failed to update room', 'danger');
      throw err;
    }
  };

  // Delete room
  const deleteRoom = async (roomId) => {
    try {
      await roomService.deleteOwnerRoom(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      addToast('Listing deleted successfully', 'info');
    } catch (err) {
      addToast(err.message || 'Failed to delete listing', 'danger');
    }
  };

  // Toggle room availability status
  const toggleRoomStatus = async (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;
    const nextStatus = room.status === 'approved' || room.status === 'active' ? 'rented' : 'approved';
    try {
      await roomService.updateOwnerRoom(roomId, { status: nextStatus });
      setRooms((prev) =>
        prev.map((r) => (r.id === roomId ? { ...r, status: nextStatus } : r))
      );
      addToast(`Listing status updated to ${nextStatus.toUpperCase()}`);
    } catch (err) {
      addToast(err.message || 'Failed to update room status', 'danger');
    }
  };

  // Submit inquiry / booking request
  const submitInquiry = async (data) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      addToast('Please log in to submit a booking or tour request', 'info');
      return;
    }

    try {
      const newBooking = await bookingService.createBooking(data);
      setInquiries((prev) => [newBooking, ...prev]);
      addToast('Booking request submitted to landlord! 📬', 'success');
      return newBooking;
    } catch (err) {
      addToast(err.message || 'Failed to submit booking request', 'danger');
      throw err;
    }
  };

  // Update booking/inquiry status (Approve / Reject)
  const updateInquiryStatus = async (bookingId, status) => {
    try {
      if (status === 'approved') {
        await bookingService.approveOwnerBooking(bookingId);
      } else if (status === 'rejected' || status === 'declined') {
        await bookingService.rejectOwnerBooking(bookingId);
      }
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === bookingId ? { ...inq, status } : inq))
      );
      addToast(`Booking request ${status === 'approved' ? 'Approved ✅' : 'Rejected ❌'}`);
    } catch (err) {
      addToast(err.message || 'Failed to update booking status', 'danger');
    }
  };

  // Admin Room Approvals
  const approveRoomListing = async (roomId) => {
    try {
      await adminService.approveRoom(roomId);
      setRooms((prev) =>
        prev.map((r) => (r.id === roomId ? { ...r, status: 'approved', is_verified: true, verified: true } : r))
      );
      addToast('Room verified & published! ✅', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to approve room', 'danger');
    }
  };

  const rejectRoomListing = async (roomId, reason = 'Listing details did not meet requirements') => {
    try {
      await adminService.rejectRoom(roomId, reason);
      setRooms((prev) =>
        prev.map((r) => (r.id === roomId ? { ...r, status: 'rejected', is_verified: false, verified: false } : r))
      );
      addToast('Room listing rejected.', 'info');
    } catch (err) {
      addToast(err.message || 'Failed to reject room', 'danger');
    }
  };

  // Direct Landlord Status Toggle by Admin
  const verifyOwner = async (ownerId, newStatus = 'active') => {
    try {
      if (newStatus === 'suspended' || newStatus === 'banned') {
        await adminService.suspendUser(ownerId);
      } else {
        await adminService.activateUser(ownerId);
      }
      setOwners((prev) =>
        prev.map((o) => (o.id === ownerId ? { ...o, status: newStatus } : o))
      );
      addToast(`User account updated to ${newStatus.toUpperCase()}!`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update user status', 'danger');
    }
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        featuredRooms,
        popularLocations,
        favorites,
        inquiries,
        owners,
        ownerRequests,
        adminLogs,
        broadcastEmails,
        adminStats,
        currentUser,
        setCurrentUser,
        isLoadingRooms,
        isLoadingAuth,
        activePage,
        pageParams,
        navigateTo,
        toggleFavorite,
        switchRole,
        searchFilters,
        setSearchFilters,
        fetchRooms,
        fetchFeaturedRooms,
        fetchFavorites,
        fetchInquiries,
        fetchAdminData,
        addRoom,
        updateRoom,
        deleteRoom,
        toggleRoomStatus,
        submitInquiry,
        updateInquiryStatus,
        verifyOwner,
        approveRoomListing,
        rejectRoomListing,
        loginUser,
        logoutUser,
        toasts,
        addToast,
        removeToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
