import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import authService from '../services/authService';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

export const Login = () => {
  const { loginUser, navigateTo, addToast } = useApp();
  const [email, setEmail] = useState('bopha.student@roomfinder.test');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data?.user) {
        loginUser(data.user);
      }
    } catch (err) {
      addToast(err.message || 'Login failed. Please check your credentials.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail, demoPassword = 'password') => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="card" style={{ padding: '36px 32px' }}>
      <div className="auth-header">
        <div className="brand-logo" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <div className="logo-icon-wrap">
            <Building2 size={22} color="#ffffff" />
          </div>
          <div className="logo-text">
            <span className="logo-title">RoomFinder</span>
          </div>
        </div>
        <h2 className="auth-title">Sign In to Your Account</h2>
        <p className="auth-subtitle">Enter your email and password to access your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email or Phone</label>
          <div className="input-with-icon">
            <Mail size={18} className="input-icon" />
            <input
              type="text"
              required
              className="form-input with-left-icon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@roomfinder.test"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-with-icon">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="form-input with-left-icon with-right-icon"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="input-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: '100%', marginTop: '12px' }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spin-animate" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Quick Demo Fill Buttons */}
        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-secondary, #f8fafc)', borderRadius: '8px', border: '1px solid var(--border-color, #e2e8f0)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary, #64748b)', marginBottom: '8px', textAlign: 'center' }}>
            Quick Demo Accounts (Database Seeded)
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => handleQuickFill('bopha.student@roomfinder.test')}
            >
              Student
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => handleQuickFill('sokha.owner@roomfinder.test')}
            >
              Owner
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => handleQuickFill('admin@roomfinder.test')}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="auth-footer-switch">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => navigateTo('register')}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
