
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CardLocation } from '../types';
import { initializeMapbox } from '../MapInitializer';
import { MapboxControls } from '../MapboxControls';

interface MapboxMapProps {
  mapboxToken: string;
  mapStyle: string;
  setMapStyle: (style: string) => void;
  isIndoorMode: boolean;
  currentFloor: number;
  isMapInitialized: boolean;
  setIsMapInitialized: (initialized: boolean) => void;
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
  cardLocations = [],
  center
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Initialize map or update token if it changes
  useEffect(() => {
    // Check for stored token in localStorage if not provided in props
    const storedToken = localStorage.getItem('mapbox_api_key') || mapboxToken;
    
    if (!mapContainer.current || !storedToken) return;
    
    if (!map.current) {
      console.log('MapboxMap: Initializing map with token:', storedToken.substring(0, 10) + '...');
      
      try {
        // Initialize the Mapbox token
        const initialized = initializeMapbox(storedToken);
        
        if (initialized) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/${mapStyle}`,
            center: [121.5654, 25.0330], // Default to Taipei
            zoom: 13
          });
          
          map.current.on('load', () => {
            console.log('MapboxMap: Map loaded successfully');
            setIsMapInitialized(true);
            
            // Create markers for locations
            if (cardLocations.length > 0 && map.current) {
              createMarkers();
            }
          });
          
          map.current.on('error', (e) => {
            console.error('MapboxMap: Error loading map:', e);
            setIsMapInitialized(false);
          });
        }
      } catch (error) {
        console.error('MapboxMap: Error initializing map:', error);
        setIsMapInitialized(false);
      }
    }
    
    return () => {
      if (map.current) {
        console.log('MapboxMap: Cleaning up map instance');
        clearMarkers();
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, mapStyle, setIsMapInitialized]);
  
  // Update markers when locations change
  useEffect(() => {
    if (map.current && isMapInitialized && cardLocations.length > 0) {
      createMarkers();
    }
  }, [cardLocations, isMapInitialized]);
  
  // Update map style if it changes
  useEffect(() => {
    if (map.current && isMapInitialized) {
      map.current.setStyle(`mapbox://styles/mapbox/${mapStyle}`);
    }
  }, [mapStyle, isMapInitialized]);
  
  // Pan to selected location if center changes
  useEffect(() => {
    if (map.current && isMapInitialized && center) {
      map.current.flyTo({
        center: center,
        zoom: 15
      });
    }
  }, [center, isMapInitialized]);
  
  // Helper function to create markers
  const createMarkers = () => {
    if (!map.current) return;
    
    // Clear existing markers
    clearMarkers();
    
    // Create new markers
    cardLocations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'mapbox-custom-marker';
      // Default to amber if status is not provided, otherwise use green for active, amber for others
      const markerColor = location.status === 'active' ? '#10b981' : '#f59e0b';
      el.style.backgroundColor = markerColor;
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map.current!);
      
      // Add popup with info
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${location.name}</h3>
            <p>${location.description || ''}</p>
            <p class="text-xs mt-1">Last updated: ${location.lastSeen || location.lastUpdated || 'N/A'}</p>
          </div>
        `);
        
      marker.setPopup(popup);
      markers.current.push(marker);
    });
  };
  
  // Helper function to clear all markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };
  
  // Zoom and recenter handlers
  const handleZoom = (direction: 'in' | 'out') => {
    if (map.current) {
      const zoom = map.current.getZoom();
      map.current.zoomTo(direction === 'in' ? zoom + 1 : zoom - 1);
    }
  };
  
  const handleRecenter = () => {
    if (map.current && cardLocations.length > 0) {
      // Create a bounds that contains all locations
      const bounds = new mapboxgl.LngLatBounds();
      cardLocations.forEach(location => {
        bounds.extend(location.coordinates as [number, number]);
      });
      
      // Fit the map to these bounds
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  };
  
  const handleStyleChange = (style: string) => {
    setMapStyle(style);
  };

  return (
    <div className="w-full h-[500px] rounded-md relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-md" style={{ zIndex: 1 }} />
      
      {map.current && isMapInitialized && (
        <MapboxControls
          map={map.current}
          mapStyle={mapStyle}
          handleZoom={handleZoom}
          handleRecenter={handleRecenter}
          handleStyleChange={handleStyleChange}
        />
      )}
    </div>
  );
}
