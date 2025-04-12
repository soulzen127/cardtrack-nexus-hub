
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelineRow } from "./TimelineRow";
import { TimelineEvent } from "../../tracking/map/mockData";
import { AlertCircle, Activity } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface TimelineContentProps {
  alertEvents: TimelineEvent[];
  activityEvents: TimelineEvent[];
  selectedEventType: 'all' | 'alert' | 'activity';
  selectedEventIndex: number;
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  zoomLevel: number;
  onWheel?: (e: React.WheelEvent) => void;
  dates: string[];
  toggleShow: (dateIndex: number) => void;
  visibleDates: boolean[];
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  alertEvents,
  activityEvents,
  selectedEventType,
  selectedEventIndex,
  onEventSelect,
  zoomLevel,
  onWheel,
  dates,
  toggleShow,
  visibleDates
}) => {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="h-auto">
        <div className="flex space-x-2 mb-2">
          {/* Date labels on X-axis */}
          <div className="w-24"></div> {/* Space for Y-axis labels */}
          {dates.map((date, index) => (
            <div 
              key={`date-${index}`}
              className={`min-w-[100px] text-center font-medium ${!visibleDates[index] ? 'opacity-50' : ''}`}
            >
              {date}
              <button 
                className="flex items-center justify-center text-xs text-muted-foreground ml-1"
                onClick={() => toggleShow(index)}
              >
                {t("show")}
              </button>
            </div>
          ))}
        </div>
        
        {/* Alert Events Row */}
        {(selectedEventType === 'all' || selectedEventType === 'alert') && (
          <TimelineRow
            title={t("alerts")}
            icon={<AlertCircle className="h-4 w-4 text-red-500" />}
            events={alertEvents}
            selectedEventType={selectedEventType}
            selectedEventIndex={selectedEventIndex}
            onEventSelect={onEventSelect}
            type="alert"
            zoomLevel={zoomLevel}
            onWheel={onWheel}
            dates={dates}
            toggleShow={toggleShow}
            visibleDates={visibleDates}
          />
        )}
        
        {/* Activity Events Row */}
        {(selectedEventType === 'all' || selectedEventType === 'activity') && (
          <TimelineRow
            title={t("activities")}
            icon={<Activity className="h-4 w-4 text-green-500" />}
            events={activityEvents}
            selectedEventType={selectedEventType}
            selectedEventIndex={selectedEventIndex}
            onEventSelect={onEventSelect}
            type="activity"
            zoomLevel={zoomLevel}
            onWheel={onWheel}
            dates={dates}
            toggleShow={toggleShow}
            visibleDates={visibleDates}
          />
        )}
      </ScrollArea>
    </div>
  );
};
