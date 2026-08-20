import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '520px'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {(title || subtitle) && (
          <div className="auth-header" style={{ marginBottom: '20px' }}>
            {title && <h3 className="auth-title">{title}</h3>}
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
