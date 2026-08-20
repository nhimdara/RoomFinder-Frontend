import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export const Register = () => {
  const { loginUser, navigateTo, addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill all required registration fields', 'error');
      return;
    }
    loginUser({
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      avatar: role === 'owner'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role
    });
    addToast(`Account created successfully! Welcome to RoomFinder, ${name}! 🎉`, 'success');
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
        <h2 className="auth-title">Create Free Account</h2>
        <p className="auth-subtitle">Join thousands of students and verified property owners</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div className="input-with-icon">
            <User size={18} className="input-icon" />
            <input
              type="text"
              required
              className="form-input with-left-icon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jessica Taylor"
            />
          </div>
        </div>

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
          <label className="form-label">Phone Number</label>
          <div className="input-with-icon">
            <Phone size={18} className="input-icon" />
            <input
              type="tel"
              required
              className="form-input with-left-icon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-with-icon">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              required
              className="form-input with-left-icon"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '12px' }}>
          <span>Create {role === 'owner' ? 'Landlord' : 'Student'} Account</span>
          <ArrowRight size={16} />
        </button>

        <div className="auth-footer-switch">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => navigateTo('login')}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
