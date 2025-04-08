
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Locate } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import mapboxgl from 'mapbox-gl';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  
  if (!map) return null;
  
  // Function to handle style selection and close dropdown
  const onStyleSelect = (style: string) => {
    handleStyleChange(style);
    setStyleDropdownOpen(false);
  };

  // Get the display name for current map style
  const getStyleDisplayName = (style: string) => {
    switch(style) {
      case 'streets-v12': return t("streets");
      case 'satellite-streets-v12': return t("satellite");
      case 'light-v11': return t("light");
      default: return t("streets");
    }
  };
  
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
      
      {/* Map Style Toggle - Replaced with Dropdown */}
      <div className="absolute top-3 right-12 z-10">
        <DropdownMenu open={styleDropdownOpen} onOpenChange={setStyleDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white shadow-md h-8"
            >
              {getStyleDisplayName(mapStyle)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white p-1 rounded-md shadow-md">
            <DropdownMenuItem 
              className={mapStyle === 'streets-v12' ? 'bg-primary/10' : ''}
              onClick={() => onStyleSelect('streets-v12')}
            >
              {t("streets")}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={mapStyle === 'satellite-streets-v12' ? 'bg-primary/10' : ''}
              onClick={() => onStyleSelect('satellite-streets-v12')}
            >
              {t("satellite")}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={mapStyle === 'light-v11' ? 'bg-primary/10' : ''}
              onClick={() => onStyleSelect('light-v11')}
            >
              {t("light")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
