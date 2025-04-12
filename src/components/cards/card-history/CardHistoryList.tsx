
import React from "react";
import { MapPin, Clock } from "lucide-react";
import { CardHistoryItem } from "./types";

interface CardHistoryListProps {
  cardHistory: CardHistoryItem[];
}

export function CardHistoryList({ cardHistory }: CardHistoryListProps) {
  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto">
      {cardHistory.map((history, index) => (
        <div key={index} className="flex items-start border-b pb-3 last:border-0">
          <div className="flex-shrink-0 mr-3 mt-1">
            {history.event.includes('Location') ? (
              <MapPin className="h-5 w-5 text-primary" />
            ) : (
              <Clock className="h-5 w-5 text-secondary" />
            )}
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-medium">{history.event}</span>
              <span className="text-sm text-muted-foreground">
                {history.date} {history.time}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{history.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
