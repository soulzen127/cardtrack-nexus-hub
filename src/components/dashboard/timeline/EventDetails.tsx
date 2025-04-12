
import React from "react";
import { TimelineEvent } from "../../tracking/map/mockData";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import { AlertCircle, Activity, Clock, Calendar, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { safeFormatDate } from "@/utils/dateUtils";
import { ColoredEvent } from "./ColoredEvent";

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
    
    switch(event.type) {
      case 'activity':
        return 'bg-green-50 dark:bg-green-950/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-950/20';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/20';
      case 'success':
        return 'bg-green-50 dark:bg-green-950/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-950/20';
      default:
        return 'bg-gray-50 dark:bg-gray-950/20';
    }
  };
  
  const getBadgeColor = () => {
    if (isAlert) {
      if (event.priority === 'high') return 'bg-red-100 text-red-800';
      if (event.priority === 'medium') return 'bg-amber-100 text-amber-800';
      return 'bg-blue-100 text-blue-800';
    }
    
    switch(event.type) {
      case 'activity':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get the appropriate icon based on event type
  const getEventIcon = () => {
    if (isAlert) {
      return AlertCircle;
    } else if (event.type === 'activity') {
      return Activity;
    } else if (event.type === 'info') {
      return Info;
    } else if (event.type === 'warning') {
      return AlertTriangle;
    } else if (event.type === 'success') {
      return CheckCircle;
    } else if (event.type === 'error') {
      return XCircle;
    }
    return Activity;
  };
  
  return (
    <div className={`p-4 rounded-md ${getBgColor()}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <ColoredEvent 
            type={event.type} 
            priority={event.priority} 
            icon={getEventIcon()} 
            size="md"
          />
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
