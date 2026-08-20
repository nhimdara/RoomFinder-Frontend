import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  ControlPosition,
  MapControl
} from '@vis.gl/react-google-maps';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Navigation,
  Plus,
  Minus,
  Maximize2,
  GraduationCap,
  Star,
  ExternalLink,
  X,
  Layers,
  Sparkles,
  Info,
  Compass,
  Locate
} from 'lucide-react';

// Default center coordinates (University District)
const DEFAULT_CENTER = { lat: 10.7769, lng: 106.7009 };
const DEFAULT_ZOOM = 14;

// Clean Modern Minimalist Google Maps styling matching RoomFinder Figma palette
const MAP_STYLES = [
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [{ color: '#dbeafe' }, { visibility: 'on' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e2fbe8' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e2e8f0' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f1f5f9' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#dbeafe' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#f8fafc' }]
  }
];

// University landmarks on the real map
const UNIVERSITY_LANDMARKS = [
  {
    id: 'uni-1',
    name: 'Tech & Science Campus',
    position: { lat: 10.7785, lng: 106.6990 },
    type: 'tech'
  },
  {
    id: 'uni-2',
    name: 'Medical & Dental Faculty',
    position: { lat: 10.7825, lng: 106.7065 },
    type: 'medical'
  },
  {
    id: 'uni-3',
    name: 'Business & Law School',
    position: { lat: 10.7860, lng: 106.7115 },
    type: 'business'
  }
];

// Helper to pan map to selected room or user location
const MapPanController = ({ targetLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (map && targetLocation && targetLocation.lat && targetLocation.lng) {
      map.panTo({ lat: targetLocation.lat, lng: targetLocation.lng });
      map.setZoom(15);
    }
  }, [map, targetLocation]);
  return null;
};

export const InteractiveMap = ({
  rooms = [],
  selectedRoom = null,
  onSelectRoom = null
}) => {
  const { navigateTo } = useApp();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [activePopupRoom, setActivePopupRoom] = useState(null);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'
  const [userLocation, setUserLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [loadingLocation, setLoadingLocation] = useState(false);

  const currentRoom = selectedRoom || activePopupRoom;
  const targetLocation = currentRoom
    ? { lat: currentRoom.lat, lng: currentRoom.lng }
    : userLocation || DEFAULT_CENTER;

  const hasValidKey = apiKey && apiKey.length > 5 && !apiKey.includes('YOUR_KEY');

  const handleMarkerClick = (room) => {
    setActivePopupRoom(room);
    if (onSelectRoom) onSelectRoom(room);
  };

  const requestUserLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(coords);
        setPermissionStatus('granted');
        setLoadingLocation(false);
      },
      (error) => {
        console.warn('Geolocation permission denied:', error);
        setPermissionStatus('denied');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="interactive-map-wrapper card" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Location Permission Request Banner */}
      {permissionStatus !== 'granted' && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 35,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #c7d2fe',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#2563EB" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
              Allow location to view student rooms near your campus spot.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={requestUserLocation}
            style={{ padding: '4px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Locating...' : 'Allow Location'}
          </button>
        </div>
      )}

      {hasValidKey ? (
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: '100%', height: '100%' }}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            gestureHandling="greedy"
            disableDefaultUI={true}
            mapTypeId={mapType}
            mapId="DEMO_MAP_ID"
            styles={MAP_STYLES}
            internalUsageAttributionIds={['gmp_git_agentskills_v1']}
          >
            <MapPanController targetLocation={targetLocation} />

            {/* Custom Header Controls */}
            <MapControl position={ControlPosition.TOP_LEFT}>
              <div className="map-layer-tag" style={{ margin: permissionStatus !== 'granted' ? '54px 12px 12px' : '12px' }}>
                <Layers size={14} color="#2563EB" />
                <span>Google Maps Live</span>
              </div>
            </MapControl>

            <MapControl position={ControlPosition.TOP_RIGHT}>
              <div style={{
                margin: permissionStatus !== 'granted' ? '54px 12px 12px' : '12px',
                display: 'flex',
                gap: '6px',
                background: '#fff',
                padding: '4px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <button
                  className={`btn btn-sm ${mapType === 'roadmap' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => setMapType('roadmap')}
                >
                  Map
                </button>
                <button
                  className={`btn btn-sm ${mapType === 'satellite' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => setMapType('satellite')}
                >
                  Satellite
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ padding: '4px 8px' }}
                  title="Locate My Position"
                  onClick={requestUserLocation}
                >
                  <Locate size={14} color="#2563EB" />
                </button>
              </div>
            </MapControl>

            {/* User Live GPS Marker */}
            {userLocation && (
              <AdvancedMarker position={userLocation} title="Your Location">
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#2563eb',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 6px rgba(37, 99, 235, 0.3)'
                }} />
              </AdvancedMarker>
            )}

            {/* University Landmark Markers */}
            {UNIVERSITY_LANDMARKS.map((uni) => (
              <AdvancedMarker
                key={uni.id}
                position={uni.position}
                title={uni.name}
              >
                <div className="landmark-badge">
                  <GraduationCap size={14} color="#ffffff" />
                  <span>{uni.name}</span>
                </div>
              </AdvancedMarker>
            ))}

            {/* Room Price Advanced Markers */}
            {rooms.map((room) => {
              const isSelected = currentRoom?.id === room.id;
              return (
                <AdvancedMarker
                  key={room.id}
                  position={{ lat: room.lat || DEFAULT_CENTER.lat, lng: room.lng || DEFAULT_CENTER.lng }}
                  onClick={() => handleMarkerClick(room)}
                  title={room.title}
                >
                  <div className={`room-map-pin ${isSelected ? 'active' : ''}`} style={{ position: 'relative', transform: 'none' }}>
                    <div className="pin-pill-box">
                      <span className="pin-price">${room.price}</span>
                    </div>
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Selected Room InfoWindow Popup */}
            {currentRoom && (
              <InfoWindow
                position={{
                  lat: currentRoom.lat || DEFAULT_CENTER.lat,
                  lng: currentRoom.lng || DEFAULT_CENTER.lng
                }}
                onCloseClick={() => setActivePopupRoom(null)}
                headerDisabled={true}
              >
                <div className="popup-body" style={{ width: '240px', padding: '4px' }}>
                  <img
                    src={currentRoom.images[0]}
                    alt={currentRoom.title}
                    style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                  />
                  <div className="popup-details" style={{ padding: 0 }}>
                    <div className="popup-meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span className="badge badge-primary">{currentRoom.roomType}</span>
                      <div className="popup-rating" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 700 }}>
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        <span>{currentRoom.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <h4 className="popup-title" style={{ fontSize: '13px', fontWeight: 700, margin: '4px 0' }}>{currentRoom.title}</h4>
                    <p className="popup-address" style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>{currentRoom.address}</p>
                    <div className="popup-bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="popup-price-tag">
                        <strong>${currentRoom.price}</strong> / mo
                      </span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigateTo('room-details', currentRoom.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      ) : (
        /* Real Interactive Google Maps Container with Real Satellite & Street Tiles */
        <div className="real-google-map-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Live Google Map iframe view centered on target coordinates */}
          <iframe
            title="Real Google Map View"
            src={`https://maps.google.com/maps?q=${targetLocation.lat},${targetLocation.lng}&z=${selectedRoom ? 16 : 14}&t=${mapType === 'satellite' ? 'k' : 'm'}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Map Overlay Control Bar */}
          <div className="map-toolbar-overlay" style={{ marginTop: permissionStatus !== 'granted' ? '46px' : '0px' }}>
            <div className="map-layer-tag">
              <Layers size={14} color="#2563EB" />
              <span>Real Google Map View</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <div className="map-view-switcher" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.95)', padding: '3px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  className={`btn btn-sm ${mapType === 'roadmap' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => setMapType('roadmap')}
                >
                  Map
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mapType === 'satellite' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => setMapType('satellite')}
                >
                  Satellite
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  style={{ padding: '4px 8px' }}
                  title="Locate My Position"
                  onClick={requestUserLocation}
                >
                  <Locate size={14} color="#2563EB" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Interactive Pin List Overlay on Bottom of Map */}
          <div className="map-bottom-pins-carousel" style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 10,
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
          }}>
            {rooms.map((room) => {
              const isSelected = currentRoom?.id === room.id;
              return (
                <div
                  key={room.id}
                  className={`map-chip-pin ${isSelected ? 'active' : ''}`}
                  onClick={() => handleMarkerClick(room)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: isSelected ? '#2563eb' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    border: '1px solid',
                    borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '13px',
                    fontWeight: 700,
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                >
                  <MapPin size={14} color={isSelected ? '#ffffff' : '#2563eb'} />
                  <span>${room.price}/mo</span>
                  <span style={{ fontSize: '11px', opacity: 0.85, fontWeight: 500 }}>• {room.roomType}</span>
                </div>
              );
            })}
          </div>

          {/* Selected Room Popup Preview Card on Google Maps */}
          {currentRoom && (
            <div
              className="map-popup-card animate-fade-in"
              style={{
                position: 'absolute',
                top: permissionStatus !== 'granted' ? '110px' : '64px',
                right: '16px',
                width: '280px',
                zIndex: 20
              }}
            >
              <button
                className="popup-close-btn"
                onClick={() => setActivePopupRoom(null)}
              >
                <X size={14} />
              </button>
              <div className="popup-body">
                <img
                  src={currentRoom.images[0]}
                  alt={currentRoom.title}
                  className="popup-img"
                />
                <div className="popup-details">
                  <div className="popup-meta">
                    <span className="badge badge-primary">{currentRoom.roomType}</span>
                    <div className="popup-rating">
                      <Star size={12} fill="#F59E0B" color="#F59E0B" />
                      <span>{currentRoom.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h4 className="popup-title">{currentRoom.title}</h4>
                  <p className="popup-address">{currentRoom.address}</p>
                  <div className="popup-bottom-row">
                    <span className="popup-price-tag">
                      <strong>${currentRoom.price}</strong> / mo
                    </span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigateTo('room-details', currentRoom.id)}
                    >
                      View <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
