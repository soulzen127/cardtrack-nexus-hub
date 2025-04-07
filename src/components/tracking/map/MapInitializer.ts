import mapboxgl from 'mapbox-gl';
import { CardLocation } from "../map/types";
import { createMarkers } from "../map/createMarkers";

interface InitializeMapboxOptions {
  mapContainer: React.RefObject<HTMLDivElement>;
  mapboxToken: string;
  mapStyle: string;
  markerRef: React.MutableRefObject<mapboxgl.Marker[]>;
  cardLocations: CardLocation[];
  setIsMapInitialized: (value: boolean) => void;
}

export const initializeMapbox = ({
  mapContainer,
  mapboxToken,
  mapStyle,
  markerRef,
  cardLocations,
  setIsMapInitialized
}: InitializeMapboxOptions) => {
  if (!mapContainer.current || !mapboxToken) return null;
  
  // Initialize Mapbox
  mapboxgl.accessToken = mapboxToken;
  
  const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: `mapbox://styles/mapbox/${mapStyle}`,
    center: [120.9738, 23.9739], // Center on Taiwan
    zoom: 7,
  });

  // Add navigation controls
  map.addControl(
    new mapboxgl.NavigationControl(),
    'top-right'
  );

  // Add markers when map loads
  map.on('load', () => {
    setIsMapInitialized(true);
    
    // Add markers using the extracted function
    createMarkers({
      map: map,
      locations: cardLocations,
      markerRef: markerRef
    });
  });
  
  return map;
};

// Google Maps initialization
export const initializeGoogleMap = (
  mapContainer: React.RefObject<HTMLDivElement>,
  cardLocations: CardLocation[],
  setGoogleMapLoaded: (value: boolean) => void
) => {
  if (!mapContainer.current) return;

  // Load Google Maps API script if not already loaded
  if (!document.getElementById('google-maps-script')) {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDw9haW4EjqqUMvmx7CUj1vGyQ1t120Lw&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback function in the global scope
    window.initGoogleMap = () => {
      if (!mapContainer.current) return;
      
      if (window.google && window.google.maps) {
        const googleMap = new window.google.maps.Map(mapContainer.current, {
          center: { lat: 23.9739, lng: 120.9738 }, // Taiwan center
          zoom: 7,
          mapTypeId: 'roadmap',
        });
        
        // Add markers
        cardLocations.forEach(location => {
          const [lng, lat] = location.coordinates;
          if (window.google && window.google.maps) {
            new window.google.maps.Marker({
              position: { lat, lng },
              map: googleMap,
              title: location.name,
            });
          }
        });
        
        setGoogleMapLoaded(true);
      }
    };
    
    document.head.appendChild(script);
  } else if (window.initGoogleMap) {
    // If script is already loaded, just initialize the map
    window.initGoogleMap();
  }
};
