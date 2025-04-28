
import React, { useState } from 'react';
import { useMapState } from './map/hooks/useMapState';
import { useI18n } from "@/hooks/use-i18n";
import { MapProviderSelector } from './map/MapProviderSelector';
import { IndoorMapController } from './map/IndoorMapController';
import { TokenInputScreen, GoogleMapSetupScreen, CesiumMapSetupScreen } from './map/MapSetupScreens';
import { useAccessControl } from '@/hooks/use-access-control';
import { MapboxMap } from './map/components/MapboxMap';
import { GoogleMap } from './map/components/GoogleMap';
import { CesiumMap } from './map/components/CesiumMap';
import { AccessDenied } from './map/components/AccessDenied';
import { mockCardLocations } from './map/mockData';
import { CardLocation } from "./map/types";
import { Button } from '@/components/ui/button';
import { Building, Globe } from 'lucide-react';
import { FieldSpaceManagement } from './map/components/FieldSpaceManagement';

interface MapViewProps {
  isRealtime: boolean;
  timeSliderValue?: number[];
  selectedDate?: string;
  cardLocations?: CardLocation[];
  center?: [number, number] | null;
  currentMapLayer?: '3dgis' | 'venue';
}

export function MapView({ 
  isRealtime, 
  timeSliderValue, 
  selectedDate, 
  cardLocations, 
  center, 
  currentMapLayer = '3dgis' 
}: MapViewProps) {
  const { t } = useI18n();
  const {
    mapboxToken, setMapboxToken,
    isMapInitialized, setIsMapInitialized,
    mapStyle, setMapStyle,
    mapProvider, setMapProvider,
    googleMapLoaded, setGoogleMapLoaded,
    cesiumMapLoaded, setCesiumMapLoaded,
    isIndoorMode, setIsIndoorMode,
    currentFloor, setCurrentFloor,
    availableFloors, currentBuilding
  } = useMapState();
  
  // Add state for hiding indoor map controller
  const [indoorControllerHidden, setIndoorControllerHidden] = useState(false);
  
  // Access control integration
  const { hasAccess, isLoading: accessCheckLoading } = useAccessControl({
    requiredRole: "operator",
    featureKey: "map_access"
  });

  // Handle map provider change
  const handleMapProviderChange = (provider: 'mapbox' | 'google' | 'cesium') => {
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
  
  // Initialize cesium maps
  const initCesiumMap = () => {
    setCesiumMapLoaded(false);
  };

  // Toggle indoor/outdoor mode
  const toggleIndoorMode = () => {
    setIsIndoorMode(!isIndoorMode);
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
  
  // Display Cesium Maps setup if Cesium is selected but no map is loaded
  if (mapProvider === 'cesium' && !cesiumMapLoaded) {
    return (
      <CesiumMapSetupScreen
        mapProvider={mapProvider}
        handleMapProviderChange={handleMapProviderChange}
        initializeCesiumMap={initCesiumMap}
      />
    );
  }

  // The actual locations to use (from props or mock data)
  const locationsToUse = cardLocations || mockCardLocations;

  // Show different content based on the current map layer
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        {/* Map Provider Selection - only show for 3D GIS layer */}
        {currentMapLayer === '3dgis' && (
          <MapProviderSelector 
            mapProvider={mapProvider}
            handleMapProviderChange={handleMapProviderChange}
          />
        )}
        
        {/* Indoor/Outdoor Toggle Button - if in 3D GIS layer */}
        {currentMapLayer === '3dgis' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleIndoorMode}
            className="flex items-center"
          >
            {isIndoorMode ? (
              <>
                <Building className="h-4 w-4 mr-2" />
                {t("indoorMode")}
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                {t("outdoorMode")}
              </>
            )}
          </Button>
        )}
      </div>
      
      {/* Indoor Map Controller - Now positioned outside the map container */}
      {isIndoorMode && currentMapLayer === '3dgis' && (
        <IndoorMapController
          isIndoorMode={isIndoorMode}
          setIsIndoorMode={setIsIndoorMode}
          currentFloor={currentFloor}
          setCurrentFloor={setCurrentFloor}
          availableFloors={availableFloors}
          buildingName={currentBuilding}
          hidden={indoorControllerHidden}
          setHidden={setIndoorControllerHidden}
          position="right"
        />
      )}
      
      {/* Map Containers */}
      <div className="w-full h-full">
        {currentMapLayer === '3dgis' ? (
          // 3D GIS Map Layer
          mapProvider === 'mapbox' ? (
            <MapboxMap 
              mapboxToken={mapboxToken}
              mapStyle={mapStyle}
              setMapStyle={setMapStyle}
              isIndoorMode={isIndoorMode}
              currentFloor={currentFloor}
              isMapInitialized={isMapInitialized}
              setIsMapInitialized={setIsMapInitialized}
              cardLocations={locationsToUse}
              center={center}
            />
          ) : mapProvider === 'google' ? (
            <GoogleMap 
              setGoogleMapLoaded={setGoogleMapLoaded}
              cardLocations={locationsToUse}
              center={center}
            />
          ) : (
            <CesiumMap
              setCesiumMapLoaded={setCesiumMapLoaded}
              cardLocations={locationsToUse}
              center={center}
            />
          )
        ) : (
          // Field & Space Management Layer
          <FieldSpaceManagement />
        )}
      </div>
      
      {/* Indoor Mode Indicator */}
      {isIndoorMode && !indoorControllerHidden && currentMapLayer === '3dgis' && (
        <div className="absolute left-2 bottom-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
          {t("indoorMode")}: {currentBuilding}, {t("floor")} {currentFloor}
        </div>
      )}
    </div>
  );
}
