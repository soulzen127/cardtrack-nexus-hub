
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { timelineEvents, TimelineEvent } from "../tracking/map/mockData";
import { AlertCircle, Activity } from "lucide-react";
import { format, parseISO } from "date-fns";
import { TimelineRow } from "./timeline/TimelineRow";
import { EventDetails } from "./timeline/EventDetails";
import { TimelineControls } from "./timeline/TimelineControls";

interface EventTimelineProps {
  onEventSelect: (event: TimelineEvent) => void;
}

export const EventTimeline = ({ onEventSelect }: EventTimelineProps) => {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, > 1 = zoomed in
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'alert' | 'activity'>('all');
  
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
    
    // Scroll to the event in the timeline
    if (timelineRef.current) {
      const eventElements = timelineRef.current.querySelectorAll('.timeline-event');
      if (eventElements[index]) {
        eventElements[index].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  };
  
  // Filter events by type
  const handleEventTypeChange = (type: 'all' | 'alert' | 'activity') => {
    setSelectedEventType(type);
    setSelectedEventIndex(0);
    if (type !== 'all') {
      const firstEventOfType = sortedEvents.findIndex(event => event.type === type);
      if (firstEventOfType !== -1) {
        setSelectedEventIndex(0);
        onEventSelect(sortedEvents.filter(event => event.type === type)[0]);
      }
    } else {
      onEventSelect(sortedEvents[0]);
    }
  };
  
  if (filteredEvents.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>{t("eventTimeline")}</CardTitle>
          <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-10">
          <p className="text-muted-foreground">No events available</p>
        </CardContent>
      </Card>
    );
  }
  
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
        {/* Horizontal Timeline View with Y-axis categories */}
        <div className="relative">
          <div className="flex flex-col space-y-6" ref={timelineRef}>
            {/* Alert Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'alert') && (
              <TimelineRow
                title={t("alerts")}
                icon={<AlertCircle className="h-4 w-4 mr-1 text-red-500" />}
                events={alertEvents}
                selectedEventType={selectedEventType}
                selectedEventIndex={selectedEventIndex}
                onEventSelect={handleEventSelect}
                type="alert"
                zoomLevel={zoomLevel}
                onWheel={!isMobileDevice ? handleWheel : undefined}
              />
            )}
            
            {/* Activity Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'activity') && (
              <TimelineRow
                title={t("activities")}
                icon={<Activity className="h-4 w-4 mr-1 text-green-500" />}
                events={activityEvents}
                selectedEventType={selectedEventType}
                selectedEventIndex={selectedEventIndex}
                onEventSelect={handleEventSelect}
                type="activity"
                zoomLevel={zoomLevel}
                onWheel={!isMobileDevice ? handleWheel : undefined}
              />
            )}
          </div>
          
          {/* Time legend */}
          <div className="mt-2 flex justify-between px-24">
            <span className="text-xs text-muted-foreground">
              {filteredEvents.length > 0 && format(parseISO(filteredEvents[0].timestamp), 'HH:mm')}
            </span>
            <span className="text-xs text-muted-foreground">
              {filteredEvents.length > 0 && format(parseISO(filteredEvents[filteredEvents.length - 1].timestamp), 'HH:mm')}
            </span>
          </div>
        </div>
        
        {/* Event details section */}
        <div className="pt-4 border-t">
          <div className="space-y-4">
            {filteredEvents.length > 0 && (
              <EventDetails event={filteredEvents[selectedEventIndex]} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
