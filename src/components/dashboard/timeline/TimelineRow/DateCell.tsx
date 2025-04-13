
import React from "react";
import { TimelineEvent } from "../../../tracking/map/mockData";
import { useI18n } from "@/hooks/use-i18n";
import { TimelineEventItem } from "../TimelineEventItem";

interface DateCellProps {
  dateIndex: number;
  cellWidth: number;
  dayEvents: TimelineEvent[];
  isSelected: boolean;
  selectedEventIndex: number;
  eventType: 'alert' | 'activity';
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  zoomLevel: number;
}

export const DateCell: React.FC<DateCellProps> = ({
  dateIndex,
  cellWidth,
  dayEvents,
  isSelected,
  selectedEventIndex,
  eventType,
  onEventSelect,
  zoomLevel
}) => {
  const { t } = useI18n();
  
  return (
    <div 
      key={`date-${dateIndex}`} 
      style={{ width: `${cellWidth}rem`, minWidth: `${cellWidth}rem` }}
      className="h-full border-r last:border-r-0 relative p-2 overflow-y-auto"
    >
      {dayEvents.length > 0 ? (
        <div className="space-y-2">
          {dayEvents.map((event, eventIndex) => (
            <TimelineEventItem
              key={`${event.id}-${eventIndex}`}
              event={event}
              isSelected={isSelected && selectedEventIndex === eventIndex}
              eventType={eventType}
              onSelect={() => onEventSelect(event, eventIndex, eventType)}
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
};
