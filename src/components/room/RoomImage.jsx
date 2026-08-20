import React, { useState } from 'react';

export const RoomImage = ({
  src,
  alt = 'Room Photo',
  className = '',
  aspectRatio = '4/3'
}) => {
  const [hasError, setHasError] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className={`room-image-wrapper ${className}`}
      style={{ aspectRatio, overflow: 'hidden', position: 'relative' }}
    >
      <img
        src={hasError ? fallback : src || fallback}
        alt={alt}
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
    </div>
  );
};

export default RoomImage;
