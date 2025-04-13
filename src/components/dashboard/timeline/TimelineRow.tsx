
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { Circle, ChevronDown, AlertCircle, Activity, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { groupEventsByDate } from "@/utils/eventUtils";
import { isDateToday, safeFormatDate } from "@/utils/dateUtils";
import { ColoredEvent } from "./ColoredEvent";
import { TimelineEventItem } from "./TimelineEventItem";

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
  visibleDates
}) => {
  const { t } = useI18n();
  
  if (events.length === 0) return null;
  
  const isSelected = selectedEventType === type || selectedEventType === 'all';
  
  // Group events by date
  const eventsByDate = groupEventsByDate(events, dates);
  
  return (
    <div className="flex h-full w-full absolute top-0 left-0">
      {dates.map((date, dateIndex) => {
        if (!visibleDates[dateIndex]) return (
          <div key={`date-${dateIndex}-empty`} className="w-48 min-w-[12rem] h-full border-r last:border-r-0 opacity-50"></div>
        );
        
        const dayEvents = eventsByDate[dateIndex];
        
        return (
          <div 
            key={`date-${dateIndex}`} 
            className="w-48 min-w-[12rem] h-full border-r last:border-r-0 relative p-2 overflow-y-auto"
          >
            {dayEvents.length > 0 ? (
              <div className="space-y-2">
                {dayEvents.map((event, eventIndex) => (
                  <TimelineEventItem
                    key={`${event.id}-${eventIndex}`}
                    event={event}
                    isSelected={isSelected && selectedEventIndex === eventIndex}
                    eventType={type}
                    onSelect={() => onEventSelect(event, eventIndex, type)}
                    zoomLevel={zoomLevel}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{t("noEventsAvailable")}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
