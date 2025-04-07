
// Types related to map markers and card locations
export interface CardLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  floor?: number; // Optional floor number for indoor positioning
  indoorOnly?: boolean; // Whether this marker is only for indoor maps
  building?: string; // Optional building identifier
}

export interface CreateMarkersOptions {
  map: mapboxgl.Map;
  locations: CardLocation[];
  markerRef: React.MutableRefObject<mapboxgl.Marker[]>;
}

// Types for indoor map data
export interface IndoorMapData {
  id: string;
  name: string;
  description?: string;
  type: '2d' | '3d';
  url: string;
  floors: number[];
  defaultFloor: number;
  buildingId: string;
}

// Access control types
export interface AccessControlConfig {
  requiredRole: 'viewer' | 'operator' | 'manager' | 'admin';
  featureKey: string;
}
