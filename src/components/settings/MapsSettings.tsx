
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const MapsSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Map Provider Configuration</h3>
        <Separator />
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
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" type="password" defaultValue="••••••••••••••••" />
            </div>
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
