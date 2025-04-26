
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapUploader } from "./MapUploader";
import { OutdoorMapSettings } from "./maps-settings/OutdoorMapSettings";
import { IndoorMapSettings } from "./maps-settings/IndoorMapSettings";
import { LocationTrackingSettings } from "./maps-settings/LocationTrackingSettings";
import { MapProviderHeader } from "./maps-settings/MapProviderHeader";
import { useI18n } from "@/hooks/use-i18n";

export const MapsSettings = () => {
  const { t } = useI18n();
  
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("");
  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [requiresAdmin, setRequiresAdmin] = useState<boolean>(true);
  const [indoorMapsEnabled, setIndoorMapsEnabled] = useState<boolean>(true);
  
  // Load stored API keys on component mount
  useEffect(() => {
    const storedMapboxKey = localStorage.getItem("mapbox_api_key") || "";
    const storedGoogleKey = localStorage.getItem("google_maps_api_key") || "";
    const storedRequiresAdmin = localStorage.getItem("map_requires_admin") === "true";
    const storedIndoorMapsEnabled = localStorage.getItem("indoor_maps_enabled") !== "false";
    
    setMapboxApiKey(storedMapboxKey);
    setGoogleApiKey(storedGoogleKey);
    setRequiresAdmin(storedRequiresAdmin);
    setIndoorMapsEnabled(storedIndoorMapsEnabled);
  }, []);
  
  const handleSaveApiKeys = () => {
    // Save API keys to localStorage for use in MapView
    if (mapboxApiKey) {
      localStorage.setItem("mapbox_api_key", mapboxApiKey);
    }
    
    if (googleApiKey) {
      localStorage.setItem("google_maps_api_key", googleApiKey);
    }
    
    // Save access control settings
    localStorage.setItem("map_requires_admin", requiresAdmin.toString());
    localStorage.setItem("indoor_maps_enabled", indoorMapsEnabled.toString());
    
    toast.success(t("mapSettingsSaved"));
  };

  return (
    <div className="space-y-6">
      <MapProviderHeader 
        requiresAdmin={requiresAdmin} 
        setRequiresAdmin={setRequiresAdmin} 
      />
      
      <Tabs defaultValue="outdoor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="outdoor">{t("outdoorMaps")}</TabsTrigger>
          <TabsTrigger value="indoor">{t("indoorMaps")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="outdoor" className="space-y-4">
          <OutdoorMapSettings 
            mapboxApiKey={mapboxApiKey}
            setMapboxApiKey={setMapboxApiKey}
            googleApiKey={googleApiKey}
            setGoogleApiKey={setGoogleApiKey}
            handleSaveApiKeys={handleSaveApiKeys}
          />
        </TabsContent>
        
        <TabsContent value="indoor" className="space-y-4">
          <IndoorMapSettings 
            indoorMapsEnabled={indoorMapsEnabled}
            setIndoorMapsEnabled={setIndoorMapsEnabled}
            handleSaveApiKeys={handleSaveApiKeys}
          />
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <LocationTrackingSettings />
    </div>
  );
};
