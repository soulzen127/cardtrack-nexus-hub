import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Layers, MapPin, Map as MapIcon } from "lucide-react";
import { MapView } from "@/components/tracking/MapView";
import { MapControls } from "@/components/tracking/MapControls";
import { useI18n } from "@/hooks/use-i18n";
import { CardLocation } from "./map/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MapSectionProps {
  isRealtime: boolean;
  setIsRealtime: (value: boolean) => void;
  timeSliderValue: number[];
  setTimeSliderValue: (value: number[]) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  cardLocations?: CardLocation[];
  center?: [number, number] | null;
}

export function MapSection({
  isRealtime,
  setIsRealtime,
  timeSliderValue,
  setTimeSliderValue,
  selectedDate,
  setSelectedDate,
  cardLocations,
  center,
}: MapSectionProps) {
  const { t } = useI18n();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{t("geographicLocation")}</CardTitle>
        <CardDescription>{t("realtimeGeographicVisualization")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 p-0">
        {/* External Map Controls - Before the map */}
        <div className="flex justify-between items-center px-4 pt-4">
          <MapActions />
        </div>
        
        {/* Map Container - Full width and increased height */}
        <div className="h-[600px] lg:h-[700px] relative">
          <MapView 
            isRealtime={isRealtime}
            timeSliderValue={timeSliderValue}
            selectedDate={selectedDate}
            cardLocations={cardLocations}
            center={center}
          />
        </div>
        
        {/* Time Controls - After the map */}
        <div className="px-4 pb-4">
          <MapControls 
            isRealtime={isRealtime}
            setIsRealtime={setIsRealtime}
            timeSliderValue={timeSliderValue}
            setTimeSliderValue={setTimeSliderValue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function MapActions() {
  const { t } = useI18n();
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isLayersDialogOpen, setIsLayersDialogOpen] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => setIsFilterDialogOpen(true)}>
        <Filter className="h-4 w-4 mr-2" />
        {t("filter")}
      </Button>
      <Button variant="outline" size="sm" onClick={() => setIsLayersDialogOpen(true)}>
        <Layers className="h-4 w-4 mr-2" />
        {t("mapLayers")}
      </Button>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("filterTrackingData")}</DialogTitle>
            <DialogDescription>
              {t("narrowDownResults")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>{t("cardTypes")}</Label>
              <div className="flex items-start space-x-2">
                <Checkbox id="employee-cards" defaultChecked />
                <div className="grid gap-1.5">
                  <Label htmlFor="employee-cards" className="font-normal">
                    {t("employeeCards")}
                  </Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="visitor-cards" defaultChecked />
                <div className="grid gap-1.5">
                  <Label htmlFor="visitor-cards" className="font-normal">
                    {t("visitorCards")}
                  </Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="asset-cards" defaultChecked />
                <div className="grid gap-1.5">
                  <Label htmlFor="asset-cards" className="font-normal">
                    {t("assetTrackingCards")}
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{t("locations")}</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectLocations")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allLocations")}</SelectItem>
                  <SelectItem value="main-building">{t("mainBuilding")}</SelectItem>
                  <SelectItem value="warehouse">{t("warehouse")}</SelectItem>
                  <SelectItem value="parking">{t("parkingArea")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>{t("movementStatus")}</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="moving" defaultChecked />
                  <Label htmlFor="moving" className="font-normal">
                    {t("moving")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stationary" defaultChecked />
                  <Label htmlFor="stationary" className="font-normal">
                    {t("stationary")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="idle" defaultChecked />
                  <Label htmlFor="idle" className="font-normal">
                    {t("idle")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="offline" defaultChecked />
                  <Label htmlFor="offline" className="font-normal">
                    {t("offline")}
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => setIsFilterDialogOpen(false)}>
              {t("applyFilters")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Map Layers Dialog */}
      <Dialog open={isLayersDialogOpen} onOpenChange={setIsLayersDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("mapLayers")}</DialogTitle>
            <DialogDescription>
              {t("customizeMapDisplay")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="layer-cards" defaultChecked />
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="layer-cards" className="font-medium">
                      {t("cardsLayer")}
                    </Label>
                    <MapPin className="h-4 w-4 ml-2 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("showCardsOnMap")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="layer-geofences" defaultChecked />
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="layer-geofences" className="font-medium">
                      {t("geofencesLayer")}
                    </Label>
                    <MapIcon className="h-4 w-4 ml-2 text-blue-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("showGeofencedAreas")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="layer-heatmap" />
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="layer-heatmap" className="font-medium">
                      {t("heatmapLayer")}
                    </Label>
                    <div className="ml-2 h-4 w-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("showDensityHeatmap")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="layer-buildings" defaultChecked />
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="layer-buildings" className="font-medium">
                      {t("buildingsLayer")}
                    </Label>
                    <Layers className="h-4 w-4 ml-2 text-gray-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("show3DBuildings")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{t("mapStyle")}</Label>
              <Select defaultValue="streets">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectMapStyle")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="streets">{t("streetsView")}</SelectItem>
                  <SelectItem value="satellite">{t("satelliteView")}</SelectItem>
                  <SelectItem value="light">{t("lightTheme")}</SelectItem>
                  <SelectItem value="dark">{t("darkTheme")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsLayersDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => setIsLayersDialogOpen(false)}>
              {t("applyChanges")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
