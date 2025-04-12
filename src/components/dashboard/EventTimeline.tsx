
import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/hooks/use-i18n";
import { timelineEvents, TimelineEvent } from "../tracking/map/mockData";
import { AlertCircle, Activity, Calendar, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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
  
  // Convert to slider value (0-100)
  const handleSliderChange = (value: number[]) => {
    if (filteredEvents.length === 0) return;
    
    const index = Math.floor((value[0] / 100) * (filteredEvents.length - 1));
    setSelectedEventIndex(index);
    onEventSelect(filteredEvents[index]);
    
    // Scroll to the event in the timeline
    if (timelineRef.current) {
      const eventElements = timelineRef.current.querySelectorAll('.timeline-event');
      if (eventElements[index]) {
        eventElements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };
  
  const navigateEvent = (direction: 'prev' | 'next') => {
    if (filteredEvents.length === 0) return;
    
    let newIndex = direction === 'prev' 
      ? Math.max(0, selectedEventIndex - 1)
      : Math.min(filteredEvents.length - 1, selectedEventIndex + 1);
    
    setSelectedEventIndex(newIndex);
    onEventSelect(filteredEvents[newIndex]);
    
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
  
  // Calculate timeline item width based on zoom level
  const getTimelineItemStyle = () => {
    const baseWidth = 140; // Base width in pixels
    return {
      width: `${baseWidth * zoomLevel}px`,
      minWidth: `${baseWidth * zoomLevel}px`,
      transition: 'width 0.2s ease-out'
    };
  };
  
  // Group events by type for the Y-axis
  const alertEvents = sortedEvents.filter(event => event.type === 'alert');
  const activityEvents = sortedEvents.filter(event => event.type === 'activity');
  
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
          <div className="flex space-x-2">
            <Button 
              variant={selectedEventType === 'all' ? "default" : "outline"} 
              size="sm" 
              onClick={() => handleEventTypeChange('all')}
            >
              {t("all")}
            </Button>
            <Button 
              variant={selectedEventType === 'alert' ? "default" : "outline"} 
              size="sm" 
              onClick={() => handleEventTypeChange('alert')}
              className={selectedEventType === 'alert' ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("alerts")}
            </Button>
            <Button 
              variant={selectedEventType === 'activity' ? "default" : "outline"} 
              size="sm" 
              onClick={() => handleEventTypeChange('activity')}
              className={selectedEventType === 'activity' ? "bg-green-500 hover:bg-green-600" : ""}
            >
              <Activity className="h-4 w-4 mr-1" />
              {t("activities")}
            </Button>
            {isMobileDevice && (
              <div className="flex space-x-1">
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
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Horizontal Timeline View with Y-axis categories */}
        <div className="relative">
          <div className="flex flex-col space-y-6">
            {/* Alert Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'alert') && (
              <div className="flex items-center space-x-2">
                <div className="w-24 font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                  <span>{t("alerts")}</span>
                </div>
                <div className="relative flex-1">
                  <div 
                    ref={timelineRef}
                    className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide"
                    onWheel={!isMobileDevice ? handleWheel : undefined}
                  >
                    {alertEvents.map((event, index) => (
                      <div 
                        key={event.id}
                        className={`timeline-event flex-shrink-0 cursor-pointer p-2 rounded-md border ${
                          selectedEventType === 'alert' && index === selectedEventIndex ? 'border-red-500 bg-red-100/20' : 'border-border'
                        }`}
                        onClick={() => {
                          setSelectedEventType('alert');
                          setSelectedEventIndex(index);
                          onEventSelect(event);
                        }}
                        style={getTimelineItemStyle()}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`p-1 rounded-full ${
                            event.priority === "high" ? "bg-red-100" :
                            event.priority === "medium" ? "bg-amber-100" : "bg-blue-100"
                          }`}>
                            <AlertCircle className={`h-3 w-3 ${
                              event.priority === "high" ? "text-red-500" :
                              event.priority === "medium" ? "text-amber-500" : "text-blue-500"
                            }`} />
                          </div>
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
                </div>
              </div>
            )}
            
            {/* Activity Events Row */}
            {(selectedEventType === 'all' || selectedEventType === 'activity') && (
              <div className="flex items-center space-x-2">
                <div className="w-24 font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-1 text-green-500" />
                  <span>{t("activities")}</span>
                </div>
                <div className="relative flex-1">
                  <div 
                    className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide"
                    onWheel={!isMobileDevice ? handleWheel : undefined}
                  >
                    {activityEvents.map((event, index) => (
                      <div 
                        key={event.id}
                        className={`timeline-event flex-shrink-0 cursor-pointer p-2 rounded-md border ${
                          selectedEventType === 'activity' && index === selectedEventIndex ? 'border-green-500 bg-green-100/20' : 'border-border'
                        }`}
                        onClick={() => {
                          setSelectedEventType('activity');
                          setSelectedEventIndex(index);
                          onEventSelect(event);
                        }}
                        style={getTimelineItemStyle()}
                      >
                        <div className="flex items-start gap-2">
                          <div className="p-1 rounded-full bg-green-100">
                            <Activity className="h-3 w-3 text-green-500" />
                          </div>
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
                </div>
              </div>
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
              <div className={`p-4 rounded-md ${
                filteredEvents[selectedEventIndex].type === 'alert'
                  ? filteredEvents[selectedEventIndex].priority === 'high'
                    ? 'bg-red-50 dark:bg-red-950/20'
                    : filteredEvents[selectedEventIndex].priority === 'medium'
                      ? 'bg-amber-50 dark:bg-amber-950/20'
                      : 'bg-blue-50 dark:bg-blue-950/20'
                  : 'bg-green-50 dark:bg-green-950/20'
              }`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium">{filteredEvents[selectedEventIndex].title}</h3>
                  <span className="text-xs bg-background rounded-full px-2 py-0.5">
                    {format(parseISO(filteredEvents[selectedEventIndex].timestamp), 'MMM dd, HH:mm')}
                  </span>
                </div>
                <p className="text-sm mt-2">{filteredEvents[selectedEventIndex].description}</p>
                <div className="mt-3">
                  <Link 
                    to={filteredEvents[selectedEventIndex].link} 
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {t("viewDetails")} &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
