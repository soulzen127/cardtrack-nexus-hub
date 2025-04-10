
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Layers } from "lucide-react";
import { MapView } from "@/components/tracking/MapView";
import { MapControls } from "@/components/tracking/MapControls";
import { useI18n } from "@/hooks/use-i18n";

interface MapSectionProps {
  isRealtime: boolean;
  setIsRealtime: (value: boolean) => void;
  timeSliderValue: number[];
  setTimeSliderValue: (value: number[]) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

export function MapSection({
  isRealtime,
  setIsRealtime,
  timeSliderValue,
  setTimeSliderValue,
  selectedDate,
  setSelectedDate,
}: MapSectionProps) {
  const { t } = useI18n();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{t("mapView")}</CardTitle>
        <CardDescription>{t("realtimeGeographicVisualization")}</CardDescription>
      </CardHeader>
      <CardContent>
        <MapView 
          isRealtime={isRealtime}
          timeSliderValue={timeSliderValue}
          selectedDate={selectedDate}
        />
        
        <MapControls 
          isRealtime={isRealtime}
          setIsRealtime={setIsRealtime}
          timeSliderValue={timeSliderValue}
          setTimeSliderValue={setTimeSliderValue}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </CardContent>
    </Card>
  );
}

export function MapActions() {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        {t("filter")}
      </Button>
      <Button variant="outline" size="sm">
        <Layers className="h-4 w-4 mr-2" />
        {t("mapLayers")}
      </Button>
    </div>
  );
}
