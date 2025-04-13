
import React, { useState, useEffect } from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { useI18n } from "@/hooks/use-i18n";
import { ZoomControls } from "./TimelineControls/ZoomControls";
import { DateNavigation } from "./TimelineControls/DateNavigation";
import { DraggableTimeline } from "./DraggableTimeline";

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
  
  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? 0.25 : -0.25;
    const newZoomLevel = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoomLevel);
  };

  // Calculate the cell width based on zoom level
  const cellWidth = 12 * zoomLevel; // Base width is 12rem, scaled by zoom level

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <DateNavigation navigateDates={navigateDates} />
        <ZoomControls 
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          handleZoom={handleZoom}
        />
      </div>
      
      <div 
        className="relative overflow-hidden border rounded-md"
        onWheel={onWheel}
      >
        <DraggableTimeline
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
