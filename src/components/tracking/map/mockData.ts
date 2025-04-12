
import { CardLocation } from "./types";

// Mock data for card locations
export const mockCardLocations: CardLocation[] = [
  {
    id: "card-001",
    name: "Employee Card 1",
    location: "Office Building A",
    coordinates: [121.5654, 25.0330],
    floor: 1,
    building: "Office Building"
  },
  {
    id: "card-002",
    name: "Employee Card 2",
    location: "Office Building B",
    coordinates: [121.5644, 25.0320],
    floor: 2,
    building: "Office Building"
  },
  {
    id: "card-003",
    name: "Visitor Card 1",
    location: "Reception Area",
    coordinates: [121.5634, 25.0310],
    floor: 0,
    building: "Office Building"
  },
  {
    id: "card-004",
    name: "Security Card 1",
    location: "Security Gate",
    coordinates: [121.5624, 25.0300],
    indoorOnly: false
  }
];
