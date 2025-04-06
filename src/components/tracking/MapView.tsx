import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { createMarkers, CardLocation } from "./MapMarker";
import { MapPin, Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

  // Mock card locations data with coordinates
  const mockCardLocations = [
    { id: "C001", name: "John Smith", location: "Taipei, Taiwan", coordinates: [121.5654, 25.0330] as [number, number] },
    { id: "C002", name: "Jane Doe", location: "Kaohsiung, Taiwan", coordinates: [120.3010, 22.6273] as [number, number] },
    { id: "C003", name: "Charlie Brown", location: "Tainan, Taiwan", coordinates: [120.2175, 22.9997] as [number, number] },
  ];

  const initializeMapbox = () => {
    if (!mapContainer.current || !mapboxToken) return;
    if (map.current) return;

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
      const locationsToUse = cardLocations || mockCardLocations;
      createMarkers({
        map: map.current!,
        locations: locationsToUse,
        markerRef: markers
      });
    });
  };

  // Initialize Google Maps
  const initializeGoogleMap = () => {
    if (!mapContainer.current || googleMapLoaded) return;

    // Load Google Maps API script if not already loaded
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&callback=initGoogleMap`;
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
          const locationsToUse = cardLocations || mockCardLocations;
          locationsToUse.forEach(location => {
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
      initializeMapbox();
    } else if (mapProvider === 'google') {
      initializeGoogleMap();
    }
  }, [mapProvider, mapboxToken]);

  useEffect(() => {
    // Check if map is already loaded
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
      <div className="map-container bg-muted flex flex-col items-center justify-center p-8 rounded-md min-h-[300px]">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <h3 className="text-lg font-medium">{t("mapboxTokenRequired")}</h3>
          <p className="text-muted-foreground">{t("enterMapboxToken")}:</p>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder={t("enterMapboxPublicToken")}
                onChange={(e) => setMapboxToken(e.target.value)}
                value={mapboxToken}
              />
              <p className="text-xs text-muted-foreground">
                {t("obtainTokenText")} <a href="https://mapbox.com" target="_blank" rel="noopener" className="text-primary">mapbox.com</a>
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">{t("mapProvider")}</p>
              <RadioGroup 
                defaultValue="mapbox" 
                value={mapProvider}
                onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mapbox" id="mapbox" />
                  <Label htmlFor="mapbox">Mapbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google" id="google" />
                  <Label htmlFor="google">Google Maps</Label>
                </div>
              </RadioGroup>
            </div>
            
            {mapboxToken && (
              <Button onClick={initializeMapbox}>
                {t("initializeMap")}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Display Google Maps provider selection if Google is selected but no map is loaded
  if (mapProvider === 'google' && !googleMapLoaded) {
    return (
      <div className="map-container bg-muted flex flex-col items-center justify-center p-8 rounded-md min-h-[300px]">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <h3 className="text-lg font-medium">{t("googleMapsSetup")}</h3>
          <p className="text-muted-foreground">{t("googleMapsExplanation")}</p>
          
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">{t("mapProvider")}</p>
              <RadioGroup 
                value={mapProvider}
                onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mapbox" id="mapbox" />
                  <Label htmlFor="mapbox">Mapbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="google" id="google" />
                  <Label htmlFor="google">Google Maps</Label>
                </div>
              </RadioGroup>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {t("googleMapsApiKeyNeeded")} <a href="https://console.cloud.google.com/" target="_blank" rel="noopener" className="text-primary">Google Cloud Console</a>
            </p>
            
            <Button onClick={initializeGoogleMap}>
              {t("initializeGoogleMap")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map Provider Selection */}
      <div className="absolute top-3 left-3 z-20 bg-white p-2 rounded-md shadow-md">
        <RadioGroup 
          value={mapProvider}
          onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mapbox" id="mapbox-map" />
            <Label htmlFor="mapbox-map" className="text-xs">Mapbox</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="google" id="google-map" />
            <Label htmlFor="google-map" className="text-xs">Google</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="map-container w-full h-[300px] rounded-md relative"
      />
      
      {/* Mapbox Controls (only show for Mapbox) */}
      {mapProvider === 'mapbox' && (
        <>
          {/* Zoom Controls */}
          <div className="absolute top-16 left-3 bg-white p-2 rounded-md shadow-md z-10">
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleZoom('in')}
                title={t("zoomIn")}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleZoom('out')}
                title={t("zoomOut")}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleRecenter}
                title={t("centerMap")}
              >
                <Locate className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Map Style Toggle */}
          <div className="absolute top-3 right-12 bg-white p-2 rounded-md shadow-md z-10">
            <div className="flex flex-col gap-2">
              <Button 
                variant={mapStyle === 'streets-v12' ? 'default' : 'outline'} 
                size="sm" 
                className="text-xs h-7" 
                onClick={() => handleStyleChange('streets-v12')}
              >
                {t("streets")}
              </Button>
              <Button 
                variant={mapStyle === 'satellite-streets-v12' ? 'default' : 'outline'} 
                size="sm" 
                className="text-xs h-7" 
                onClick={() => handleStyleChange('satellite-streets-v12')}
              >
                {t("satellite")}
              </Button>
              <Button 
                variant={mapStyle === 'light-v11' ? 'default' : 'outline'} 
                size="sm" 
                className="text-xs h-7" 
                onClick={() => handleStyleChange('light-v11')}
              >
                {t("light")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
