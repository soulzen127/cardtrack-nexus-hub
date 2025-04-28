
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MapView } from "@/components/tracking/MapView";
import { MapControls } from "@/components/tracking/MapControls";
import { useI18n } from "@/hooks/use-i18n";
import { CardLocation } from "./map/types";
import { MapActions } from "./map/MapActions";
import { MapLayerSelector } from "./map/MapLayerSelector";

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
  const [currentMapLayer, setCurrentMapLayer] = useState<'3dgis' | 'venue'>('3dgis');

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{t("locationInfoPlatform")}</CardTitle>
        <CardDescription>{t("realtimeGeographicVisualization")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 p-0">
        {/* Layer Selector Tabs */}
        <div className="px-4 pt-4">
          <MapLayerSelector 
            currentMapLayer={currentMapLayer} 
            onLayerChange={setCurrentMapLayer}
          />
        </div>

        {/* External Map Controls - Before the map */}
        <div className="flex justify-between items-center px-4">
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
            currentMapLayer={currentMapLayer}
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
