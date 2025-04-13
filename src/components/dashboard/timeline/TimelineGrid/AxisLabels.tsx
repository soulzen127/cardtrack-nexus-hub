
import React from "react";
import { AlertCircle, Activity } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface AxisLabelsProps {
  selectedEventType: 'all' | 'alert' | 'activity';
}

export const AxisLabels: React.FC<AxisLabelsProps> = ({
  selectedEventType
}) => {
  const { t } = useI18n();
  
  return (
    <div className="w-24 shrink-0 border-r bg-muted/30">
      <div className="h-12 flex items-center justify-center font-medium text-sm border-b">
        {t("timelineView")}
      </div>
      
      {/* Alert row header */}
      {(selectedEventType === 'all' || selectedEventType === 'alert') && (
        <div className="h-[140px] flex items-center px-2 border-b">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="font-medium text-sm">{t("alerts")}</span>
          </div>
        </div>
      )}
      
      {/* Activity row header */}
      {(selectedEventType === 'all' || selectedEventType === 'activity') && (
        <div className="h-[140px] flex items-center px-2">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-green-500 mr-2" />
            <span className="font-medium text-sm">{t("activities")}</span>
          </div>
        </div>
      )}
    </div>
  );
};
