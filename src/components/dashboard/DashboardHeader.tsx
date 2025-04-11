
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface DashboardHeaderProps {
  onExportClick: () => void;
}

export const DashboardHeader = ({ onExportClick }: DashboardHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <h1 className="text-2xl font-bold tracking-tight">{t("dashboard")}</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onExportClick}>
          <Download className="h-4 w-4 mr-2" />
          {t("export")}
        </Button>
        <Button size="sm">
          {t("refreshData")}
        </Button>
      </div>
    </div>
  );
};
