
import mapboxgl from 'mapbox-gl';
import { CreateMarkersOptions } from './types';
import { createMarkerElement, createPopupContent } from './markerUtils';

// Main function to create markers on the map
export function createMarkers({ map, locations, markerRef }: CreateMarkersOptions): void {
  // Clear existing markers
  markerRef.current.forEach(marker => marker.remove());
  markerRef.current = [];
  
  // Add new markers
  locations.forEach(card => {
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
      .setHTML(createPopupContent(card));

    // Create marker element with pulse effect
    const el = createMarkerElement();

    // Add marker to map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(card.coordinates)
      .setPopup(popup)
      .addTo(map);
      
    markerRef.current.push(marker);
  });
}
