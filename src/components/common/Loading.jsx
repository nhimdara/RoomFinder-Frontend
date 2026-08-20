import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({
  message = 'Loading properties...',
  fullScreen = false
}) => {
  if (fullScreen) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '12px'
        }}
      >
        <Loader2 size={36} color="#2563EB" className="animate-spin" />
        <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        gap: '10px'
      }}
    >
      <Loader2 size={24} color="#2563EB" className="animate-spin" />
      <span style={{ fontSize: '13px', color: '#64748B' }}>{message}</span>
    </div>
  );
};

export default Loading;
