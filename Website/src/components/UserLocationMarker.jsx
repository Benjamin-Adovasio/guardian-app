import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom blue circle with ping animation for user location
const userIcon = new L.DivIcon({
  className: 'user-location-marker',
  html: `
    <div class="relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

export default function UserLocationMarker({ onPositionChange, onHeadingChange }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    // Get user location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
          if (onPositionChange) onPositionChange(newPosition);
          map.setView(newPosition, map.getZoom());
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );

      // Watch position for real-time updates
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
          if (onPositionChange) onPositionChange(newPosition);
        },
        (error) => {
          console.error('Error watching user location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [map, onPositionChange]);

  // Watch device orientation/heading
  useEffect(() => {
    if (!onHeadingChange) return;

    const handleOrientation = (event) => {
      if (event.webkitCompassHeading) {
        // iOS
        onHeadingChange(event.webkitCompassHeading);
      } else if (event.alpha !== null) {
        // Android
        const heading = 360 - event.alpha;
        onHeadingChange(heading);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('deviceorientationabsolute', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
    };
  }, [onHeadingChange]);

  return position ? (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-blue-900 mb-1">Your Location</h3>
          <p className="text-sm text-gray-600">
            {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}