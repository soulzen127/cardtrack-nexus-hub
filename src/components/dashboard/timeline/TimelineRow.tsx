
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
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
  onWheel
}) => {
  if (events.length === 0) return null;
  
  return (
    <div className="flex items-center space-x-2">
      <div className="w-24 font-medium flex items-center">
        {icon}
        <span>{title}</span>
      </div>
      <div className="relative flex-1">
        <div 
          className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide"
          onWheel={onWheel}
        >
          {events.map((event, index) => (
            <TimelineEventItem 
              key={event.id}
              event={event}
              isSelected={selectedEventType === type && index === selectedEventIndex}
              eventType={type}
              onSelect={() => onEventSelect(event, index, type)}
              zoomLevel={zoomLevel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
