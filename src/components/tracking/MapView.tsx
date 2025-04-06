
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { createMarkers, CardLocation } from "./MapMarker";
import { MapPin, Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";

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

  // Handle map style changes
  const handleStyleChange = (style: string) => {
    if (!map.current) return;
    
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

  useEffect(() => {
    // Check if map is already loaded
    if (isMapInitialized && map.current) {
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
          <h3 className="text-lg font-medium">{t("mapboxTokenRequired")}</h3>
          <p className="text-muted-foreground">{t("enterMapboxToken")}:</p>
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
          {mapboxToken && (
            <Button onClick={initializeMap}>
              {t("initializeMap")}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="map-container w-full h-[300px] rounded-md relative"
      />
      
      {/* Map Controls */}
      <div className="absolute top-3 left-3 bg-white p-2 rounded-md shadow-md z-10">
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
    </div>
  );
}
