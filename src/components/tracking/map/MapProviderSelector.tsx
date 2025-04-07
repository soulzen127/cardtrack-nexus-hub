
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MapProviderSelectorProps {
  mapProvider: 'mapbox' | 'google';
  handleMapProviderChange: (provider: 'mapbox' | 'google') => void;
}

export function MapProviderSelector({
  mapProvider,
  handleMapProviderChange
}: MapProviderSelectorProps) {
  return (
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
  );
}
