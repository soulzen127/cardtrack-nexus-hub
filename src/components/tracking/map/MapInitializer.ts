
import mapboxgl from 'mapbox-gl';

// Helper function to check if mapbox token is valid
export function isValidMapboxToken(token: string): boolean {
  return token.startsWith('pk.') && token.length > 20;
}

// Initialize mapbox with token
export function initializeMapbox(token: string): boolean {
  if (!isValidMapboxToken(token)) {
    console.error('Invalid Mapbox token format');
    return false;
  }
  
  try {
    mapboxgl.accessToken = token;
    
    // Store token in localStorage for future use
    localStorage.setItem('mapbox_api_key', token);
    
    return true;
  } catch (error) {
    console.error('Error initializing Mapbox:', error);
    return false;
  }
}

// Utility function to convert coordinates to string format
export function formatCoordinates(coordinates: [number, number]): string {
  return `${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}`;
}

// Convert raw coordinates to appropriate format for display
export function formatLatLng(coordinates: [number, number]): string {
  const [lng, lat] = coordinates;
  return `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`;
}
