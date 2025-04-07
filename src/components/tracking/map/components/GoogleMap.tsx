
import React, { useEffect, useRef } from 'react';
import { CardLocation } from "../types";

interface GoogleMapProps {
  setGoogleMapLoaded: (value: boolean) => void;
  cardLocations?: CardLocation[];
}

export function GoogleMap({ setGoogleMapLoaded, cardLocations }: GoogleMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;

    // Load Google Maps API script if not already loaded
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDw9haW4EjqqUMvmx7CUj1vGyQ1t120Lw&callback=initGoogleMap`;
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
          const locationsToUse = cardLocations || [];
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
    
    return () => {
      // Clean up if component unmounts
      window.initGoogleMap = undefined;
    };
  }, [setGoogleMapLoaded, cardLocations]);

  return (
    <div 
      ref={mapContainer} 
      className="map-container w-full h-[300px] rounded-md relative"
    />
  );
}
