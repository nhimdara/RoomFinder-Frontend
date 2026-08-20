import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${
            toast.type === 'success'
              ? 'toast-success'
              : toast.type === 'error'
              ? 'toast-error'
              : ''
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 size={18} color="#10B981" />
          )}
          {toast.type === 'error' && (
            <AlertCircle size={18} color="#EF4444" />
          )}
          {toast.type === 'info' && <Info size={18} color="#3B82F6" />}
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ marginLeft: 'auto', padding: '2px', color: '#94a3b8' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
