
import { CardLocation } from "./types";
import { EventType } from "../../dashboard/timeline/ColoredEvent";

// Mock data for card locations
export const mockCardLocations: CardLocation[] = [
  {
    id: "card-001",
    name: "Employee Card 1",
    location: "Office Building A",
    coordinates: [121.5654, 25.0330],
    floor: 1,
    building: "Office Building",
    lastUpdated: "2025-04-12T08:30:00Z"
  },
  {
    id: "card-002",
    name: "Employee Card 2",
    location: "Office Building B",
    coordinates: [121.5644, 25.0320],
    floor: 2,
    building: "Office Building",
    lastUpdated: "2025-04-12T09:15:00Z"
  },
  {
    id: "card-003",
    name: "Visitor Card 1",
    location: "Reception Area",
    coordinates: [121.5634, 25.0310],
    floor: 0,
    building: "Office Building",
    lastUpdated: "2025-04-12T10:05:00Z"
  },
  {
    id: "card-004",
    name: "Security Card 1",
    location: "Security Gate",
    coordinates: [121.5624, 25.0300],
    indoorOnly: false,
    lastUpdated: "2025-04-12T07:45:00Z"
  }
];

// Mock data for timeline events
export interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: string;
  priority?: "high" | "medium" | "low";
  link: string;
  cardId?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "event-001",
    type: "alert",
    title: "Geofence Alert",
    description: "Card left authorized zone",
    timestamp: "2025-04-12T08:35:00Z",
    priority: "high",
    link: "/tracking",
    cardId: "card-001"
  },
  {
    id: "event-002",
    type: "activity",
    title: "Card Issued",
    description: "New card issued to John Doe",
    timestamp: "2025-04-12T09:00:00Z",
    link: "/cards"
  },
  {
    id: "event-003",
    type: "alert",
    title: "System Alert",
    description: "Database backup completed",
    timestamp: "2025-04-12T09:30:00Z",
    priority: "low",
    link: "/alerts"
  },
  {
    id: "event-004",
    type: "activity",
    title: "Location Updated",
    description: "Card location updated to main entrance",
    timestamp: "2025-04-12T10:15:00Z",
    link: "/tracking",
    cardId: "card-003"
  },
  {
    id: "event-005",
    type: "activity",
    title: "User Login",
    description: "Admin user logged in",
    timestamp: "2025-04-12T10:45:00Z",
    link: "/users"
  },
  {
    id: "event-006",
    type: "alert",
    title: "Card Lost",
    description: "Card reported as lost",
    timestamp: "2025-04-12T11:20:00Z",
    priority: "medium",
    link: "/cards",
    cardId: "card-002"
  },
  {
    id: "event-007",
    type: "activity",
    title: "Report Generated",
    description: "Monthly usage report generated",
    timestamp: "2025-04-12T11:50:00Z",
    link: "/reports"
  }
];
