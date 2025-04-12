
import { TimelineEvent } from "../components/tracking/map/mockData";
import { format, parseISO } from "date-fns";

// Sort events by timestamp
export const sortEventsByTimestamp = (events: TimelineEvent[]): TimelineEvent[] => {
  return [...events].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

// Filter events by type
export const filterEventsByType = (
  events: TimelineEvent[], 
  type: 'all' | 'alert' | 'activity' | 'info' | 'warning' | 'success' | 'error'
): TimelineEvent[] => {
  if (type === 'all') {
    return events;
  }
  return events.filter(event => event.type === type);
};

// Group events by type
export const groupEventsByType = (events: TimelineEvent[]): {
  alertEvents: TimelineEvent[];
  activityEvents: TimelineEvent[];
  infoEvents: TimelineEvent[];
  warningEvents: TimelineEvent[];
  successEvents: TimelineEvent[];
  errorEvents: TimelineEvent[];
} => {
  const alertEvents = events.filter(event => event.type === 'alert');
  const activityEvents = events.filter(event => event.type === 'activity');
  const infoEvents = events.filter(event => event.type === 'info');
  const warningEvents = events.filter(event => event.type === 'warning');
  const successEvents = events.filter(event => event.type === 'success');
  const errorEvents = events.filter(event => event.type === 'error');
  
  return { 
    alertEvents, 
    activityEvents,
    infoEvents,
    warningEvents,
    successEvents,
    errorEvents
  };
};

// Group events by date
export const groupEventsByDate = (events: TimelineEvent[], dates: string[]): TimelineEvent[][] => {
  return dates.map(date => {
    return events.filter(event => {
      try {
        const eventDate = format(parseISO(event.timestamp), 'yyyy/MM/dd');
        return eventDate === date;
      } catch (error) {
        console.error("Error formatting event date:", error, event.timestamp);
        return false;
      }
    });
  });
};

// Get a selected event based on filters
export const getSelectedEvent = (
  filteredEvents: TimelineEvent[],
  alertEvents: TimelineEvent[],
  activityEvents: TimelineEvent[],
  selectedEventType: 'all' | 'alert' | 'activity',
  selectedEventIndex: number
): TimelineEvent => {
  if (selectedEventType === 'all') {
    return filteredEvents[selectedEventIndex] || filteredEvents[0];
  } else {
    const eventsOfType = selectedEventType === 'alert' ? alertEvents : activityEvents;
    return eventsOfType[selectedEventIndex] || eventsOfType[0] || filteredEvents[0];
  }
};
