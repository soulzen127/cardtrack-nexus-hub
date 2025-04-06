
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/hooks/use-i18n";

interface AlertsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function AlertsSearchBar({ searchTerm, onSearchChange }: AlertsSearchBarProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchAlerts")}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("priority")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("allPriorities")}</SelectItem>
          <SelectItem value="high">{t("high")}</SelectItem>
          <SelectItem value="medium">{t("medium")}</SelectItem>
          <SelectItem value="low">{t("low")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
