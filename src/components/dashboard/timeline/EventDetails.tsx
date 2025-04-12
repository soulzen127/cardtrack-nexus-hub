
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import { AlertCircle, Activity, Clock, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { safeFormatDate } from "@/utils/dateUtils";

interface EventDetailsProps {
  event: TimelineEvent;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const { t } = useI18n();
  
  const isAlert = event.type === 'alert';
  
  const getBgColor = () => {
    if (isAlert) {
      if (event.priority === 'high') return 'bg-red-50 dark:bg-red-950/20';
      if (event.priority === 'medium') return 'bg-amber-50 dark:bg-amber-950/20';
      return 'bg-blue-50 dark:bg-blue-950/20';
    }
    return 'bg-green-50 dark:bg-green-950/20';
  };
  
  const getBadgeColor = () => {
    if (isAlert) {
      if (event.priority === 'high') return 'bg-red-100 text-red-800';
      if (event.priority === 'medium') return 'bg-amber-100 text-amber-800';
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-green-100 text-green-800';
  };
  
  return (
    <div className={`p-4 rounded-md ${getBgColor()}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {isAlert ? (
            <AlertCircle className={`h-5 w-5 ${
              event.priority === "high" ? "text-red-500" :
              event.priority === "medium" ? "text-amber-500" : "text-blue-500"
            }`} />
          ) : (
            <Activity className="h-5 w-5 text-green-500" />
          )}
          <h3 className="text-sm font-medium">{event.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor()}`}>
            {isAlert ? event.priority : 'normal'}
          </span>
        </div>
        <div className="flex items-center text-xs bg-background rounded-md px-2 py-1">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{safeFormatDate(event.timestamp, 'yyyy/MM/dd')}</span>
          <Clock className="h-3 w-3 mx-1" />
          <span>{safeFormatDate(event.timestamp, 'HH:mm:ss')}</span>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">{t("timelineEvent")}</TableHead>
            <TableHead>{isAlert ? t("alerts") : t("activities")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{t("eventTimeline")}</TableCell>
            <TableCell>{event.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="mt-3 text-right">
        <Link 
          to={event.link} 
          className="text-xs font-medium text-primary hover:underline inline-flex items-center"
        >
          {t("viewDetails")} &rarr;
        </Link>
      </div>
    </div>
  );
};
