
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { AlertCircle, Activity, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { safeFormatDate } from "@/utils/dateUtils";
import { ColoredEvent, EventType } from "./ColoredEvent";

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
  const { t } = useI18n();
  
  const isAlert = event.type === 'alert';
  const borderColorClass = isSelected ? 
    (isAlert ? 'border-red-500 bg-red-100/20' : 'border-green-500 bg-green-100/20') : 
    'border-border';

  // Determine icon based on event type and priority
  const getEventIcon = () => {
    if (event.type === 'alert') {
      return AlertCircle;
    } else if (event.type === 'activity') {
      return Activity;
    } else if (event.type === 'info') {
      return Info;
    } else if (event.type === 'warning') {
      return AlertTriangle;
    } else if (event.type === 'success') {
      return CheckCircle;
    } else if (event.type === 'error') {
      return XCircle;
    }
    return Activity;
  };

  // Position the event based on its time
  const getPositionStyle = () => {
    try {
      const timeString = safeFormatDate(event.timestamp, 'HH:mm');
      const [hours, minutes] = timeString.split(':').map(Number);
      
      // Calculate position as percentage of the day (24 hours)
      const timePercentage = (hours * 60 + minutes) / (24 * 60) * 100;
      
      return {
        position: 'relative' as const
      };
    } catch (error) {
      console.error("Error calculating position:", error);
      return {
        position: 'relative' as const
      };
    }
  };

  return (
    <div 
      className={`timeline-event p-2 rounded-md border ${borderColorClass} hover:shadow-md transition-all cursor-pointer relative`}
      onClick={() => onSelect(event)}
      style={getPositionStyle()}
      title={t("timelineEvent")}
    >
      <div className="flex items-start gap-2">
        <ColoredEvent 
          type={event.type as EventType} 
          priority={event.priority} 
          icon={getEventIcon()} 
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{event.title}</p>
          <p className="text-xs text-muted-foreground">
            {safeFormatDate(event.timestamp, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};
