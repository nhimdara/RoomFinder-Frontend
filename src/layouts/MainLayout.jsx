import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AuthModal } from '../components/common/AuthModal';
import { ToastContainer } from '../components/common/ToastContainer';

export const MainLayout = ({ children }) => {
  return (
    <div className="app-root-layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
