import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ToastContainer } from '../components/common/ToastContainer';
import { AuthModal } from '../components/common/AuthModal';

export const DashboardLayout = ({ children, title, subtitle, actions }) => {
  return (
    <div className="app-root-layout">
      <Navbar />
      <main className="main-content" style={{ padding: '32px 0 64px' }}>
        <div className="app-container">
          {(title || actions) && (
            <div className="section-header-row" style={{ marginBottom: '24px' }}>
              <div>
                {title && <h1 className="page-main-title">{title}</h1>}
                {subtitle && <p className="page-sub-title">{subtitle}</p>}
              </div>
              {actions && <div>{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
      <Footer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
