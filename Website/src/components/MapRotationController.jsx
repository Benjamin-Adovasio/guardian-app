import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapRotationController({ heading }) {
  const map = useMap();

  useEffect(() => {
    if (!map || heading === 0) return;

    const mapContainer = map.getContainer();
    const mapPane = mapContainer.querySelector('.leaflet-map-pane');
    const markerPane = mapContainer.querySelector('.leaflet-marker-pane');
    const shadowPane = mapContainer.querySelector('.leaflet-shadow-pane');
    
    if (mapPane) {
      // Rotate the map tiles
      mapPane.style.transform = `rotate(${-heading}deg)`;
      mapPane.style.transformOrigin = 'center center';
    }
    
    // Counter-rotate markers to keep them upright
    if (markerPane) {
      markerPane.style.transform = `rotate(${heading}deg)`;
      markerPane.style.transformOrigin = 'center center';
    }
    
    if (shadowPane) {
      shadowPane.style.transform = `rotate(${heading}deg)`;
      shadowPane.style.transformOrigin = 'center center';
    }

    return () => {
      if (mapPane) mapPane.style.transform = '';
      if (markerPane) markerPane.style.transform = '';
      if (shadowPane) shadowPane.style.transform = '';
    };
  }, [map, heading]);

  return null;
}