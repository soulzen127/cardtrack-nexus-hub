
import React from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Locate } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import mapboxgl from 'mapbox-gl';

interface MapboxControlsProps {
  map: mapboxgl.Map | null;
  mapStyle: string;
  handleZoom: (direction: 'in' | 'out') => void;
  handleRecenter: () => void;
  handleStyleChange: (style: string) => void;
}

export function MapboxControls({
  map,
  mapStyle,
  handleZoom,
  handleRecenter,
  handleStyleChange
}: MapboxControlsProps) {
  const { t } = useI18n();
  
  if (!map) return null;
  
  return (
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
  );
}
