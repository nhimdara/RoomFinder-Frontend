import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ROOMS,
  INITIAL_INQUIRIES,
  INITIAL_OWNERS,
  INITIAL_ADMIN_LOGS,
  INITIAL_BROADCAST_EMAILS
} from '../data/mockRooms';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage or use defaults
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_rooms');
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_favorites');
      return saved ? JSON.parse(saved) : ['room-1', 'room-4'];
    } catch {
      return ['room-1', 'room-4'];
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [owners, setOwners] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_owners');
      return saved ? JSON.parse(saved) : INITIAL_OWNERS;
    } catch {
      return INITIAL_OWNERS;
    }
  });

  const [adminLogs, setAdminLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_admin_logs');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_LOGS;
    } catch {
      return INITIAL_ADMIN_LOGS;
    }
  });

  const [broadcastEmails, setBroadcastEmails] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_admin_emails');
      return saved ? JSON.parse(saved) : INITIAL_BROADCAST_EMAILS;
    } catch {
      return INITIAL_BROADCAST_EMAILS;
    }
  });

  const [ownerRequests, setOwnerRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_owner_requests');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'req-001',
              applicantId: 'user-001',
              applicantName: 'Alex Rivera',
              applicantEmail: 'alex.rivera@university.edu',
              applicantPhone: '+1 (555) 234-8901',
              propertyArea: 'University Science Campus District',
              documentType: 'National ID & Land Title Deed',
              messageToAdmin: 'Hello Admin, I am managing a 3-unit studio apartment building for students and would like to list them on RoomFinder. Please review my attached deed and approve my landlord host account.',
              submittedAt: 'Today at 09:15 AM',
              status: 'pending' // 'pending' | 'approved' | 'declined'
            }
          ];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rf_user');
      return saved ? JSON.parse(saved) : {
        id: 'user-001',
        name: 'Alex Rivera',
        email: 'alex.rivera@university.edu',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'student',
        phone: '+1 (555) 234-8901'
      };
    } catch {
      return {
        id: 'user-001',
        name: 'Alex Rivera',
        email: 'alex.rivera@university.edu',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'student',
        phone: '+1 (555) 234-8901'
      };
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

  // Persist user auth, rooms & favorites to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rf_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rf_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('rf_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('rf_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Auth actions
  const loginUser = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('rf_user', JSON.stringify(userObj));
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

  const logoutUser = () => {
    const guestStudent = {
      id: 'guest',
      name: 'Guest Student',
      email: 'guest@roomfinder.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      phone: ''
    };
    setCurrentUser(guestStudent);
    localStorage.setItem('rf_user', JSON.stringify(guestStudent));
    addToast('Signed out successfully', 'info');
    navigateTo('home');
  };

  // Notification helper
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

  // Toggle favorite room
  const toggleFavorite = (roomId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(roomId);
      if (isFav) {
        addToast('Removed from your saved rooms', 'info');
        return prev.filter((id) => id !== roomId);
      } else {
        addToast('Saved to your favorites ❤️', 'success');
        return [...prev, roomId];
      }
    });
  };

  // Switch role between Student and Owner
  const switchRole = (newRole) => {
    setCurrentUser((prev) => ({ ...prev, role: newRole }));
    addToast(`Switched view to ${newRole === 'owner' ? 'Property Owner / Landlord' : 'Student / Room Seeker'} mode`);
    if (newRole === 'owner' && activePage === 'home') {
      navigateTo('owner-dashboard');
    } else if (newRole === 'student' && activePage.startsWith('owner')) {
      navigateTo('home');
    }
  };

  // Add new room listing
  const addRoom = (roomData) => {
    const newRoom = {
      id: `room-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      featured: false,
      status: 'active',
      ownerId: currentUser.id,
      mapX: Math.floor(Math.random() * 60) + 20,
      mapY: Math.floor(Math.random() * 60) + 20,
      landlord: {
        name: currentUser.name,
        role: 'Verified Landlord',
        avatar: currentUser.avatar,
        phone: currentUser.phone,
        email: currentUser.email,
        verifiedHost: true,
        responseRate: '100%',
        responseTime: 'Within 5 minutes',
        totalListings: 1
      },
      reviews: [],
      nearbyPlaces: [
        { name: 'Nearest Campus Gate', distance: '400m (5 mins walk)' },
        { name: 'Public Transit Station', distance: '250m (3 mins walk)' }
      ],
      ...roomData
    };

    setRooms((prev) => [newRoom, ...prev]);
    addToast('New room listing published successfully! 🎉', 'success');
    navigateTo('my-listings');
  };

  // Update existing room
  const updateRoom = (roomId, updatedData) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, ...updatedData } : r))
    );
    addToast('Room listing updated successfully!', 'success');
    navigateTo('my-listings');
  };

  // Delete room
  const deleteRoom = (roomId) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    addToast('Listing deleted', 'info');
  };

  // Toggle room availability status
  const toggleRoomStatus = (roomId) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const nextStatus = r.status === 'active' ? 'occupied' : 'active';
          addToast(`Listing status updated to ${nextStatus.toUpperCase()}`);
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  // Submit inquiry / tour request
  const submitInquiry = (data) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: 'Just now',
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      applicantPhone: currentUser.phone,
      applicantAvatar: currentUser.avatar,
      ...data
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    addToast('Tour / Inquiry request sent to landlord! 📬', 'success');
  };

  // Update inquiry status (Approve / Decline)
  const updateInquiryStatus = (inquiryId, status) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId ? { ...inq, status } : inq
      )
    );
    addToast(`Inquiry ${status === 'approved' ? 'Approved ✅' : 'Declined ❌'}`);
  };

  useEffect(() => {
    localStorage.setItem('rf_owner_requests', JSON.stringify(ownerRequests));
  }, [ownerRequests]);

  // Submit Landlord Verification Application
  const submitOwnerVerification = (requestData) => {
    const newReq = {
      id: `req-${Date.now()}`,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      applicantPhone: currentUser.phone,
      submittedAt: 'Just now',
      status: 'pending',
      ...requestData
    };
    setOwnerRequests((prev) => [newReq, ...prev]);

    // Update current user state with pending verification status
    const updatedUser = {
      ...currentUser,
      ownerRequestStatus: 'pending',
      ownerRequestId: newReq.id
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('rf_user', JSON.stringify(updatedUser));

    const log = {
      id: `log-${Date.now()}`,
      action: 'New Landlord Verification Application',
      target: `${currentUser.name} (${requestData.documentType || 'ID Proof'})`,
      actor: currentUser.name,
      timestamp: 'Just now',
      badge: 'warning'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast('Verification application submitted! Super Admin will review your credentials. ⏳', 'success');
  };

  // Admin Approve Owner Request
  const approveOwnerRequest = (requestId) => {
    const targetReq = ownerRequests.find((r) => r.id === requestId);
    setOwnerRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'approved' } : r))
    );

    if (targetReq) {
      // 1. Create and register the new verified landlord profile
      const newOwner = {
        id: targetReq.applicantId || `owner-${Date.now()}`,
        name: targetReq.applicantName,
        email: targetReq.applicantEmail,
        phone: targetReq.applicantPhone,
        status: 'verified',
        totalProperties: 0,
        activeRooms: 0,
        occupiedRooms: 0,
        joinedDate: 'Today',
        identityDoc: targetReq.documentType || 'Verified ID',
        rating: 5.0,
        commissionDue: '$0.00',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      setOwners((prev) => [newOwner, ...prev.filter((o) => o.email !== targetReq.applicantEmail)]);

      // 2. Change applicant account role from student to owner
      if (
        currentUser.id === targetReq.applicantId ||
        currentUser.email?.toLowerCase() === targetReq.applicantEmail?.toLowerCase() ||
        currentUser.name === targetReq.applicantName
      ) {
        const upgradedUser = {
          ...currentUser,
          role: 'owner',
          ownerRequestStatus: 'approved',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        };
        setCurrentUser(upgradedUser);
        localStorage.setItem('rf_user', JSON.stringify(upgradedUser));
      }

      // 3. Dispatch official approval email to the applicant
      const approvalMail = {
        id: `mail-${Date.now()}`,
        subject: '🎉 Congratulations! Your Landlord Verification is Approved',
        recipients: targetReq.applicantEmail,
        content: `Hi ${targetReq.applicantName},\n\nYour landlord application and property credentials have been verified and approved by the Super Administrator.\n\nYour account role has been upgraded to Verified Landlord. You can now access your Landlord Dashboard and start listing rooms for students!\n\nBest regards,\nRoomFinder Admin Team`,
        sentAt: 'Just now',
        status: 'Delivered'
      };
      setBroadcastEmails((prev) => [approvalMail, ...prev]);

      // 4. Record audit log
      const log = {
        id: `log-${Date.now()}`,
        action: 'Student Role Upgraded to Landlord (Approved)',
        target: `${targetReq.applicantName} (${targetReq.applicantEmail})`,
        actor: currentUser.name || 'Super Admin',
        timestamp: 'Just now',
        badge: 'success'
      };
      setAdminLogs((prev) => [log, ...prev]);
      addToast(`🎉 ${targetReq.applicantName} has been approved and upgraded to Property Owner!`, 'success');
    }
  };

  // Admin Reject Owner Request
  const rejectOwnerRequest = (requestId, reason = 'Document verification failed') => {
    const targetReq = ownerRequests.find((r) => r.id === requestId);
    setOwnerRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'declined', declineReason: reason } : r))
    );

    if (targetReq && (currentUser.id === targetReq.applicantId || currentUser.email === targetReq.applicantEmail)) {
      const declined = {
        ...currentUser,
        ownerRequestStatus: 'declined'
      };
      setCurrentUser(declined);
      localStorage.setItem('rf_user', JSON.stringify(declined));
    }

    const log = {
      id: `log-${Date.now()}`,
      action: 'Landlord Application Declined',
      target: `${targetReq?.applicantName || requestId} (${reason})`,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: 'danger'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast('Application declined and feedback logged.', 'info');
  };

  // Direct Landlord Status Toggle by Admin
  const verifyOwner = (ownerId, newStatus = 'verified') => {
    setOwners((prev) =>
      prev.map((o) => (o.id === ownerId ? { ...o, status: newStatus } : o))
    );
    const target = owners.find((o) => o.id === ownerId);
    const log = {
      id: `log-${Date.now()}`,
      action: `Owner Status Updated: ${newStatus.toUpperCase()}`,
      target: target ? target.name : ownerId,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: newStatus === 'verified' ? 'success' : 'danger'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast(`Landlord ${target?.name || ''} marked as ${newStatus.toUpperCase()}!`, 'success');
  };

  // Admin Direct Register Landlord
  const createOwner = (ownerData) => {
    const newOwner = {
      id: `owner-${Date.now()}`,
      joinedDate: 'Today',
      rating: 5.0,
      totalProperties: 0,
      activeRooms: 0,
      occupiedRooms: 0,
      commissionDue: '$0.00',
      status: 'verified',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ...ownerData
    };
    setOwners((prev) => [newOwner, ...prev]);
    const log = {
      id: `log-${Date.now()}`,
      action: 'New Landlord Created & Verified',
      target: newOwner.name,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: 'success'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast(`New Property Owner ${newOwner.name} registered & verified! 🎉`, 'success');
  };

  // Admin Room Approvals
  const approveRoomListing = (roomId) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, verified: true, status: 'active' } : r))
    );
    const targetRoom = rooms.find((r) => r.id === roomId);
    const log = {
      id: `log-${Date.now()}`,
      action: 'Room Verification Approved',
      target: targetRoom ? targetRoom.title : roomId,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: 'success'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast(`Room "${targetRoom?.title || ''}" verified & published! ✅`, 'success');
  };

  const rejectRoomListing = (roomId, reason = 'Missing required property documentation') => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, verified: false, status: 'draft' } : r))
    );
    const targetRoom = rooms.find((r) => r.id === roomId);
    const log = {
      id: `log-${Date.now()}`,
      action: 'Room Verification Rejected',
      target: `${targetRoom?.title || roomId} (${reason})`,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: 'danger'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast('Listing returned to draft. Feedback sent to owner.', 'info');
  };

  const featureRoomListing = (roomId) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, featured: !r.featured } : r))
    );
    const target = rooms.find((r) => r.id === roomId);
    addToast(`Listing "${target?.title}" ${!target?.featured ? 'featured on Home page ⭐' : 'removed from featured'}`);
  };

  // Broadcast Email Dispatch
  const sendAdminEmail = (emailData) => {
    const newMail = {
      id: `mail-${Date.now()}`,
      sentAt: 'Just now',
      status: 'Delivered',
      ...emailData
    };
    setBroadcastEmails((prev) => [newMail, ...prev]);
    const log = {
      id: `log-${Date.now()}`,
      action: 'Email Broadcast Dispatched',
      target: `${newMail.subject} (${newMail.recipients})`,
      actor: currentUser.name || 'Super Admin',
      timestamp: 'Just now',
      badge: 'info'
    };
    setAdminLogs((prev) => [log, ...prev]);
    addToast(`Email notification sent to ${newMail.recipients}! 📨`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        favorites,
        inquiries,
        owners,
        ownerRequests,
        adminLogs,
        broadcastEmails,
        currentUser,
        setCurrentUser,
        activePage,
        pageParams,
        navigateTo,
        toggleFavorite,
        switchRole,
        searchFilters,
        setSearchFilters,
        addRoom,
        updateRoom,
        deleteRoom,
        toggleRoomStatus,
        submitInquiry,
        updateInquiryStatus,
        verifyOwner,
        createOwner,
        approveRoomListing,
        rejectRoomListing,
        featureRoomListing,
        sendAdminEmail,
        submitOwnerVerification,
        approveOwnerRequest,
        rejectOwnerRequest,
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
