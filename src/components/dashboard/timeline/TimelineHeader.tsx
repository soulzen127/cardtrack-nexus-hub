
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { TimelineControls } from "./TimelineControls";

interface TimelineHeaderProps {
  selectedEventType: 'all' | 'alert' | 'activity';
  onEventTypeChange: (type: 'all' | 'alert' | 'activity') => void;
  isMobileDevice: boolean;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  selectedEventType,
  onEventTypeChange,
  isMobileDevice
}) => {
  const { t } = useI18n();
  
  return (
    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      <div>
        <CardTitle>{t("eventTimeline")}</CardTitle>
        <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
      </div>
      
      <TimelineControls 
        selectedEventType={selectedEventType}
        onEventTypeChange={onEventTypeChange}
        isMobileDevice={isMobileDevice}
      />
    </CardHeader>
  );
};
