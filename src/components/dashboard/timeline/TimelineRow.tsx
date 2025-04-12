
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { Circle, ChevronDown } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { useI18n } from "@/hooks/use-i18n";

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
  const eventsByDate = dates.map(date => {
    const dayEvents = events.filter(event => {
      const eventDate = format(parseISO(event.timestamp), 'yyyy/MM/dd');
      return eventDate === date;
    });
    return dayEvents;
  });
  
  // Helper function to safely format date
  const safeFormatDate = (dateString: string, formatString: string): string => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return "Invalid date";
      }
      return format(date, formatString);
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return "Invalid date";
    }
  };
  
  return (
    <div className="mb-6">
      <div className="font-medium mb-2 flex items-center">
        {icon}
        <span className="ml-1">{title}</span>
      </div>
      <div className="relative">
        <div className="flex space-x-12 overflow-x-auto py-2 scrollbar-hide" onWheel={onWheel}>
          {dates.map((date, dateIndex) => {
            const dayEvents = eventsByDate[dateIndex];
            const count = dayEvents.length;
            
            let displayDate = "Invalid date";
            // Check if the date is today by comparing with today's formatted date
            const isToday = date === format(new Date(), 'yyyy/MM/dd');
            
            if (isToday) {
              displayDate = t("today");
            } else {
              // Try to safely format the date
              try {
                // First check if date is a properly formatted yyyy/MM/dd string
                const parts = date.split('/');
                if (parts.length === 3) {
                  const year = parseInt(parts[0], 10);
                  const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
                  const day = parseInt(parts[2], 10);
                  
                  const dateObj = new Date(year, month, day);
                  
                  if (isValid(dateObj)) {
                    displayDate = format(dateObj, 'MM/dd');
                  }
                }
              } catch (error) {
                console.error("Error parsing date:", error, date);
              }
            }
            
            return (
              <div key={date} className="flex flex-col items-center">
                <div className="text-sm mb-2">
                  {displayDate}
                </div>
                <div className="text-xs text-center mb-1">
                  {count}
                </div>
                <div 
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer mb-2`}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      onEventSelect(dayEvents[0], 0, type);
                    }
                  }}
                />
                <button 
                  className="flex items-center text-xs text-muted-foreground"
                  onClick={() => toggleShow(dateIndex)}
                >
                  {t("show")}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
