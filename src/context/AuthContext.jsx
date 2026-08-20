import React, { createContext, useContext } from 'react';
import { useApp } from './AppContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        switchRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isAuthenticated: !!currentUser && currentUser.id !== 'guest',
        role: currentUser?.role || 'student'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
