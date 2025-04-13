
import React, { useEffect, useRef, useState } from 'react';
import { CardLocation } from '../types';
import { useI18n } from '@/hooks/use-i18n';

interface GoogleMapProps {
  setGoogleMapLoaded: (loaded: boolean) => void;
  cardLocations?: CardLocation[];
  center?: [number, number] | null;
}

export function GoogleMap({ setGoogleMapLoaded, cardLocations, center }: GoogleMapProps) {
  const { t } = useI18n();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const markers = useRef<any[]>([]);

  const [googleMapKey, setGoogleMapKey] = useState<string>(() => {
    return localStorage.getItem('google_maps_api_key') || '';
  });

  useEffect(() => {
    if (!mapContainer.current || !googleMapKey) return;

    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=places`;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Google Maps
      map.current = new window.google.maps.Map(mapContainer.current!, {
        center: { lat: 23.9739, lng: 120.9738 }, // Taiwan center
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      // Add markers for each location
      if (cardLocations) {
        // Clear existing markers
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        // Create new markers
        cardLocations.forEach(location => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.coordinates[1], lng: location.coordinates[0] },
            map: map.current,
            title: location.name || 'Card Location',
          });

          // Create info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h3>${location.name || 'Card Location'}</h3>
                <p>${location.description || 'No description available'}</p>
              </div>
            `,
          });

          // Add click event to marker
          marker.addListener('click', () => {
            infoWindow.open(map.current, marker);
          });

          markers.current.push(marker);
        });
      }

      setGoogleMapLoaded(true);
    };

    script.onerror = () => {
      console.error("Google Maps failed to load");
      setGoogleMapLoaded(false);
    };

    return () => {
      document.head.removeChild(script);
      map.current = null;
    };
  }, [setGoogleMapLoaded, cardLocations, googleMapKey]);

  // Handle center changes
  useEffect(() => {
    if (center && map.current) {
      map.current.panTo({ lat: center[1], lng: center[0] });
      map.current.setZoom(15);
    }
  }, [center]);

  return (
    <div className="w-full h-[300px] rounded-md relative">
      {googleMapKey ? (
        <div ref={mapContainer} className="w-full h-full rounded-md" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-md border border-dashed">
          <p className="text-muted-foreground">{t("googleMapsApiKeyNeeded")}</p>
        </div>
      )}
    </div>
  );
}
