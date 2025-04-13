
import React from "react";
import { useI18n } from "@/hooks/use-i18n";

interface EmptyDateCellProps {
  dateIndex: number;
  cellWidth: number;
}

export const EmptyDateCell: React.FC<EmptyDateCellProps> = ({
  dateIndex,
  cellWidth
}) => {
  return (
    <div 
      key={`date-${dateIndex}-empty`} 
      style={{ width: `${cellWidth}rem`, minWidth: `${cellWidth}rem` }}
      className="h-full border-r last:border-r-0 opacity-50"
    ></div>
  );
};
