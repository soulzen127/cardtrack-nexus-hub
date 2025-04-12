
import { CardHistoryItem } from "./types";

// Mock history data with coordinates as tuples of [number, number]
export const mockCardHistory: CardHistoryItem[] = [
  { 
    date: "2023-04-18", 
    time: "14:23", 
    event: "Location updated", 
    details: "Taipei, Taiwan",
    coordinates: [121.5654, 25.0330] as [number, number]
  },
  { 
    date: "2023-04-18", 
    time: "12:30", 
    event: "Card used", 
    details: "Building access",
    coordinates: [121.5644, 25.0320] as [number, number]
  },
  { 
    date: "2023-04-17", 
    time: "09:45", 
    event: "Card used", 
    details: "Building access",
    coordinates: [121.5634, 25.0310] as [number, number]
  },
  { 
    date: "2023-04-15", 
    time: "16:30", 
    event: "Status changed", 
    details: "Set to Active",
    coordinates: [121.5624, 25.0300] as [number, number]
  },
];
