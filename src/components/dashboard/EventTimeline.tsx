
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/hooks/use-i18n";
import { timelineEvents, TimelineEvent } from "../tracking/map/mockData";
import { AlertCircle, Activity, Calendar, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EventTimelineProps {
  onEventSelect: (event: TimelineEvent) => void;
}

export const EventTimeline = ({ onEventSelect }: EventTimelineProps) => {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, > 1 = zoomed in
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  // Detect touch devices
  useEffect(() => {
    setIsMobileDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Sort events by timestamp
  const sortedEvents = [...timelineEvents].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Convert to slider value (0-100)
  const handleSliderChange = (value: number[]) => {
    const index = Math.floor((value[0] / 100) * (sortedEvents.length - 1));
    setSelectedEventIndex(index);
    onEventSelect(sortedEvents[index]);
    
    // Scroll to the event in the timeline
    if (timelineRef.current) {
      const eventElements = timelineRef.current.querySelectorAll('.timeline-event');
      if (eventElements[index]) {
        eventElements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };
  
  const navigateEvent = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'prev' 
      ? Math.max(0, selectedEventIndex - 1)
      : Math.min(sortedEvents.length - 1, selectedEventIndex + 1);
    
    setSelectedEventIndex(newIndex);
    onEventSelect(sortedEvents[newIndex]);
    
    if (timelineRef.current) {
      const eventElements = timelineRef.current.querySelectorAll('.timeline-event');
      if (eventElements[newIndex]) {
        eventElements[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };
  
  // Handle zoom functionality with mouse wheel
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
  
  // Calculate timeline item width based on zoom level
  const getTimelineItemStyle = () => {
    const baseWidth = 140; // Base width in pixels
    return {
      width: `${baseWidth * zoomLevel}px`,
      transition: 'width 0.2s ease-out'
    };
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t("eventTimeline")}</CardTitle>
            <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
          </div>
          {isMobileDevice && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => adjustZoom('out')}
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => adjustZoom('in')}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center">
            <button 
              onClick={() => navigateEvent('prev')}
              disabled={selectedEventIndex === 0}
              className="p-1 rounded-full bg-background shadow hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          
          <div 
            ref={timelineRef}
            className="flex space-x-3 overflow-x-auto py-2 px-6 scrollbar-hide"
            onWheel={!isMobileDevice ? handleWheel : undefined}
          >
            {sortedEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`timeline-event flex-shrink-0 cursor-pointer p-2 rounded-md border ${
                  index === selectedEventIndex ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onClick={() => {
                  setSelectedEventIndex(index);
                  onEventSelect(event);
                }}
                style={getTimelineItemStyle()}
              >
                <div className="flex items-start gap-2">
                  {event.type === 'alert' ? (
                    <div className={`p-1 rounded-full ${
                      event.priority === "high" ? "bg-red-100" :
                      event.priority === "medium" ? "bg-amber-100" : "bg-blue-100"
                    }`}>
                      <AlertCircle className={`h-3 w-3 ${
                        event.priority === "high" ? "text-red-500" :
                        event.priority === "medium" ? "text-amber-500" : "text-blue-500"
                      }`} />
                    </div>
                  ) : (
                    <div className="p-1 rounded-full bg-green-100">
                      <Activity className="h-3 w-3 text-green-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(parseISO(event.timestamp), 'HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute inset-y-0 right-0 z-10 flex items-center">
            <button 
              onClick={() => navigateEvent('next')}
              disabled={selectedEventIndex === sortedEvents.length - 1}
              className="p-1 rounded-full bg-background shadow hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {format(parseISO(sortedEvents[0].timestamp), 'HH:mm')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {format(parseISO(sortedEvents[sortedEvents.length - 1].timestamp), 'HH:mm')}
              </span>
            </div>
          </div>
          
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            value={[(selectedEventIndex / (sortedEvents.length - 1)) * 100 || 0]}
            onValueChange={handleSliderChange}
            className="cursor-pointer"
          />
        </div>
        
        <div className="pt-2 border-t">
          <div className="space-y-4">
            <div className={`p-2 rounded-md ${
              sortedEvents[selectedEventIndex].type === 'alert'
                ? sortedEvents[selectedEventIndex].priority === 'high'
                  ? 'bg-red-50'
                  : sortedEvents[selectedEventIndex].priority === 'medium'
                    ? 'bg-amber-50'
                    : 'bg-blue-50'
                : 'bg-green-50'
            }`}>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">{sortedEvents[selectedEventIndex].title}</h3>
                <span className="text-xs bg-background rounded-full px-2 py-0.5">
                  {format(parseISO(sortedEvents[selectedEventIndex].timestamp), 'MMM dd, HH:mm')}
                </span>
              </div>
              <p className="text-sm mt-1">{sortedEvents[selectedEventIndex].description}</p>
              <div className="mt-2">
                <Link 
                  to={sortedEvents[selectedEventIndex].link} 
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {t("viewDetails")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
