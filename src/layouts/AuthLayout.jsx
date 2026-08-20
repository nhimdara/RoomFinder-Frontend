import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ToastContainer } from '../components/common/ToastContainer';

export const AuthLayout = ({ children }) => {
  return (
    <div className="app-root-layout">
      <Navbar />
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {children}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
