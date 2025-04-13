
import React from "react";
import { useI18n } from "@/hooks/use-i18n";

interface TimelineHeaderProps {
  dates: string[];
  visibleDates: boolean[];
  toggleShow: (dateIndex: number) => void;
  cellWidth: number;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  dates,
  visibleDates,
  toggleShow,
  cellWidth
}) => {
  const { t } = useI18n();
  
  return (
    <div className="flex h-12 border-b sticky top-0 bg-background z-10">
      {dates.map((date, index) => (
        <div 
          key={`date-${index}`}
          style={{ width: `${cellWidth}rem`, minWidth: `${cellWidth}rem` }}
          className={`flex flex-col items-center justify-center border-r last:border-r-0 px-2 ${!visibleDates[index] ? 'opacity-50' : ''}`}
        >
          <div className="font-medium text-sm">{date}</div>
          <button 
            className="text-xs text-muted-foreground"
            onClick={() => toggleShow(index)}
          >
            {t("show")}
          </button>
        </div>
      ))}
    </div>
  );
};
