
import React from 'react';
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TokenInputScreenProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  mapProvider: 'mapbox' | 'google' | 'cesium';
  handleMapProviderChange: (provider: 'mapbox' | 'google' | 'cesium') => void;
  initializeMapbox: () => void;
}

export function TokenInputScreen({
  mapboxToken,
  setMapboxToken,
  mapProvider,
  handleMapProviderChange,
  initializeMapbox
}: TokenInputScreenProps) {
  const { t } = useI18n();
  
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
              onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google' | 'cesium')}
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cesium" id="cesium" />
                <Label htmlFor="cesium">Cesium</Label>
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

interface GoogleMapSetupScreenProps {
  mapProvider: 'mapbox' | 'google' | 'cesium';
  handleMapProviderChange: (provider: 'mapbox' | 'google' | 'cesium') => void;
  initializeGoogleMap: () => void;
}

export function GoogleMapSetupScreen({
  mapProvider,
  handleMapProviderChange,
  initializeGoogleMap
}: GoogleMapSetupScreenProps) {
  const { t } = useI18n();
  
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
              onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google' | 'cesium')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mapbox" id="mapbox" />
                <Label htmlFor="mapbox">Mapbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="google" id="google" />
                <Label htmlFor="google">Google</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cesium" id="cesium" />
                <Label htmlFor="cesium">Cesium</Label>
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

interface CesiumMapSetupScreenProps {
  mapProvider: 'mapbox' | 'google' | 'cesium';
  handleMapProviderChange: (provider: 'mapbox' | 'google' | 'cesium') => void;
  initializeCesiumMap: () => void;
}

export function CesiumMapSetupScreen({
  mapProvider,
  handleMapProviderChange,
  initializeCesiumMap
}: CesiumMapSetupScreenProps) {
  const { t } = useI18n();
  
  return (
    <div className="map-container bg-muted flex flex-col items-center justify-center p-8 rounded-md min-h-[300px]">
      <div className="text-center space-y-3 max-w-md mx-auto">
        <h3 className="text-lg font-medium">{t("cesiumSetup")}</h3>
        <p className="text-muted-foreground">{t("cesiumExplanation")}</p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">{t("mapProvider")}</p>
            <RadioGroup 
              value={mapProvider}
              onValueChange={(value) => handleMapProviderChange(value as 'mapbox' | 'google' | 'cesium')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mapbox" id="mapbox" />
                <Label htmlFor="mapbox">Mapbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="google" id="google" />
                <Label htmlFor="google">Google</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cesium" id="cesium" />
                <Label htmlFor="cesium">Cesium</Label>
              </div>
            </RadioGroup>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {t("cesiumIonTokenNeeded")} <a href="https://cesium.com/ion/" target="_blank" rel="noopener" className="text-primary">Cesium Ion</a>
          </p>
          
          <Button onClick={initializeCesiumMap}>
            {t("initializeCesiumMap")}
          </Button>
        </div>
      </div>
    </div>
  );
}
