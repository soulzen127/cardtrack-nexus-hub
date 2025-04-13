
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useI18n } from "@/hooks/use-i18n";

interface AccessLevelSectionProps {
  accessLevel: string;
  setAccessLevel: (value: string) => void;
}

export function AccessLevelSection({
  accessLevel,
  setAccessLevel
}: AccessLevelSectionProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("additionalInfo")}</h3>
      <div className="space-y-2">
        <Label htmlFor="accessLevel">{t("accessLevel")}</Label>
        <Select value={accessLevel} onValueChange={setAccessLevel}>
          <SelectTrigger id="accessLevel">
            <SelectValue placeholder={t("accessLevel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">{t("low")}</SelectItem>
            <SelectItem value="medium">{t("medium")}</SelectItem>
            <SelectItem value="high">{t("high")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
