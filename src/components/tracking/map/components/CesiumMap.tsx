
import React, { useEffect, useState } from 'react';
import { CardLocation } from '../types';
import { useI18n } from '@/hooks/use-i18n';

interface CesiumMapProps {
  setCesiumMapLoaded: (loaded: boolean) => void;
  cardLocations?: CardLocation[];
  center?: [number, number] | null;
}

export function CesiumMap({ setCesiumMapLoaded, cardLocations, center }: CesiumMapProps) {
  const { t } = useI18n();
  const [cesiumToken, setCesiumToken] = useState<string>(() => {
    return localStorage.getItem('cesium_ion_token') || '';
  });
  
  // In a real implementation, we would load Cesium here
  useEffect(() => {
    if (!cesiumToken) {
      console.error("No Cesium Ion token found");
      return;
    }
    
    // Mock loading the Cesium map for now
    const timeoutId = setTimeout(() => {
      setCesiumMapLoaded(true);
      console.log("Cesium map loaded with token:", cesiumToken.substring(0, 10) + '...');
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [cesiumToken, setCesiumMapLoaded]);

  // For now, render a placeholder with instructions
  return (
    <div className="w-full h-[500px] rounded-md relative bg-gray-100 flex items-center justify-center">
      {!cesiumToken ? (
        <div className="text-center p-8">
          <h3 className="text-lg font-medium mb-2">{t("cesiumTokenRequired")}</h3>
          <p className="text-muted-foreground mb-4">{t("enterCesiumToken")}:</p>
          <div className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder={t("enterCesiumIonToken")}
              onChange={(e) => setCesiumToken(e.target.value)}
              value={cesiumToken}
            />
            <p className="text-xs text-muted-foreground">
              {t("obtainCesiumTokenText")} <a href="https://cesium.com/ion/" target="_blank" rel="noopener" className="text-primary">cesium.com</a>
            </p>
            {cesiumToken && (
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => {
                  localStorage.setItem('cesium_ion_token', cesiumToken);
                  setCesiumMapLoaded(true);
                }}
              >
                {t("initializeCesiumMap")}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-xl font-semibold">Cesium Map</span>
          <p className="text-sm text-muted-foreground mt-2">{t("cesiumMapLoadingOrNotSupported")}</p>
        </div>
      )}
    </div>
  );
}
