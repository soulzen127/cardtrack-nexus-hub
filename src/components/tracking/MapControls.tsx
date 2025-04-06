
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, PauseCircle, Clock } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface MapControlsProps {
  isRealtime: boolean;
  setIsRealtime: (value: boolean) => void;
  timeSliderValue: number[];
  setTimeSliderValue: (value: number[]) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

export function MapControls({
  isRealtime,
  setIsRealtime,
  timeSliderValue,
  setTimeSliderValue,
  selectedDate,
  setSelectedDate,
}: MapControlsProps) {
  const { t } = useI18n();

  return (
    <>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant={isRealtime ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsRealtime(true)}
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            {t("realtime")}
          </Button>
          <Button 
            variant={!isRealtime ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsRealtime(false)}
          >
            <Clock className="h-4 w-4 mr-2" />
            {t("historical")}
          </Button>
        </div>
        
        {isRealtime ? (
          <div className="flex items-center gap-2">
            <span className="text-sm">{t("autoRefresh")}:</span>
            <Select defaultValue="30s">
              <SelectTrigger className="w-24 h-8">
                <SelectValue placeholder={t("refresh")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">10s</SelectItem>
                <SelectItem value="30s">30s</SelectItem>
                <SelectItem value="1m">1m</SelectItem>
                <SelectItem value="5m">5m</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm whitespace-nowrap">{t("selectDate")}:</span>
            <Input
              type="date"
              className="h-8 w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        )}
      </div>
      
      {!isRealtime && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">{t("time")}:</span>
            <span className="text-sm">12:30 PM</span>
          </div>
          <Slider
            value={timeSliderValue}
            max={100}
            step={1}
            onValueChange={setTimeSliderValue}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">00:00</span>
            <span className="text-xs text-muted-foreground">23:59</span>
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            <Button size="sm" variant="outline">
              <PauseCircle className="h-4 w-4 mr-2" />
              {t("pause")}
            </Button>
            <Button size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              {t("play")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
