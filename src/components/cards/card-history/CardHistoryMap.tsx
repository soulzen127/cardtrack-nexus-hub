
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CardHistoryItem } from "./types";

interface CardHistoryMapProps {
  selectedTab: string;
  open: boolean;
  cardHistory: CardHistoryItem[];
}

export function CardHistoryMap({ selectedTab, open, cardHistory }: CardHistoryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (selectedTab === "map" && open && mapContainer.current && !map.current) {
      const mapboxToken = localStorage.getItem("mapbox_api_key");
      
      if (!mapboxToken) return;
      
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [121.5654, 25.0330], // Default to Taipei
        zoom: 13,
      });
      
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add path and markers
      map.current.on('load', () => {
        // Add path line
        if (map.current) {
          const coordinates = cardHistory.map(h => h.coordinates);
          
          map.current.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              }
            }
          });
          
          map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#6366f1',
              'line-width': 4,
              'line-dasharray': [0, 2]
            }
          });
          
          // Add markers
          cardHistory.forEach((history, index) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundColor = index === 0 ? '#6366f1' : '#94a3b8';
            el.style.width = index === 0 ? '20px' : '12px';
            el.style.height = index === 0 ? '20px' : '12px';
            el.style.borderRadius = '50%';
            el.style.boxShadow = index === 0 
              ? '0 0 0 5px rgba(99, 102, 241, 0.3)' 
              : '0 0 0 3px rgba(148, 163, 184, 0.3)';
            
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <div class="font-bold">${history.date} ${history.time}</div>
                  <div>${history.event}</div>
                  <div>${history.details}</div>
                </div>
              `);
            
            new mapboxgl.Marker(el)
              .setLngLat(history.coordinates)
              .setPopup(popup)
              .addTo(map.current!);
          });
          
          // Fit bounds to see all markers
          const bounds = new mapboxgl.LngLatBounds();
          coordinates.forEach(coord => bounds.extend(coord as mapboxgl.LngLatLike));
          map.current.fitBounds(bounds, { padding: 50 });
        }
      });
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [open, selectedTab, cardHistory]);

  return <div ref={mapContainer} className="w-full h-[300px] rounded-md" />;
}
