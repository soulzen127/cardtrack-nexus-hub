
import { useState, useEffect, useRef } from "react";
import { TimelineEvent } from "../components/tracking/map/mockData";
import { generateTimelineDates, getNavigatedDates } from "../utils/dateUtils";
import { sortEventsByTimestamp, filterEventsByType, groupEventsByType } from "../utils/eventUtils";
import { EventType } from "../components/dashboard/timeline/ColoredEvent";

export const useTimeline = (events: TimelineEvent[], onEventSelect: (event: TimelineEvent) => void) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'alert' | 'activity'>('all');
  
  // State for the visible dates
  const [visibleDates, setVisibleDates] = useState<boolean[]>([true, true, true, true, true]);
  
  // Initialize dates
  const [dates, setDates] = useState<string[]>(generateTimelineDates());
  
  // Detect touch devices
  useEffect(() => {
    setIsMobileDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Sort events by timestamp
  const sortedEvents = sortEventsByTimestamp(events);
  
  // Filter events by type if selected
  const filteredEvents = filterEventsByType(sortedEvents, selectedEventType);
  
  // Group events by type for the Y-axis
  const { alertEvents, activityEvents } = groupEventsByType(sortedEvents);
  
  // Handle wheel functionality with mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (!timelineRef.current) return;
    e.preventDefault();
    
    // Zoom in/out based on wheel direction
    const delta = e.deltaY * -0.01;
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
  
  // Navigate timeline dates
  const navigateDates = (direction: 'prev' | 'next') => {
    const newDates = getNavigatedDates(dates, direction);
    setDates(newDates);
    
    // Reset visible dates when navigating
    setVisibleDates(new Array(newDates.length).fill(true));
  };

  return {
    timelineRef,
    selectedEventIndex,
    zoomLevel,
    setZoomLevel,
    isMobileDevice,
    selectedEventType,
    visibleDates,
    dates,
    sortedEvents,
    filteredEvents,
    alertEvents,
    activityEvents,
    handleWheel,
    handleEventSelect,
    handleEventTypeChange,
    toggleShowDate,
    navigateDates
  };
};
