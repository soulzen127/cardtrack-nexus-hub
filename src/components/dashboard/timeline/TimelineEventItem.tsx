
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { AlertCircle, Activity } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TimelineEventItemProps {
  event: TimelineEvent;
  isSelected: boolean;
  eventType: 'alert' | 'activity';
  onSelect: (event: TimelineEvent) => void;
  zoomLevel: number;
}

export const TimelineEventItem: React.FC<TimelineEventItemProps> = ({
  event,
  isSelected,
  eventType,
  onSelect,
  zoomLevel
}) => {
  // Calculate timeline item width based on zoom level
  const getTimelineItemStyle = () => {
    const baseWidth = 140; // Base width in pixels
    return {
      width: `${baseWidth * zoomLevel}px`,
      minWidth: `${baseWidth * zoomLevel}px`,
      transition: 'width 0.2s ease-out'
    };
  };

  const isAlert = event.type === 'alert';
  const borderColorClass = isSelected ? 
    (isAlert ? 'border-red-500 bg-red-100/20' : 'border-green-500 bg-green-100/20') : 
    'border-border';

  return (
    <div 
      className={`timeline-event flex-shrink-0 cursor-pointer p-2 rounded-md border ${borderColorClass}`}
      onClick={() => onSelect(event)}
      style={getTimelineItemStyle()}
    >
      <div className="flex items-start gap-2">
        <div className={`p-1 rounded-full ${
          isAlert ? 
            (event.priority === "high" ? "bg-red-100" :
            event.priority === "medium" ? "bg-amber-100" : "bg-blue-100") :
            "bg-green-100"
        }`}>
          {isAlert ? (
            <AlertCircle className={`h-3 w-3 ${
              event.priority === "high" ? "text-red-500" :
              event.priority === "medium" ? "text-amber-500" : "text-blue-500"
            }`} />
          ) : (
            <Activity className="h-3 w-3 text-green-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{event.title}</p>
          <p className="text-xs text-muted-foreground">
            {format(parseISO(event.timestamp), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};
