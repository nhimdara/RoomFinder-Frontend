import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Star,
  ExternalLink,
  X,
  Layers,
  Locate,
  GraduationCap
} from 'lucide-react';

// Default center coordinates: Royal University of Phnom Penh (RUPP)
const RUPP_CENTER = { lat: 11.5684, lng: 104.8913 };
const DEFAULT_ZOOM = 14;

// Major campus landmarks
const CAMPUS_LANDMARKS = [
  {
    id: 'rupp-main',
    name: 'Royal University of Phnom Penh (RUPP)',
    position: [11.5684, 104.8913]
  },
  {
    id: 'iffl',
    name: 'Institute of Foreign Languages (IFL)',
    position: [11.5695, 104.8935]
  },
  {
    id: 'itc',
    name: 'Institute of Technology of Cambodia (ITC)',
    position: [11.5710, 104.8978]
  }
];

export const InteractiveMap = ({
  rooms = [],
  selectedRoom = null,
  onSelectRoom = null
}) => {
  const { navigateTo } = useApp();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activePopupRoom, setActivePopupRoom] = useState(null);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'
  const [userLocation, setUserLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [loadingLocation, setLoadingLocation] = useState(false);

  const currentRoom = selectedRoom || activePopupRoom;

  // Auto-request location on initial mount if supported
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          setPermissionStatus(result.state);
          if (result.state === 'granted') {
            requestUserLocation(false);
          }
          result.onchange = () => {
            setPermissionStatus(result.state);
            if (result.state === 'granted') {
              requestUserLocation(false);
            }
          };
        }).catch(() => {});
      }
    }
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [RUPP_CENTER.lat, RUPP_CENTER.lng],
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Default Clean Street Tile Layer (CartoDB Voyager)
      const streetTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd'
        }
      ).addTo(map);

      tileLayerRef.current = streetTiles;

      // Group layer for markers
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Toggle Map Type (Roadmap vs Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    let newTileLayer;
    if (mapType === 'satellite') {
      newTileLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      );
    } else {
      newTileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      );
    }

    newTileLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [mapType]);

  // Update Markers when rooms or selected room changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    // 1. Add Campus Landmark Markers
    CAMPUS_LANDMARKS.forEach((campus) => {
      const campusIcon = L.divIcon({
        className: 'campus-landmark-icon',
        html: `
          <div style="
            background: #1e3a8a;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 12px rgba(30,58,138,0.3);
            border: 2px solid #ffffff;
            white-space: nowrap;
            cursor: default;
          ">
            <span>🎓</span>
            <span>${campus.name.split('(')[0].trim()}</span>
          </div>
        `,
        iconSize: [120, 26],
        iconAnchor: [60, 13]
      });

      L.marker(campus.position, { icon: campusIcon }).addTo(layer);
    });

    // 2. Add User Location Marker if available
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-gps-icon',
        html: `
          <div style="
            width: 18px;
            height: 18px;
            background: #2563eb;
            border: 3px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.25);
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(layer);
    }

    // 3. Add Room Price Markers
    const bounds = L.latLngBounds();

    rooms.forEach((room) => {
      const lat = Number(room.latitude || room.lat) || RUPP_CENTER.lat;
      const lng = Number(room.longitude || room.lng) || RUPP_CENTER.lng;
      const isSelected = currentRoom?.id === room.id;

      bounds.extend([lat, lng]);

      const price = room.price || 0;
      const markerHtml = `
        <div class="room-map-pin ${isSelected ? 'active' : ''}" style="
          background: ${isSelected ? '#2563eb' : '#ffffff'};
          color: ${isSelected ? '#ffffff' : '#0f172a'};
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 13px;
          border: 2px solid ${isSelected ? '#1d4ed8' : '#e2e8f0'};
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.16);
          white-space: nowrap;
          cursor: pointer;
          transform: scale(${isSelected ? '1.15' : '1'});
          transition: transform 0.15s ease, background 0.15s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span style="color: ${isSelected ? '#ffffff' : '#2563eb'}; font-size: 11px;">$</span>
          <span>${price}</span>
        </div>
      `;

      const roomIcon = L.divIcon({
        className: 'room-price-marker',
        html: markerHtml,
        iconSize: [60, 30],
        iconAnchor: [30, 15]
      });

      const marker = L.marker([lat, lng], { icon: roomIcon });
      marker.on('click', () => {
        setActivePopupRoom(room);
        if (onSelectRoom) onSelectRoom(room);
      });

      marker.addTo(layer);
    });

    // If a room is selected, pan smoothly to it
    if (currentRoom) {
      const rLat = Number(currentRoom.latitude || currentRoom.lat) || RUPP_CENTER.lat;
      const rLng = Number(currentRoom.longitude || currentRoom.lng) || RUPP_CENTER.lng;
      mapInstanceRef.current.setView([rLat, rLng], 15, { animate: true });
    }
  }, [rooms, currentRoom, userLocation, onSelectRoom]);

  // Request HTML5 Geolocation
  const requestUserLocation = (alertOnError = true) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      if (alertOnError) alert('Geolocation is not supported by your browser.');
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
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([coords.lat, coords.lng], 15, { animate: true });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setPermissionStatus('denied');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getPrimaryImage = (room) => {
    if (!room) return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800';
    if (Array.isArray(room.images) && room.images.length > 0) {
      const first = room.images[0];
      return typeof first === 'string' ? first : first.url;
    }
    if (Array.isArray(room.image_urls) && room.image_urls.length > 0) {
      return room.image_urls[0];
    }
    return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800';
  };

  return (
    <div
      className="interactive-map-wrapper card"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '480px',
        overflow: 'hidden',
        borderRadius: '16px'
      }}
    >
      {/* Leaflet Map DOM Node */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      />

      {/* Location Permission Request Banner */}
      {permissionStatus !== 'granted' && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            zIndex: 1002,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(8px)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #bfdbfe',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#2563EB" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
              Allow location to view student rooms nearest to your current location.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => requestUserLocation(true)}
            style={{ padding: '5px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Locating...' : 'Allow Location'}
          </button>
        </div>
      )}

      {/* Floating Control Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: permissionStatus !== 'granted' ? '60px' : '14px',
          left: '14px',
          right: '14px',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          transition: 'top 0.2s ease'
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#1e293b'
          }}
        >
          <Layers size={14} color="#2563EB" />
          <span>Interactive Campus Map</span>
        </div>

        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
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
            disabled={loadingLocation}
          >
            <Locate size={14} color="#2563EB" />
          </button>
        </div>
      </div>

      {/* Quick Interactive Pin List at Bottom of Map */}
      {rooms.length > 0 && (
        <div
          className="map-bottom-pins-carousel"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000,
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
          }}
        >
          {rooms.slice(0, 12).map((room) => {
            const isSelected = currentRoom?.id === room.id;
            return (
              <div
                key={room.id}
                onClick={() => {
                  setActivePopupRoom(room);
                  if (onSelectRoom) onSelectRoom(room);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: isSelected ? '#2563eb' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  border: '1px solid',
                  borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}
              >
                <MapPin size={13} color={isSelected ? '#ffffff' : '#2563eb'} />
                <span>${room.price}/mo</span>
                <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 500 }}>
                  • {room.room_type || room.roomType || 'Room'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Room Details Popup Card */}
      {currentRoom && (
        <div
          className="map-popup-card animate-fade-in"
          style={{
            position: 'absolute',
            top: '64px',
            right: '16px',
            width: '270px',
            zIndex: 1001,
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}
        >
          <button
            type="button"
            className="popup-close-btn"
            onClick={() => setActivePopupRoom(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.55)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={13} />
          </button>
          <div className="popup-body">
            <img
              src={getPrimaryImage(currentRoom)}
              alt={currentRoom.title}
              style={{ width: '100%', height: '115px', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}
              >
                <span className="badge badge-primary" style={{ fontSize: '10px', textTransform: 'capitalize' }}>
                  {currentRoom.room_type || currentRoom.roomType || 'Single Room'}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  <Star size={12} fill="#F59E0B" color="#F59E0B" />
                  <span>{Number(currentRoom.average_rating || currentRoom.rating || 5).toFixed(1)}</span>
                </div>
              </div>
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {currentRoom.title}
              </h4>
              <p
                style={{
                  fontSize: '11px',
                  color: '#64748B',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {currentRoom.address || currentRoom.location}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '13px', color: '#0f172a' }}>
                  <strong style={{ fontSize: '15px', color: '#2563eb' }}>${currentRoom.price}</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}> / mo</span>
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
                  onClick={() => navigateTo('room-details', currentRoom.id)}
                >
                  <span>View</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
