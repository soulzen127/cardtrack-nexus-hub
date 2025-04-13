
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/use-i18n";

interface ValidityPeriodSectionProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

export function ValidityPeriodSection({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}: ValidityPeriodSectionProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("validityPeriod")}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">{t("startDate")}</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">{t("endDate")}</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
