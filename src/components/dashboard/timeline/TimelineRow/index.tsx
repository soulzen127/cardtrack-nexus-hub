
import React from "react";
import { TimelineEvent } from "../../../tracking/map/mockData";
import { Circle, ChevronDown, AlertCircle, Activity, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { groupEventsByDate } from "@/utils/eventUtils";
import { isDateToday, safeFormatDate } from "@/utils/dateUtils";
import { ColoredEvent } from "../ColoredEvent";
import { DateCell } from "./DateCell";
import { EmptyDateCell } from "./EmptyDateCell";

interface TimelineRowProps {
  title: string;
  icon: React.ReactNode;
  events: TimelineEvent[];
  selectedEventType: 'all' | 'alert' | 'activity';
  selectedEventIndex: number;
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  type: 'alert' | 'activity';
  zoomLevel: number;
  dates: string[];
  visibleDates: boolean[];
  cellWidth: number;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  title,
  icon,
  events,
  selectedEventType,
  selectedEventIndex,
  onEventSelect,
  type,
  zoomLevel,
  dates,
  visibleDates,
  cellWidth
}) => {
  const { t } = useI18n();
  
  if (events.length === 0) return null;
  
  const isSelected = selectedEventType === type || selectedEventType === 'all';
  
  // Group events by date
  const eventsByDate = groupEventsByDate(events, dates);
  
  return (
    <div className="flex h-full w-full absolute top-0 left-0">
      {dates.map((date, dateIndex) => {
        if (!visibleDates[dateIndex]) {
          return (
            <EmptyDateCell 
              key={`date-${dateIndex}-empty`}
              dateIndex={dateIndex}
              cellWidth={cellWidth}
            />
          );
        }
        
        const dayEvents = eventsByDate[dateIndex];
        
        return (
          <DateCell
            key={`date-${dateIndex}`}
            dateIndex={dateIndex}
            cellWidth={cellWidth}
            dayEvents={dayEvents}
            isSelected={isSelected}
            selectedEventIndex={selectedEventIndex}
            eventType={type}
            onEventSelect={onEventSelect}
            zoomLevel={zoomLevel}
          />
        );
      })}
    </div>
  );
};
