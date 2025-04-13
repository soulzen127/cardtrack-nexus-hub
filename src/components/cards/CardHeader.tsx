
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface CardHeaderProps {
  onRegisterCard: () => void;
  onImport: () => void;
  onExport: () => void;
}

export function CardHeader({ onRegisterCard, onImport, onExport }: CardHeaderProps) {
  const { t } = useI18n();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <h1 className="text-2xl font-bold tracking-tight">{t("cardManagement")}</h1>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onRegisterCard}>
          <Plus className="h-4 w-4 mr-2" />
          {t("registerCard")}
        </Button>
        <Button variant="outline" size="sm" onClick={onImport}>
          <Upload className="h-4 w-4 mr-2" />
          {t("import")}
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          {t("export")}
        </Button>
      </div>
    </div>
  );
}
