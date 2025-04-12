
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
  onWheel?: (e: React.WheelEvent) => void;
  dates: string[];
  toggleShow: (dateIndex: number) => void;
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
  onWheel,
  dates,
  toggleShow,
  visibleDates
}) => {
  const { t } = useI18n();
  
  if (events.length === 0) return null;
  
  const isSelected = selectedEventType === type || selectedEventType === 'all';
  
  // Group events by date
  const eventsByDate = groupEventsByDate(events, dates);
  
  // Get the appropriate icon based on event type
  const getEventIcon = () => {
    if (type === 'alert') {
      return AlertCircle;
    } else if (type === 'activity') {
      return Activity;
    }
    return Activity;
  };
  
  return (
    <div className="flex mb-4" onWheel={onWheel}>
      {/* Y-axis label */}
      <div className="w-24 flex items-center">
        <ColoredEvent 
          type={type} 
          icon={getEventIcon()} 
          size="sm"
        />
        <span className="ml-1 font-medium">{title}</span>
      </div>
      
      {/* Timeline events by date (X-axis) */}
      <div className="flex flex-1 space-x-2">
        {dates.map((date, dateIndex) => {
          if (!visibleDates[dateIndex]) return (
            <div key={`date-${dateIndex}-empty`} className="min-w-[100px] opacity-50"></div>
          );
          
          const dayEvents = eventsByDate[dateIndex];
          
          return (
            <div key={`date-${dateIndex}`} className="min-w-[100px] border-l pl-2">
              <div className="space-y-1">
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
                {dayEvents.length === 0 && (
                  <div className="text-xs text-muted-foreground py-1 px-2">
                    {t("noEventsAvailable")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
