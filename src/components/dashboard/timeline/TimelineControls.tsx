
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Activity, ZoomIn, ZoomOut } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface TimelineControlsProps {
  selectedEventType: 'all' | 'alert' | 'activity';
  onEventTypeChange: (type: 'all' | 'alert' | 'activity') => void;
  isMobileDevice: boolean;
  onZoomAdjust: (direction: 'in' | 'out') => void;
  zoomLevel: number;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  selectedEventType,
  onEventTypeChange,
  isMobileDevice,
  onZoomAdjust,
  zoomLevel
}) => {
  const { t } = useI18n();
  
  return (
    <div className="flex space-x-2">
      <Button 
        variant={selectedEventType === 'all' ? "default" : "outline"} 
        size="sm" 
        onClick={() => onEventTypeChange('all')}
      >
        {t("all")}
      </Button>
      <Button 
        variant={selectedEventType === 'alert' ? "default" : "outline"} 
        size="sm" 
        onClick={() => onEventTypeChange('alert')}
        className={selectedEventType === 'alert' ? "bg-red-500 hover:bg-red-600" : ""}
      >
        <AlertCircle className="h-4 w-4 mr-1" />
        {t("alerts")}
      </Button>
      <Button 
        variant={selectedEventType === 'activity' ? "default" : "outline"} 
        size="sm" 
        onClick={() => onEventTypeChange('activity')}
        className={selectedEventType === 'activity' ? "bg-green-500 hover:bg-green-600" : ""}
      >
        <Activity className="h-4 w-4 mr-1" />
        {t("activities")}
      </Button>
      {isMobileDevice && (
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onZoomAdjust('out')}
            disabled={zoomLevel <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onZoomAdjust('in')}
            disabled={zoomLevel >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
