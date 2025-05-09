// Types related to map markers and card locations
export interface CardLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  floor?: number; // Optional floor number for indoor positioning
  indoorOnly?: boolean; // Whether this marker is only for indoor maps
  building?: string; // Optional building identifier
  lastUpdated?: string; // Timestamp for when the location was last updated
  title?: string; // Title for the location marker
  description?: string; // Description for the location marker
  status?: 'active' | 'inactive' | 'warning'; // Status of the card for visual indication
  lastSeen?: string; // Timestamp for when the card was last seen
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
