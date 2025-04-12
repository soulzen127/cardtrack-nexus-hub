
import React from "react";
import { CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { TimelineControls } from "./TimelineControls";

interface TimelineHeaderProps {
  selectedEventType: 'all' | 'alert' | 'activity';
  onEventTypeChange: (type: 'all' | 'alert' | 'activity') => void;
  isMobileDevice: boolean;
  onZoomAdjust: (direction: 'in' | 'out') => void;
  zoomLevel: number;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  selectedEventType,
  onEventTypeChange,
  isMobileDevice,
  onZoomAdjust,
  zoomLevel
}) => {
  const { t } = useI18n();

  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>{t("eventTimeline")}</CardTitle>
          <CardDescription>{t("browseRecentAlertsAndActivities")}</CardDescription>
        </div>
        <TimelineControls
          selectedEventType={selectedEventType}
          onEventTypeChange={onEventTypeChange}
          isMobileDevice={isMobileDevice}
          onZoomAdjust={onZoomAdjust}
          zoomLevel={zoomLevel}
        />
      </div>
    </CardHeader>
  );
};
