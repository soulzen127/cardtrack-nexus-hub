import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useI18n } from "@/hooks/use-i18n";
import { CardLocation, createMarkers } from "./MapMarker";
import { MapboxControls } from './map/MapboxControls';
import { MapProviderSelector } from './map/MapProviderSelector';
import { TokenInputScreen, GoogleMapSetupScreen } from './map/MapSetupScreens';
import { initializeMapbox, initializeGoogleMap } from './map/MapInitializer';
import { mockCardLocations } from './map/mockData';

interface MapViewProps {
  isRealtime: boolean;
  timeSliderValue?: number[];
  selectedDate?: string;
  cardLocations?: CardLocation[];
}

export function MapView({ isRealtime, timeSliderValue, selectedDate, cardLocations }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { t } = useI18n();
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [mapStyle, setMapStyle] = useState<string>('streets-v12');
  const [mapProvider, setMapProvider] = useState<'mapbox' | 'google'>('mapbox');
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);

  useEffect(() => {
    // Try to get API keys from localStorage
    const storedMapboxToken = localStorage.getItem("mapbox_api_key");
    if (storedMapboxToken) {
      setMapboxToken(storedMapboxToken);
    }
  }, []);

  const initMapbox = () => {
    const result = initializeMapbox({
      mapContainer,
      mapboxToken,
      mapStyle,
      markerRef: markers,
      cardLocations: cardLocations || mockCardLocations,
      setIsMapInitialized
    });
    
    if (result) {
      map.current = result;
    }
  };

  const initGoogleMap = () => {
    initializeGoogleMap(
      mapContainer,
      cardLocations || mockCardLocations,
      setGoogleMapLoaded
    );
  };

  // Handle map style changes
  const handleStyleChange = (style: string) => {
    if (!map.current || mapProvider !== 'mapbox') return;
    
    setMapStyle(style);
    map.current.setStyle(`mapbox://styles/mapbox/${style}`);
    
    // Re-add markers after style change (markers get removed on style change)
    map.current.once('styledata', () => {
      const locationsToUse = cardLocations || mockCardLocations;
      createMarkers({
        map: map.current!,
        locations: locationsToUse,
        markerRef: markers
      });
    });
  };

  // Zoom controls for Mapbox
  const handleZoom = (direction: 'in' | 'out') => {
    if (!map.current || mapProvider !== 'mapbox') return;
    
    const currentZoom = map.current.getZoom();
    map.current.easeTo({
      zoom: direction === 'in' ? currentZoom + 1 : currentZoom - 1,
      duration: 300
    });
  };

  // Center on Taiwan for Mapbox
  const handleRecenter = () => {
    if (!map.current || mapProvider !== 'mapbox') return;
    
    map.current.easeTo({
      center: [120.9738, 23.9739],
      zoom: 7,
      duration: 1000
    });
  };

  // Handle map provider change
  const handleMapProviderChange = (provider: 'mapbox' | 'google') => {
    // Clean up previous map
    markers.current.forEach(marker => marker.remove());
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    
    setMapProvider(provider);
    setIsMapInitialized(false);
  };

  useEffect(() => {
    // Initialize the selected map provider
    if (mapProvider === 'mapbox' && mapboxToken) {
      initMapbox();
    } else if (mapProvider === 'google') {
      initGoogleMap();
    }
  }, [mapProvider, mapboxToken]);

  useEffect(() => {
    // Update markers when card locations change
    if (isMapInitialized && map.current && mapProvider === 'mapbox') {
      // Add markers using the extracted function
      const locationsToUse = cardLocations || mockCardLocations;
      createMarkers({
        map: map.current,
        locations: locationsToUse,
        markerRef: markers
      });
    }
  }, [cardLocations, isMapInitialized]);

  useEffect(() => {
    // Cleanup function
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Display token input if no mapbox token
  if (mapProvider === 'mapbox' && !mapboxToken) {
    return (
      <TokenInputScreen
        mapboxToken={mapboxToken}
        setMapboxToken={setMapboxToken}
        mapProvider={mapProvider}
        handleMapProviderChange={handleMapProviderChange}
        initializeMapbox={initMapbox}
      />
    );
  }

  // Display Google Maps provider selection if Google is selected but no map is loaded
  if (mapProvider === 'google' && !googleMapLoaded) {
    return (
      <GoogleMapSetupScreen
        mapProvider={mapProvider}
        handleMapProviderChange={handleMapProviderChange}
        initializeGoogleMap={initGoogleMap}
      />
    );
  }

  return (
    <div className="relative">
      {/* Map Provider Selection */}
      <MapProviderSelector 
        mapProvider={mapProvider}
        handleMapProviderChange={handleMapProviderChange}
      />
      
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="map-container w-full h-[300px] rounded-md relative"
      />
      
      {/* Mapbox Controls (only show for Mapbox) */}
      {mapProvider === 'mapbox' && (
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
