import { useApp } from '../context/AppContext';

export const useAuth = () => {
  const {
    currentUser,
    setCurrentUser,
    loginUser,
    logoutUser,
    switchRole,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode
  } = useApp();

  return {
    user: currentUser,
    currentUser,
    setCurrentUser,
    isAuthenticated: !!currentUser && currentUser.id !== 'guest',
    role: currentUser?.role || 'student',
    isOwner: currentUser?.role === 'owner',
    isAdmin: currentUser?.role === 'admin',
    isStudent: currentUser?.role === 'student',
    loginUser,
    logoutUser,
    switchRole,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode
  };
};

export default useAuth;
