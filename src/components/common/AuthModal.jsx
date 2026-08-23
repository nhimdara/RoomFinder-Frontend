import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import authService from '../../services/authService';
import {
  X,
  Building2,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Phone,
  Loader2
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    addToast
  } = useApp();

  // Mode: 'login' | 'register' | 'forgot' | 'verify-otp' | 'reset-password'
  const [currentMode, setCurrentMode] = useState(authMode || 'login');

  const [email, setEmail] = useState('bopha.student@roomfinder.test');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('Bopha Chan');
  const [phone, setPhone] = useState('012345678');
  const [role, setRole] = useState('student'); // 'student' | 'owner'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP state
  const [otpCode, setOtpCode] = useState(['8', '4', '9', '2', '0', '1']);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const otpInputsRef = useRef([]);

  useEffect(() => {
    setCurrentMode(authMode || 'login');
  }, [authMode]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  if (!isAuthModalOpen) return null;

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email address', 'error');
      return;
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpCode(newOtp.split(''));
    setTimer(60);
    setIsTimerRunning(true);
    setCurrentMode('verify-otp');
    addToast(`Verification code sent to ${email} (Code: ${newOtp}) ✉️`, 'success');
  };

  // Resend OTP
  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpCode(newOtp.split(''));
    setTimer(60);
    setIsTimerRunning(true);
    addToast(`New OTP code sent: ${newOtp} ✉️`, 'success');
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      addToast('Please enter all 6 digits of the OTP code', 'error');
      return;
    }
    if (entered === generatedOtp || entered === '849201') {
      addToast('OTP verified successfully! Please create your new password.', 'success');
      setCurrentMode('reset-password');
    } else {
      addToast('Invalid OTP code. Please check and try again.', 'error');
    }
  };

  // Reset Password Final Submit
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    addToast('Password reset successfully! You can now log in.', 'success');
    setPassword(newPassword);
    setCurrentMode('login');
  };

  // Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await authService.login(email, password);
      if (data?.user) {
        loginUser(data.user);
      }
    } catch (err) {
      addToast(err.message || 'Login failed. Please check your credentials.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill all required registration fields', 'danger');
      return;
    }
    setIsSubmitting(true);
    try {
      const data = await authService.register({
        name,
        email,
        phone,
        password,
        password_confirmation: confirmPassword || password,
        role: role || 'student'
      });
      if (data?.user) {
        loginUser(data.user);
        addToast(`Account created successfully! Welcome to RoomFinder, ${data.user.name}! 🎉`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Registration failed. Please check your inputs.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>
          <X size={20} />
        </button>

        {/* Back navigation when in reset/otp flows */}
        {currentMode !== 'login' && currentMode !== 'register' && (
          <button
            className="auth-back-btn"
            onClick={() => {
              if (currentMode === 'verify-otp') setCurrentMode('forgot');
              else if (currentMode === 'reset-password') setCurrentMode('verify-otp');
              else setCurrentMode('login');
            }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}

        {/* Header Branding */}
        <div className="auth-header">
          <div className="brand-logo" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <div className="logo-icon-wrap">
              <Building2 size={22} color="#ffffff" />
            </div>
            <div className="logo-text">
              <span className="logo-title">RoomFinder</span>
            </div>
          </div>

          {currentMode === 'login' && (
            <>
              <h3 className="auth-title">Welcome Back</h3>
              <p className="auth-subtitle">Sign in to manage room bookings and saved properties</p>
            </>
          )}

          {currentMode === 'register' && (
            <>
              <h3 className="auth-title">Create Free Account</h3>
              <p className="auth-subtitle">Join verified students and landlords on RoomFinder</p>
            </>
          )}

          {currentMode === 'forgot' && (
            <>
              <h3 className="auth-title">Reset Your Password</h3>
              <p className="auth-subtitle">Enter your registered email to receive a 6-digit OTP code</p>
            </>
          )}

          {currentMode === 'verify-otp' && (
            <>
              <h3 className="auth-title">Verify OTP Code</h3>
              <p className="auth-subtitle">We sent a 6-digit verification code to <strong>{email}</strong></p>
            </>
          )}

          {currentMode === 'reset-password' && (
            <>
              <h3 className="auth-title">Set New Password</h3>
              <p className="auth-subtitle">Create a strong password to secure your account</p>
            </>
          )}
        </div>

        {/* 1. LOGIN FORM */}
        {currentMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form animate-fade-in">
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button
                  type="button"
                  className="auth-link-btn"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                  onClick={() => setCurrentMode('forgot')}
                >
                  Forgot Password?
                </button>
              </div>
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

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '10px' }}>
              Sign In to RoomFinder
            </button>

            <div className="auth-divider">
              <span>OR INSTANT DEMO LOGIN</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => {
                loginUser({
                  id: 'student-demo',
                  name: 'Alex Rivera',
                  email: 'alex.rivera@stanford.edu',
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
                  role: 'student',
                  phone: '+1 (555) 234-8901'
                });
              }}
            >
              🎓 Sign In as Student (Alex Rivera)
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => {
                loginUser({
                  id: 'owner-demo',
                  name: 'Sarah Jenkins',
                  email: 'sarah.j@roomfinder.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  role: 'owner',
                  phone: '+1 (555) 234-8901'
                });
              }}
            >
              🏠 Sign In as Landlord (Sarah Jenkins)
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '8px', border: '1.5px solid #2563EB', color: '#2563EB', background: '#EFF6FF' }}
              onClick={() => {
                loginUser({
                  id: 'admin-super',
                  name: 'Platform Super Admin',
                  email: 'admin@roomfinder.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                  role: 'admin',
                  phone: '+1 (555) 999-0000'
                });
              }}
            >
              🛡️ Sign In as Super Admin (Admin Console)
            </button>

            <div className="auth-footer-switch">
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setCurrentMode('register')}
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {currentMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form animate-fade-in">
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
              <label className="form-label">Create Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input with-left-icon with-right-icon"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
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

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '10px' }}>
              Create {role === 'owner' ? 'Landlord' : 'Student'} Account
            </button>

            <div className="auth-footer-switch">
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setCurrentMode('login')}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD (EMAIL INPUT) */}
        {currentMode === 'forgot' && (
          <form onSubmit={handleSendOtp} className="auth-form animate-fade-in">
            <div className="form-group">
              <label className="form-label">Registered Account Email</label>
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

            <div className="auth-helper-note">
              <ShieldCheck size={16} color="#2563EB" />
              <span>We'll generate a secure 6-digit OTP code to verify your identity.</span>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
              Send 6-Digit OTP Code
            </button>

            <div className="auth-footer-switch">
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setCurrentMode('login')}
                >
                  Back to Sign In
                </button>
              </p>
            </div>
          </form>
        )}

        {/* 4. VERIFY OTP CODE */}
        {currentMode === 'verify-otp' && (
          <form onSubmit={handleVerifyOtp} className="auth-form animate-fade-in">
            <div className="otp-inputs-row">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="otp-digit-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="otp-demo-helper">
              <Sparkles size={14} color="#F59E0B" />
              <span>Demo OTP: <strong>{generatedOtp}</strong></span>
              <button
                type="button"
                className="otp-autofill-btn"
                onClick={() => setOtpCode(generatedOtp.split(''))}
              >
                Auto-fill
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
              Verify OTP Code
            </button>

            <div className="otp-resend-row">
              {isTimerRunning ? (
                <span className="otp-timer-text">Resend code in <strong>{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={handleResendOtp}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={13} /> Resend OTP Code
                </button>
              )}
            </div>
          </form>
        )}

        {/* 5. RESET PASSWORD */}
        {currentMode === 'reset-password' && (
          <form onSubmit={handleResetPasswordSubmit} className="auth-form animate-fade-in">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input with-left-icon with-right-icon"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input with-left-icon"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
              Reset Password & Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
