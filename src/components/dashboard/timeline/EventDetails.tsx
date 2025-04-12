
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";

interface EventDetailsProps {
  event: TimelineEvent;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const { t } = useI18n();
  
  const getBgColor = () => {
    if (event.type === 'alert') {
      if (event.priority === 'high') return 'bg-red-50 dark:bg-red-950/20';
      if (event.priority === 'medium') return 'bg-amber-50 dark:bg-amber-950/20';
      return 'bg-blue-50 dark:bg-blue-950/20';
    }
    return 'bg-green-50 dark:bg-green-950/20';
  };
  
  return (
    <div className={`p-4 rounded-md ${getBgColor()}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium">{event.title}</h3>
        <span className="text-xs bg-background rounded-full px-2 py-0.5">
          {format(parseISO(event.timestamp), 'MMM dd, HH:mm')}
        </span>
      </div>
      <p className="text-sm mt-2">{event.description}</p>
      <div className="mt-3">
        <Link 
          to={event.link} 
          className="text-xs font-medium text-primary hover:underline"
        >
          {t("viewDetails")} &rarr;
        </Link>
      </div>
    </div>
  );
};
