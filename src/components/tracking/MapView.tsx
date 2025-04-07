
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useI18n } from "@/hooks/use-i18n";
import { CardLocation } from "./MapMarker";
import { MapboxControls } from './map/MapboxControls';
import { MapProviderSelector } from './map/MapProviderSelector';
import { TokenInputScreen, GoogleMapSetupScreen } from './map/MapSetupScreens';
import { initializeMapbox, initializeGoogleMap } from './map/MapInitializer';
import { mockCardLocations } from './map/mockData';
import { IndoorMapController } from './map/IndoorMapController';
import { useAccessControl } from '@/hooks/use-access-control';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  // Indoor map state
  const [isIndoorMode, setIsIndoorMode] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [availableFloors, setAvailableFloors] = useState([-1, 0, 1, 2, 3]);
  const [currentBuilding, setCurrentBuilding] = useState("Office Building");
  
  // Access control integration
  const { hasAccess, isLoading: accessCheckLoading } = useAccessControl({
    requiredRole: "operator",
    featureKey: "map_access"
  });

  useEffect(() => {
    // Try to get API keys from localStorage
    const storedMapboxToken = localStorage.getItem("mapbox_api_key");
    if (storedMapboxToken) {
      setMapboxToken(storedMapboxToken);
    }
    
    // Check if indoor maps are enabled
    const indoorMapsEnabled = localStorage.getItem("indoor_maps_enabled");
    if (indoorMapsEnabled === "false") {
      setIsIndoorMode(false);
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
      
      // Filter by floor if in indoor mode
      const filteredLocations = isIndoorMode 
        ? locationsToUse.filter(loc => loc.floor === currentFloor)
        : locationsToUse;
      
      createMarkers({
        map: map.current!,
        locations: filteredLocations,
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

  // Handle floor change in indoor mode
  useEffect(() => {
    if (isIndoorMode && isMapInitialized && map.current) {
      // Update markers for the current floor
      // In a real app, you'd load different floor plan images here
      
      // First, remove existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Filter locations by floor
      const locationsToUse = (cardLocations || mockCardLocations)
        .filter(loc => "floor" in loc ? loc.floor === currentFloor : true);
      
      // Add filtered markers
      if (locationsToUse.length > 0) {
        createMarkers({
          map: map.current,
          locations: locationsToUse,
          markerRef: markers
        });
      }
    }
  }, [currentFloor, isIndoorMode, isMapInitialized, cardLocations]);

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

  // Display access denied screen if user doesn't have access
  if (!accessCheckLoading && !hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-10 text-center">
        <Shield className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
        <p className="text-sm text-muted-foreground mb-4">
          You don't have sufficient permissions to access the map view.
          Please contact an administrator for access.
        </p>
        <Button variant="outline" size="sm">
          Request Access
        </Button>
      </div>
    );
  }

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
      
      {/* Indoor Mode Controller */}
      <IndoorMapController
        isIndoorMode={isIndoorMode}
        setIsIndoorMode={setIsIndoorMode}
        currentFloor={currentFloor}
        setCurrentFloor={setCurrentFloor}
        availableFloors={availableFloors}
        buildingName={currentBuilding}
      />
      
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="map-container w-full h-[300px] rounded-md relative"
      />
      
      {/* Indoor Mode Indicator */}
      {isIndoorMode && (
        <div className="absolute left-2 bottom-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
          Indoor Mode: {currentBuilding}, Floor {currentFloor}
        </div>
      )}
      
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

// Import this at the top to fix the error in the current component
import { createMarkers } from "./map/createMarkers";
