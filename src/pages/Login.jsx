import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { loginUser, navigateTo } = useApp();
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuperAdmin = email.toLowerCase().includes('admin');
    const isOwner =
      email.toLowerCase().includes('sarah') ||
      email.toLowerCase().includes('landlord') ||
      email.toLowerCase().includes('realty') ||
      email.toLowerCase().includes('chen') ||
      email.toLowerCase().includes('vance');
    const detectedRole = isSuperAdmin ? 'admin' : isOwner ? 'owner' : 'student';

    loginUser({
      id: `user-${Date.now()}`,
      name: isSuperAdmin ? 'Platform Super Admin' : isOwner ? 'Sarah Jenkins' : 'Alex Rivera',
      email: email,
      avatar: isSuperAdmin
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : isOwner
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: detectedRole,
      phone: '+1 (555) 234-8901'
    });
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
          <label className="form-label">Email Address</label>
          <div className="input-with-icon">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              required
              className="form-input with-left-icon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
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

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '12px' }}>
          <span>Sign In</span>
          <ArrowRight size={16} />
        </button>

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
