
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/hooks/use-i18n";

interface MapProviderSelectorProps {
  mapProvider: 'mapbox' | 'google';
  handleMapProviderChange: (provider: 'mapbox' | 'google') => void;
}

export function MapProviderSelector({
  mapProvider,
  handleMapProviderChange
}: MapProviderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  
  const handleProviderChange = (value: string) => {
    handleMapProviderChange(value as 'mapbox' | 'google');
    setIsOpen(false); // Hide the selector after selection
  };
  
  return (
    <div className="absolute top-3 left-3 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-md shadow-md text-sm font-medium flex items-center"
      >
        {t("mapProvider")}: {mapProvider === 'mapbox' ? 'Mapbox' : 'Google'}
      </button>
      
      {isOpen && (
        <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <RadioGroup 
            value={mapProvider}
            onValueChange={handleProviderChange}
            className="flex flex-col space-y-2"
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
      )}
    </div>
  );
}
