
import React from 'react';
import { useMapState } from './map/hooks/useMapState';
import { useI18n } from "@/hooks/use-i18n";
import { MapProviderSelector } from './map/MapProviderSelector';
import { IndoorMapController } from './map/IndoorMapController';
import { TokenInputScreen, GoogleMapSetupScreen } from './map/MapSetupScreens';
import { useAccessControl } from '@/hooks/use-access-control';
import { MapboxMap } from './map/components/MapboxMap';
import { GoogleMap } from './map/components/GoogleMap';
import { AccessDenied } from './map/components/AccessDenied';
import { mockCardLocations } from './map/mockData';
import { CardLocation } from "./map/types";

interface MapViewProps {
  isRealtime: boolean;
  timeSliderValue?: number[];
  selectedDate?: string;
  cardLocations?: CardLocation[];
}

export function MapView({ isRealtime, timeSliderValue, selectedDate, cardLocations }: MapViewProps) {
  const { t } = useI18n();
  const {
    mapboxToken, setMapboxToken,
    isMapInitialized, setIsMapInitialized,
    mapStyle, setMapStyle,
    mapProvider, setMapProvider,
    googleMapLoaded, setGoogleMapLoaded,
    isIndoorMode, setIsIndoorMode,
    currentFloor, setCurrentFloor,
    availableFloors, currentBuilding
  } = useMapState();
  
  // Access control integration
  const { hasAccess, isLoading: accessCheckLoading } = useAccessControl({
    requiredRole: "operator",
    featureKey: "map_access"
  });

  // Handle map provider change
  const handleMapProviderChange = (provider: 'mapbox' | 'google') => {
    setMapProvider(provider);
    setIsMapInitialized(false);
  };

  // Initialize mapbox
  const initMapbox = () => {
    setIsMapInitialized(false);
  };

  // Initialize google maps
  const initGoogleMap = () => {
    setGoogleMapLoaded(false);
  };

  // Display access denied screen if user doesn't have access
  if (!accessCheckLoading && !hasAccess) {
    return <AccessDenied />;
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

  // The actual locations to use (from props or mock data)
  const locationsToUse = cardLocations || mockCardLocations;

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
      
      {/* Map Containers */}
      {mapProvider === 'mapbox' ? (
        <MapboxMap 
          mapboxToken={mapboxToken}
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          isIndoorMode={isIndoorMode}
          currentFloor={currentFloor}
          isMapInitialized={isMapInitialized}
          setIsMapInitialized={setIsMapInitialized}
          cardLocations={locationsToUse}
        />
      ) : (
        <GoogleMap 
          setGoogleMapLoaded={setGoogleMapLoaded}
          cardLocations={locationsToUse}
        />
      )}
      
      {/* Indoor Mode Indicator */}
      {isIndoorMode && (
        <div className="absolute left-2 bottom-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
          {t("indoorMode")}: {currentBuilding}, {t("floor")} {currentFloor}
        </div>
      )}
    </div>
  );
}
