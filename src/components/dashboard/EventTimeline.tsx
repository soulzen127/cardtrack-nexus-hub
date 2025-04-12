
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { timelineEvents, TimelineEvent } from "../tracking/map/mockData";
import { EventDetails } from "./timeline/EventDetails";
import { TimelineHeader } from "./timeline/TimelineHeader";
import { TimelineNavigation } from "./timeline/TimelineNavigation";
import { TimelineContent } from "./timeline/TimelineContent";
import { useTimeline } from "@/hooks/use-timeline";
import { getSelectedEvent } from "@/utils/eventUtils";

interface EventTimelineProps {
  onEventSelect: (event: TimelineEvent) => void;
}

export const EventTimeline = ({ onEventSelect }: EventTimelineProps) => {
  const { t } = useI18n();
  
  const {
    timelineRef,
    selectedEventIndex,
    zoomLevel,
    isMobileDevice,
    selectedEventType,
    visibleDates,
    dates,
    sortedEvents,
    filteredEvents,
    alertEvents,
    activityEvents,
    handleWheel,
    adjustZoom,
    handleEventSelect,
    handleEventTypeChange,
    toggleShowDate,
    navigateDates
  } = useTimeline(timelineEvents, onEventSelect);
  
  if (filteredEvents.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <TimelineHeader
          selectedEventType={selectedEventType}
          onEventTypeChange={handleEventTypeChange}
          isMobileDevice={isMobileDevice}
          onZoomAdjust={adjustZoom}
          zoomLevel={zoomLevel}
        />
        <CardContent className="flex justify-center items-center p-10">
          <p className="text-muted-foreground">{t("noEventsAvailable")}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Get the selected event based on the current filters
  const selectedEvent = getSelectedEvent(
    filteredEvents,
    alertEvents,
    activityEvents,
    selectedEventType,
    selectedEventIndex
  );
  
  return (
    <Card className="col-span-1 lg:col-span-2" ref={timelineRef}>
      <TimelineHeader
        selectedEventType={selectedEventType}
        onEventTypeChange={handleEventTypeChange}
        isMobileDevice={isMobileDevice}
        onZoomAdjust={adjustZoom}
        zoomLevel={zoomLevel}
      />
      <CardContent className="space-y-6">
        {/* Timeline title and navigation */}
        <TimelineNavigation onNavigate={navigateDates} />
        
        {/* Horizontal Timeline View with Y-axis categories */}
        <TimelineContent
          alertEvents={alertEvents}
          activityEvents={activityEvents}
          selectedEventType={selectedEventType}
          selectedEventIndex={selectedEventIndex}
          onEventSelect={handleEventSelect}
          zoomLevel={zoomLevel}
          onWheel={!isMobileDevice ? handleWheel : undefined}
          dates={dates}
          toggleShow={toggleShowDate}
          visibleDates={visibleDates}
        />
        
        {/* Event details section - shown when an event is selected */}
        <div className="pt-4 border-t">
          <div className="space-y-4">
            {filteredEvents.length > 0 && (
              <EventDetails event={selectedEvent} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
