import React, { useEffect, useState } from 'react';
import { Polyline, useMap } from 'react-leaflet';

// Decode polyline string to coordinates
const decodePolyline = (encoded) => {
  let points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
};

export default function RoutePolyline({ userPosition, destination }) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (!userPosition || !destination) {
      setRouteCoordinates([]);
      return;
    }

    const fetchRoute = async () => {
      try {
        const coords = `${userPosition[1]},${userPosition[0]};${destination[1]},${destination[0]}`;
        
        // Request multiple alternative routes with optimizations for pedestrian walkways
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/foot/${coords}?alternatives=3&overview=full&geometries=polyline&continue_straight=false&steps=true`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          // Select the shortest route (by distance, not time) which will prefer walkways
          const shortestRoute = data.routes.reduce((shortest, current) => {
            return current.distance < shortest.distance ? current : shortest;
          });

          const geometry = shortestRoute.geometry;
          const decodedCoords = decodePolyline(geometry);
          setRouteCoordinates(decodedCoords);

          // Fit map bounds to show the entire route
          if (decodedCoords.length > 0) {
            map.fitBounds(decodedCoords, { padding: [50, 50] });
          }
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        // Fallback to straight line if routing fails
        setRouteCoordinates([userPosition, destination]);
      }
    };

    fetchRoute();
  }, [userPosition, destination, map]);

  if (routeCoordinates.length === 0) return null;

  return (
    <Polyline
      positions={routeCoordinates}
      color="#2563eb"
      weight={5}
      opacity={0.7}
    />
  );
}