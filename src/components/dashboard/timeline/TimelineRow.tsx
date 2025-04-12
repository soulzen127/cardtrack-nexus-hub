
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { Circle, ChevronDown } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { groupEventsByDate } from "@/utils/eventUtils";
import { isDateToday, safeFormatDate } from "@/utils/dateUtils";

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
            // Check if the date is today
            const isToday = isDateToday(date);
            
            if (isToday) {
              displayDate = t("today");
            } else {
              // Try to safely format the date
              displayDate = safeFormatDate(date, 'MM/dd');
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
