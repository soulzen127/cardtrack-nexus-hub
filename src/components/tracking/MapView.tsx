
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";

interface MapViewProps {
  isRealtime: boolean;
  timeSliderValue?: number[];
  selectedDate?: string;
  cardLocations?: { id: string; name: string; location: string; coordinates: [number, number] }[];
}

export function MapView({ isRealtime, timeSliderValue, selectedDate, cardLocations }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { t } = useI18n();
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Mock card locations data with coordinates
  const mockCardLocations = [
    { id: "C001", name: "John Smith", location: "Taipei, Taiwan", coordinates: [121.5654, 25.0330] as [number, number] },
    { id: "C002", name: "Jane Doe", location: "Kaohsiung, Taiwan", coordinates: [120.3010, 22.6273] as [number, number] },
    { id: "C003", name: "Charlie Brown", location: "Tainan, Taiwan", coordinates: [120.2175, 22.9997] as [number, number] },
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    if (map.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [120.9738, 23.9739], // Center on Taiwan
      zoom: 7,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers when map loads
    map.current.on('load', () => {
      setIsMapInitialized(true);
      addMarkers();
    });
  };

  const addMarkers = () => {
    if (!map.current || !isMapInitialized) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Add new markers
    const locationsToUse = cardLocations || mockCardLocations;
    locationsToUse.forEach(card => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <strong>${card.name}</strong>
            <p>${card.location}</p>
            <p>Card ID: ${card.id}</p>
          </div>
        `);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#6366f1'; 
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';

      const marker = new mapboxgl.Marker(el)
        .setLngLat(card.coordinates)
        .setPopup(popup)
        .addTo(map.current);
        
      markers.current.push(marker);
    });
  };

  useEffect(() => {
    // Check if map is already loaded
    if (isMapInitialized && map.current) {
      addMarkers();
    }
  }, [cardLocations, isMapInitialized]);

  useEffect(() => {
    initializeMap();

    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="map-container bg-muted flex flex-col items-center justify-center p-8 rounded-md min-h-[300px]">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <h3 className="text-lg font-medium">Mapbox API Token Required</h3>
          <p className="text-muted-foreground">Please enter your Mapbox public token to enable the map view:</p>
          <div className="flex flex-col space-y-2">
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter Mapbox public token"
              onChange={(e) => setMapboxToken(e.target.value)}
              value={mapboxToken}
            />
            <p className="text-xs text-muted-foreground">
              You can obtain a token by creating an account at <a href="https://mapbox.com" target="_blank" rel="noopener" className="text-primary">mapbox.com</a>
            </p>
          </div>
          {mapboxToken && (
            <Button onClick={initializeMap}>
              Initialize Map
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className="map-container w-full h-[300px] rounded-md relative"
    />
  );
}
