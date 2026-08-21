import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import authService from '../services/authService';
import { Building2, User, Mail, Lock, Phone, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export const Register = () => {
  const { loginUser, navigateTo, addToast } = useApp();
  const [step, setStep] = useState('register'); // 'register' | 'otp'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [gender, setGender] = useState('male');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.register({
        name,
        email,
        phone,
        password,
        password_confirmation: password,
        role,
        gender
      });
      addToast('Registration submitted! Please enter the 6-digit OTP code sent to your email.', 'success');
      setStep('otp');
    } catch (err) {
      addToast(err.message || 'Registration failed. Please verify your details.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.verifyOtp(email, otp, 'register');
      if (data?.user) {
        loginUser(data.user);
      }
    } catch (err) {
      addToast(err.message || 'Invalid or expired OTP verification code.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await authService.resendOtp(email, 'register');
      addToast('A new OTP verification code has been dispatched.', 'info');
    } catch (err) {
      addToast(err.message || 'Could not resend OTP code.', 'danger');
    }
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
        <h2 className="auth-title">{step === 'register' ? 'Create Free Account' : 'Verify Email Code'}</h2>
        <p className="auth-subtitle">
          {step === 'register'
            ? 'Join university students and verified property owners'
            : `Enter the 6-digit OTP sent to ${email}`}
        </p>
      </div>

      {step === 'register' ? (
        <form onSubmit={handleRegisterSubmit} className="auth-form">
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
                placeholder="e.g. Sokha Student"
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
                placeholder="student@example.com"
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
                placeholder="012345678"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student / Seeker</option>
                <option value="owner">Property Landlord</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                minLength={6}
                className="form-input with-left-icon"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
              />
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Continue & Verify</span>
                <ArrowRight size={16} />
              </>
            )}
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
      ) : (
        <form onSubmit={handleOtpSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">6-Digit Verification Code</label>
            <div className="input-with-icon">
              <ShieldCheck size={18} className="input-icon" />
              <input
                type="text"
                required
                maxLength={6}
                className="form-input with-left-icon"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim())}
                placeholder="123456"
                style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
              />
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
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Confirm & Log In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setStep('register')}
            >
              ← Edit details
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
