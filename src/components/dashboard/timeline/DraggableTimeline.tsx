
import React, { useRef, useState } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { TimelineEvent } from "../../tracking/map/mockData";
import { TimelineGrid } from "./TimelineGrid/TimelineGrid";
import { AxisLabels } from "./TimelineGrid/AxisLabels";

interface DraggableTimelineProps {
  alertEvents: TimelineEvent[];
  activityEvents: TimelineEvent[];
  selectedEventType: 'all' | 'alert' | 'activity';
  selectedEventIndex: number;
  onEventSelect: (event: TimelineEvent, index: number, type: 'alert' | 'activity') => void;
  zoomLevel: number;
  dates: string[];
  visibleDates: boolean[];
  toggleShow: (dateIndex: number) => void;
  cellWidth: number;
}

export const DraggableTimeline: React.FC<DraggableTimelineProps> = ({
  alertEvents,
  activityEvents,
  selectedEventType,
  selectedEventIndex,
  onEventSelect,
  zoomLevel,
  dates,
  visibleDates,
  toggleShow,
  cellWidth
}) => {
  const { t } = useI18n();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
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
  
  return (
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
        style={{ transition: 'transform 0.2s ease-out' }}
      >
        <div className="flex">
          {/* Y-axis labels */}
          <AxisLabels selectedEventType={selectedEventType} />
          
          {/* Timeline grid */}
          <TimelineGrid
            alertEvents={alertEvents}
            activityEvents={activityEvents}
            selectedEventType={selectedEventType}
            selectedEventIndex={selectedEventIndex}
            onEventSelect={onEventSelect}
            zoomLevel={zoomLevel}
            dates={dates}
            visibleDates={visibleDates}
            toggleShow={toggleShow}
            cellWidth={cellWidth}
          />
        </div>
      </div>
    </div>
  );
};
