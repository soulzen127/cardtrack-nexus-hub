
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CardLocation } from "../types";
import { createMarkers } from "../createMarkers";
import { MapboxControls } from '../MapboxControls';

interface MapboxMapProps {
  mapboxToken: string;
  mapStyle: string;
  setMapStyle: (style: string) => void;
  isIndoorMode: boolean;
  currentFloor: number;
  isMapInitialized: boolean;
  setIsMapInitialized: (value: boolean) => void;
  cardLocations?: CardLocation[];
  center?: [number, number] | null;
}

export function MapboxMap({ 
  mapboxToken, 
  mapStyle, 
  setMapStyle, 
  isIndoorMode, 
  currentFloor, 
  isMapInitialized,
  setIsMapInitialized,
  cardLocations,
  center
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    // Initialize Mapbox
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
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
      
      // Add markers using the extracted function
      if (cardLocations) {
        createMarkers({
          map: map.current!,
          locations: cardLocations,
          markerRef: markers
        });
      }
    });
    
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, setIsMapInitialized, cardLocations]);

  // Update markers when locations or floor changes
  useEffect(() => {
    if (isMapInitialized && map.current && cardLocations) {
      // Filter locations by floor if in indoor mode
      const locationsToUse = isIndoorMode 
        ? cardLocations.filter(loc => loc.floor === currentFloor)
        : cardLocations;
        
      createMarkers({
        map: map.current,
        locations: locationsToUse,
        markerRef: markers
      });
    }
  }, [isIndoorMode, currentFloor, isMapInitialized, cardLocations]);

  // Center map when center coordinates change
  useEffect(() => {
    if (map.current && center) {
      map.current.flyTo({
        center: center,
        zoom: 15,
        essential: true,
        duration: 1000
      });
    }
  }, [center]);

  // Handle style changes
  const handleStyleChange = (style: string) => {
    if (!map.current) return;
    
    setMapStyle(style);
    map.current.setStyle(`mapbox://styles/mapbox/${style}`);
    
    // Re-add markers after style change (markers get removed on style change)
    map.current.once('styledata', () => {
      if (!cardLocations) return;
      
      // Filter by floor if in indoor mode
      const filteredLocations = isIndoorMode 
        ? cardLocations.filter(loc => loc.floor === currentFloor)
        : cardLocations;
      
      createMarkers({
        map: map.current!,
        locations: filteredLocations,
        markerRef: markers
      });
    });
  };

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    if (!map.current) return;
    
    const currentZoom = map.current.getZoom();
    map.current.easeTo({
      zoom: direction === 'in' ? currentZoom + 1 : currentZoom - 1,
      duration: 300
    });
  };

  // Center on Taiwan
  const handleRecenter = () => {
    if (!map.current) return;
    
    map.current.easeTo({
      center: [120.9738, 23.9739],
      zoom: 7,
      duration: 1000
    });
  };

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="map-container w-full h-[300px] rounded-md relative"
      />
      
      <MapboxControls
        map={map.current}
        mapStyle={mapStyle}
        handleZoom={handleZoom}
        handleRecenter={handleRecenter}
        handleStyleChange={handleStyleChange}
      />
    </div>
  );
}
