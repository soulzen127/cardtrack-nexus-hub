
export interface CardHistoryItem {
  date: string;
  time: string;
  event: string;
  details: string;
  coordinates: [number, number]; // Explicitly typed as a tuple
}
