
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapUploader } from "../MapUploader";
import { useI18n } from "@/hooks/use-i18n";

interface IndoorMapSettingsProps {
  indoorMapsEnabled: boolean;
  setIndoorMapsEnabled: (enabled: boolean) => void;
  handleSaveApiKeys: () => void;
}

export function IndoorMapSettings({
  indoorMapsEnabled,
  setIndoorMapsEnabled,
  handleSaveApiKeys
}: IndoorMapSettingsProps) {
  const { t } = useI18n();
  
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="enableIndoorMaps" 
          checked={indoorMapsEnabled} 
          onCheckedChange={(checked) => setIndoorMapsEnabled(checked === true)}
        />
        <Label htmlFor="enableIndoorMaps">{t("enableIndoorMaps")}</Label>
      </div>
      
      {indoorMapsEnabled && (
        <div className="space-y-4">
          <div className="p-4 rounded-md border border-dashed">
            <MapUploader />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="indoorMapType">{t("indoorMapType")}</Label>
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
    </div>
  );
}
