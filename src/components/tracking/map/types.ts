
// Types related to map markers and card locations
export interface CardLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
}

export interface CreateMarkersOptions {
  map: mapboxgl.Map;
  locations: CardLocation[];
  markerRef: React.MutableRefObject<mapboxgl.Marker[]>;
}
