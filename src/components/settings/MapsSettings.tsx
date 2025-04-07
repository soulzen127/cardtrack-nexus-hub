
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapUploader } from "./MapUploader";

export const MapsSettings = () => {
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("pk.eyJ1Ijoic291bHplbjEyNyIsImEiOiJjbGVicXJtdzAwc2lvM29udWt2NDBmam4zIn0.iUnrE5JYKhXFw45GAFvixA");
  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [requiresAdmin, setRequiresAdmin] = useState<boolean>(true);
  const [indoorMapsEnabled, setIndoorMapsEnabled] = useState<boolean>(true);
  
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
    
    toast.success("Map settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Map Provider Configuration</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="requiresAdmin" 
              checked={requiresAdmin} 
              onCheckedChange={(checked) => setRequiresAdmin(checked === true)}
            />
            <Label htmlFor="requiresAdmin" className="text-sm text-muted-foreground">
              Require administrator access
            </Label>
          </div>
        </div>
        <Separator />
        
        <Tabs defaultValue="outdoor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="outdoor">Outdoor Maps</TabsTrigger>
            <TabsTrigger value="indoor">Indoor Maps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outdoor" className="space-y-4">
            <div className="grid gap-4 py-4">
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
          </TabsContent>
          
          <TabsContent value="indoor" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="enableIndoorMaps" 
                checked={indoorMapsEnabled} 
                onCheckedChange={(checked) => setIndoorMapsEnabled(checked === true)}
              />
              <Label htmlFor="enableIndoorMaps">Enable indoor maps integration</Label>
            </div>
            
            {indoorMapsEnabled && (
              <div className="space-y-4">
                <div className="p-4 rounded-md border border-dashed">
                  <MapUploader />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="indoorMapType">Indoor Map Type</Label>
                  <Select defaultValue="2d">
                    <SelectTrigger id="indoorMapType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2d">2D Floor Plan</SelectItem>
                      <SelectItem value="3d">3D Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Indoor Maps</Label>
                  <div className="rounded-md border">
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Office Floor Plan</p>
                        <p className="text-sm text-muted-foreground">2D floor plan, last updated 2 days ago</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Warehouse 3D Model</p>
                        <p className="text-sm text-muted-foreground">3D model, last updated 1 week ago</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveApiKeys}>Save Indoor Map Settings</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Location Tracking Settings</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="updateFrequency">Location Update Frequency</Label>
              <Select defaultValue="5">
                <SelectTrigger id="updateFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every 1 minute</SelectItem>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accuracyThreshold">Location Accuracy Threshold</Label>
              <Select defaultValue="50">
                <SelectTrigger id="accuracyThreshold">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 meters</SelectItem>
                  <SelectItem value="25">25 meters</SelectItem>
                  <SelectItem value="50">50 meters</SelectItem>
                  <SelectItem value="100">100 meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="storeHistory" defaultChecked />
              <Label htmlFor="storeHistory">Store location history</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableClustering" defaultChecked />
              <Label htmlFor="enableClustering">Enable marker clustering</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="historyPeriod">Location History Retention</Label>
            <Select defaultValue="90">
              <SelectTrigger id="historyPeriod">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
