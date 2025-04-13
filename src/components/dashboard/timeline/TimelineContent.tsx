
import React, { useRef, useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelineRow } from "./TimelineRow";
import { TimelineEvent } from "../../tracking/map/mockData";
import { AlertCircle, Activity, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface TimelineContentProps {
  alertEvents: TimelineEvent[];
  activityEvents: TimelineEvent[];
  selectedEventType: 'all' | 'alert' | 'activity';
  selectedEventIndex: number;
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  onWheel?: (e: React.WheelEvent) => void;
  dates: string[];
  toggleShow: (dateIndex: number) => void;
  visibleDates: boolean[];
  navigateDates: (direction: 'prev' | 'next') => void;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  alertEvents,
  activityEvents,
  selectedEventType,
  selectedEventIndex,
  onEventSelect,
  zoomLevel,
  setZoomLevel,
  onWheel,
  dates,
  toggleShow,
  visibleDates,
  navigateDates
}) => {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-fast
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch events for mobile drag scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !timelineRef.current) return;
    const x = e.touches[0].pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? 0.25 : -0.25;
    const newZoomLevel = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoomLevel);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => navigateDates('prev')}
            className="px-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-1">{t("previous")}</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => navigateDates('next')}
            className="px-2"
          >
            <span className="mr-1">{t("next")}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:inline-block">
            {t("zoomInstructions")}
          </span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleZoom('out')}
            disabled={zoomLevel <= 0.5}
            title={t("zoomOut")}
            className="p-1 h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
            <span className="sr-only">{t("zoomOut")}</span>
          </Button>
          <div className="w-24 hidden md:block">
            <Slider
              value={[zoomLevel * 100]}
              min={50}
              max={300}
              step={25}
              onValueChange={([val]) => setZoomLevel(val / 100)}
            />
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleZoom('in')}
            disabled={zoomLevel >= 3}
            title={t("zoomIn")}
            className="p-1 h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">{t("zoomIn")}</span>
          </Button>
        </div>
      </div>
      
      <div 
        className="relative overflow-hidden border rounded-md"
        onWheel={onWheel}
      >
        <div 
          ref={timelineRef}
          className={`overflow-x-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="min-w-full"
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'left center',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="flex">
              {/* Y-axis labels */}
              <div className="w-24 shrink-0 border-r bg-muted/30">
                <div className="h-12 flex items-center justify-center font-medium text-sm border-b">
                  {t("timelineView")}
                </div>
                
                {/* Alert row header */}
                {(selectedEventType === 'all' || selectedEventType === 'alert') && (
                  <div className="h-[140px] flex items-center px-2 border-b">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="font-medium text-sm">{t("alerts")}</span>
                    </div>
                  </div>
                )}
                
                {/* Activity row header */}
                {(selectedEventType === 'all' || selectedEventType === 'activity') && (
                  <div className="h-[140px] flex items-center px-2">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium text-sm">{t("activities")}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Timeline grid */}
              <div className="flex-1 relative">
                {/* Date headers */}
                <div className="flex h-12 border-b sticky top-0 bg-background z-10">
                  {dates.map((date, index) => (
                    <div 
                      key={`date-${index}`}
                      className={`w-48 min-w-[12rem] flex flex-col items-center justify-center border-r last:border-r-0 px-2 ${!visibleDates[index] ? 'opacity-50' : ''}`}
                    >
                      <div className="font-medium text-sm">{date}</div>
                      <button 
                        className="text-xs text-muted-foreground"
                        onClick={() => toggleShow(index)}
                      >
                        {t("show")}
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Timeline content grid */}
                <div className="relative">
                  {/* Alert row */}
                  {(selectedEventType === 'all' || selectedEventType === 'alert') && (
                    <div className="h-[140px] border-b relative">
                      <TimelineRow
                        title={t("alerts")}
                        icon={<AlertCircle className="h-4 w-4 text-red-500" />}
                        events={alertEvents}
                        selectedEventType={selectedEventType}
                        selectedEventIndex={selectedEventIndex}
                        onEventSelect={onEventSelect}
                        type="alert"
                        zoomLevel={zoomLevel}
                        dates={dates}
                        visibleDates={visibleDates}
                      />
                    </div>
                  )}
                  
                  {/* Activity row */}
                  {(selectedEventType === 'all' || selectedEventType === 'activity') && (
                    <div className="h-[140px] relative">
                      <TimelineRow
                        title={t("activities")}
                        icon={<Activity className="h-4 w-4 text-green-500" />}
                        events={activityEvents}
                        selectedEventType={selectedEventType}
                        selectedEventIndex={selectedEventIndex}
                        onEventSelect={onEventSelect}
                        type="activity"
                        zoomLevel={zoomLevel}
                        dates={dates}
                        visibleDates={visibleDates}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Drag instruction overlay (shows briefly on load) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/5 animate-fade-out" style={{ animationDuration: '3s' }}>
          <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-md shadow-lg">
            <p className="text-sm font-medium">{t("dragToNavigate")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
