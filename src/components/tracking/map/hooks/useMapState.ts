
import { useState, useEffect } from 'react';

export function useMapState() {
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

  return {
    mapboxToken, 
    setMapboxToken,
    isMapInitialized, 
    setIsMapInitialized,
    mapStyle, 
    setMapStyle,
    mapProvider, 
    setMapProvider,
    googleMapLoaded, 
    setGoogleMapLoaded,
    isIndoorMode, 
    setIsIndoorMode,
    currentFloor, 
    setCurrentFloor,
    availableFloors,
    setAvailableFloors,
    currentBuilding,
    setCurrentBuilding
  };
}
