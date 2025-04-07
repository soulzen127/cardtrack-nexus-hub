
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OutdoorMapSettingsProps {
  mapboxApiKey: string;
  setMapboxApiKey: (key: string) => void;
  googleApiKey: string;
  setGoogleApiKey: (key: string) => void;
  handleSaveApiKeys: () => void;
}

export function OutdoorMapSettings({
  mapboxApiKey,
  setMapboxApiKey,
  googleApiKey,
  setGoogleApiKey,
  handleSaveApiKeys
}: OutdoorMapSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mapProvider">Map Provider</Label>
          <Select defaultValue="mapbox">
            <SelectTrigger id="mapProvider">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mapbox">Mapbox</SelectItem>
              <SelectItem value="google">Google Maps</SelectItem>
              <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="apiKey">Mapbox API Key</Label>
          <Input 
            id="apiKey" 
            type="password" 
            placeholder="Enter Mapbox API key"
            value={mapboxApiKey}
            onChange={(e) => setMapboxApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">Obtain a Mapbox API key from <a href="https://www.mapbox.com/account/" target="_blank" rel="noopener" className="text-primary">Mapbox</a></p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="googleApiKey">Google Maps API Key</Label>
        <Input 
          id="googleApiKey" 
          type="password" 
          placeholder="Enter Google Maps API key"
          value={googleApiKey}
          onChange={(e) => setGoogleApiKey(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">Obtain a Google Maps API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener" className="text-primary">Google Cloud Console</a></p>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveApiKeys}>Save API Keys</Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="defaultView">Default Map View</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="defaultLat">Default Latitude</Label>
            <Input id="defaultLat" defaultValue="25.0330" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultLong">Default Longitude</Label>
            <Input id="defaultLong" defaultValue="121.5654" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="defaultZoom">Default Zoom Level</Label>
        <Select defaultValue="10">
          <SelectTrigger id="defaultZoom">
            <SelectValue placeholder="Select zoom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 - Country</SelectItem>
            <SelectItem value="8">8 - City</SelectItem>
            <SelectItem value="10">10 - District</SelectItem>
            <SelectItem value="13">13 - Neighborhood</SelectItem>
            <SelectItem value="15">15 - Street</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
