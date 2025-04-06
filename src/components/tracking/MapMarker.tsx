
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin } from 'lucide-react';

export interface CardLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
}

interface CreateMarkersOptions {
  map: mapboxgl.Map;
  locations: CardLocation[];
  markerRef: React.MutableRefObject<mapboxgl.Marker[]>;
}

export function createMarkers({ map, locations, markerRef }: CreateMarkersOptions): void {
  // Clear existing markers
  markerRef.current.forEach(marker => marker.remove());
  markerRef.current = [];
  
  // Add new markers
  locations.forEach(card => {
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
      .setHTML(`
        <div style="padding: 8px;">
          <div style="font-weight: 600; margin-bottom: 4px;">${card.name}</div>
          <div style="font-size: 12px; color: #666;">${card.location}</div>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">ID: ${card.id}</div>
        </div>
      `);

    // Create custom marker element
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    
    // Create SVG for the marker
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', '#6366f1');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    // Create the map-pin path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '3');
    
    svg.appendChild(path);
    svg.appendChild(circle);
    el.appendChild(svg);

    // Add pulse effect
    const pulse = document.createElement('div');
    pulse.className = 'marker-pulse';
    pulse.style.position = 'absolute';
    pulse.style.width = '30px';
    pulse.style.height = '30px';
    pulse.style.borderRadius = '50%';
    pulse.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
    pulse.style.animation = 'pulse 1.5s infinite';
    el.appendChild(pulse);

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: scale(0.95);
          opacity: 0.7;
        }
        70% {
          transform: scale(1.3);
          opacity: 0;
        }
        100% {
          transform: scale(0.95);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(card.coordinates)
      .setPopup(popup)
      .addTo(map);
      
    markerRef.current.push(marker);
  });
}

// Dummy component for bundling related functions
export const MapMarker: React.FC = () => {
  return null;
};

export default MapMarker;
