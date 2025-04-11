
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockCardLocations } from "@/components/tracking/map/mockData";
import { createMarkers } from "@/components/tracking/map/createMarkers";
import { CardLocation } from "@/components/tracking/map/types";
import { useI18n } from "@/hooks/use-i18n";

export const LocationOverview = () => {
  const { t } = useI18n();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load overview map with real-time location data
  useEffect(() => {
    // Check if token exists in localStorage
    const mapboxToken = localStorage.getItem("mapbox_api_key");
    
    if (mapContainer.current && mapboxToken && !map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [120.9738, 23.9739], // Taiwan center
        zoom: 5,
      });
      
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add markers using the createMarkers function
        if (map.current) {
          createMarkers({
            map: map.current,
            locations: mockCardLocations,
            markerRef: markers
          });
        }
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    const interval = setInterval(() => {
      // Update markers with slightly modified positions to simulate movement
      const updatedLocations: CardLocation[] = mockCardLocations.map(location => ({
        ...location,
        coordinates: [
          location.coordinates[0] + (Math.random() - 0.5) * 0.005,
          location.coordinates[1] + (Math.random() - 0.5) * 0.005
        ] as [number, number]
      }));
      
      createMarkers({
        map: map.current!,
        locations: updatedLocations,
        markerRef: markers
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [mapLoaded]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{t("locationOverview")}</CardTitle>
        <CardDescription>{t("geographicDistribution")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] rounded-md">
          {localStorage.getItem("mapbox_api_key") ? (
            <div ref={mapContainer} className="absolute inset-0 rounded-md overflow-hidden border border-border" />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted rounded-md border border-dashed">
              <div className="text-center space-y-2">
                <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">{t("mapboxTokenRequired")}</p>
                <Button asChild size="sm">
                  <Link to="/settings">{t("goToSettings")}</Link>
                </Button>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 right-4 z-10">
            <Button asChild size="sm" variant="secondary">
              <Link to="/tracking">{t("goToTracking")}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
