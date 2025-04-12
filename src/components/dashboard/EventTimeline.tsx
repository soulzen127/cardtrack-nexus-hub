
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { timelineEvents, TimelineEvent } from "../tracking/map/mockData";
import { AlertCircle, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { TimelineRow } from "./timeline/TimelineRow";
import { EventDetails } from "./timeline/EventDetails";
import { TimelineControls } from "./timeline/TimelineControls";
import { format, parseISO, subDays, addDays, isValid } from "date-fns";
import { Button } from "../ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { ScrollArea } from "../ui/scroll-area";

interface EventTimelineProps {
  onEventSelect: (event: TimelineEvent) => void;
}

export const EventTimeline = ({ onEventSelect }: EventTimelineProps) => {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'alert' | 'activity'>('all');
  
  // State for the visible dates
  const today = new Date();
  const [visibleDates, setVisibleDates] = useState<boolean[]>([true, true, true, true, true]);
  
  // Create dates safely
  const createFormattedDate = (date: Date): string => {
    try {
      if (!isValid(date)) {
        console.error("Invalid date object:", date);
        return format(new Date(), 'yyyy/MM/dd'); // Default to today if invalid
      }
      return format(date, 'yyyy/MM/dd');
    } catch (error) {
      console.error("Error formatting date:", error);
      return format(new Date(), 'yyyy/MM/dd'); // Default to today if error
    }
  };
  
  const [dates, setDates] = useState<string[]>([
    createFormattedDate(subDays(today, 2)),
    createFormattedDate(subDays(today, 1)),
    createFormattedDate(today),
    createFormattedDate(addDays(today, 1)),
    createFormattedDate(addDays(today, 2)),
  ]);
  
  // Detect touch devices
  useEffect(() => {
    setIsMobileDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Sort events by timestamp
  const sortedEvents = [...timelineEvents].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Filter events by type if selected
  const filteredEvents = selectedEventType === 'all' 
    ? sortedEvents 
    : sortedEvents.filter(event => event.type === selectedEventType);
  
  // Group events by type for the Y-axis
  const alertEvents = sortedEvents.filter(event => event.type === 'alert');
  const activityEvents = sortedEvents.filter(event => event.type === 'activity');
  
  // Handle wheel functionality with mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (!timelineRef.current) return;
    e.preventDefault();
    
    // Zoom in/out based on wheel direction
    const delta = e.deltaY * -0.01;
    const newZoomLevel = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoomLevel);
  };
  
  // Controls for zoom level
  const adjustZoom = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? 0.25 : -0.25;
    const newZoomLevel = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoomLevel);
  };
  
  // Handle event selection
  const handleEventSelect = (event: TimelineEvent, index: number, type: 'alert' | 'activity') => {
    setSelectedEventType(type);
    setSelectedEventIndex(index);
    onEventSelect(event);
  };
  
  // Filter events by type
  const handleEventTypeChange = (type: 'all' | 'alert' | 'activity') => {
    setSelectedEventType(type);
    
    if (type !== 'all') {
      const eventsOfType = type === 'alert' ? alertEvents : activityEvents;
      if (eventsOfType.length > 0) {
        setSelectedEventIndex(0);
        onEventSelect(eventsOfType[0]);
      }
    } else if (sortedEvents.length > 0) {
      setSelectedEventIndex(0);
      onEventSelect(sortedEvents[0]);
    }
  };
  
  // Toggle showing/hiding events for a date
  const toggleShowDate = (dateIndex: number) => {
    const newVisibleDates = [...visibleDates];
    newVisibleDates[dateIndex] = !newVisibleDates[dateIndex];
    setVisibleDates(newVisibleDates);
  };
  
  // Safely create a date from a string
  const safelyCreateDate = (dateStr: string): Date => {
    try {
      // Check if it's a yyyy/MM/dd format
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // 0-indexed months
        const day = parseInt(parts[2], 10);
        
        const result = new Date(year, month, day);
        if (isValid(result)) {
          return result;
        }
      }
      console.warn("Could not parse date string:", dateStr);
      return new Date(); // fallback to today
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date(); // fallback to today
    }
  };
  
  // Navigate timeline dates
  const navigateDates = (direction: 'prev' | 'next') => {
    const newDates = [...dates];
    if (direction === 'prev') {
      const firstDate = safelyCreateDate(dates[0]);
      const newFirstDate = subDays(firstDate, dates.length);
      newDates.unshift(createFormattedDate(newFirstDate));
      newDates.pop();
    } else {
      const lastDate = safelyCreateDate(dates[dates.length - 1]);
      const newLastDate = addDays(lastDate, 1);
      newDates.push(createFormattedDate(newLastDate));
      newDates.shift();
    }
    setDates(newDates);
  };
  
  if (filteredEvents.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>{t("eventTimeline")}</CardTitle>
          <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-10">
          <p className="text-muted-foreground">{t("noEventsAvailable")}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Get the selected event based on the current filters
  const getSelectedEvent = (): TimelineEvent => {
    if (selectedEventType === 'all') {
      return filteredEvents[selectedEventIndex] || filteredEvents[0];
    } else {
      const eventsOfType = selectedEventType === 'alert' ? alertEvents : activityEvents;
      return eventsOfType[selectedEventIndex] || eventsOfType[0] || filteredEvents[0];
    }
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t("eventTimeline")}</CardTitle>
            <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
          </div>
          <TimelineControls
            selectedEventType={selectedEventType}
            onEventTypeChange={handleEventTypeChange}
            isMobileDevice={isMobileDevice}
            onZoomAdjust={adjustZoom}
            zoomLevel={zoomLevel}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline title and navigation */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{t("eventTimelineDate")}</h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => navigateDates('prev')} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => navigateDates('next')} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        
        {/* Horizontal Timeline View with Y-axis categories */}
        <div className="relative overflow-hidden" ref={timelineRef}>
          <ScrollArea className="h-auto">
            {/* Alert Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'alert') && (
              <TimelineRow
                title={t("alerts")}
                icon={<AlertCircle className="h-4 w-4 text-red-500" />}
                events={alertEvents}
                selectedEventType={selectedEventType}
                selectedEventIndex={selectedEventIndex}
                onEventSelect={handleEventSelect}
                type="alert"
                zoomLevel={zoomLevel}
                onWheel={!isMobileDevice ? handleWheel : undefined}
                dates={dates}
                toggleShow={toggleShowDate}
                visibleDates={visibleDates}
              />
            )}
            
            {/* Activity Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'activity') && (
              <TimelineRow
                title={t("activities")}
                icon={<Activity className="h-4 w-4 text-green-500" />}
                events={activityEvents}
                selectedEventType={selectedEventType}
                selectedEventIndex={selectedEventIndex}
                onEventSelect={handleEventSelect}
                type="activity"
                zoomLevel={zoomLevel}
                onWheel={!isMobileDevice ? handleWheel : undefined}
                dates={dates}
                toggleShow={toggleShowDate}
                visibleDates={visibleDates}
              />
            )}
          </ScrollArea>
        </div>
        
        {/* Event details section - shown when an event is selected */}
        <div className="pt-4 border-t">
          <div className="space-y-4">
            {filteredEvents.length > 0 && (
              <EventDetails event={getSelectedEvent()} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
