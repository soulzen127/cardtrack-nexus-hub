
import React from "react";
import { useI18n } from "@/hooks/use-i18n";
import { AlertCircle, Activity } from "lucide-react";
import { TimelineEvent } from "../../../tracking/map/mockData";
import { TimelineRow } from "../TimelineRow";
import { TimelineHeader } from "./TimelineHeader";

interface TimelineGridProps {
  alertEvents: TimelineEvent[];
  activityEvents: TimelineEvent[];
  selectedEventType: 'all' | 'alert' | 'activity';
  selectedEventIndex: number;
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  zoomLevel: number;
  dates: string[];
  visibleDates: boolean[];
  toggleShow: (dateIndex: number) => void;
  cellWidth: number;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  alertEvents,
  activityEvents,
  selectedEventType,
  selectedEventIndex,
  onEventSelect,
  zoomLevel,
  dates,
  visibleDates,
  toggleShow,
  cellWidth
}) => {
  const { t } = useI18n();
  
  return (
    <div className="flex-1 relative">
      {/* Date headers */}
      <TimelineHeader 
        dates={dates}
        visibleDates={visibleDates}
        toggleShow={toggleShow}
        cellWidth={cellWidth}
      />
      
      {/* Timeline content grid */}
      <div className="relative">
        {/* Alert row */}
        {(selectedEventType === 'all' || selectedEventType === 'alert') && (
          <div className="h-[140px] border-b relative">
            <TimelineRow
              title={t("alerts")}
              icon={<AlertCircle className="h-4 w-4 text-red-500" />}
              events={alertEvents}
              selectedEventType={selectedEventType}
              selectedEventIndex={selectedEventIndex}
              onEventSelect={onEventSelect}
              type="alert"
              zoomLevel={zoomLevel}
              dates={dates}
              visibleDates={visibleDates}
              cellWidth={cellWidth}
            />
          </div>
        )}
        
        {/* Activity row */}
        {(selectedEventType === 'all' || selectedEventType === 'activity') && (
          <div className="h-[140px] relative">
            <TimelineRow
              title={t("activities")}
              icon={<Activity className="h-4 w-4 text-green-500" />}
              events={activityEvents}
              selectedEventType={selectedEventType}
              selectedEventIndex={selectedEventIndex}
              onEventSelect={onEventSelect}
              type="activity"
              zoomLevel={zoomLevel}
              dates={dates}
              visibleDates={visibleDates}
              cellWidth={cellWidth}
            />
          </div>
        )}
      </div>
    </div>
  );
};
