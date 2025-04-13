
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/use-i18n";

interface HolderInfoSectionProps {
  holderName: string;
  setHolderName: (value: string) => void;
  holderEmail: string;
  setHolderEmail: (value: string) => void;
  holderPhone: string;
  setHolderPhone: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
}

export function HolderInfoSection({
  holderName,
  setHolderName,
  holderEmail,
  setHolderEmail,
  holderPhone,
  setHolderPhone,
  department,
  setDepartment
}: HolderInfoSectionProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t("holderInformation")}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="holderName">{t("holderName")}</Label>
          <Input
            id="holderName"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder={t("enterHolderName")}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="holderEmail">{t("holderEmail")}</Label>
          <Input
            id="holderEmail"
            type="email"
            value={holderEmail}
            onChange={(e) => setHolderEmail(e.target.value)}
            placeholder={t("enterHolderEmail")}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="holderPhone">{t("holderPhone")}</Label>
          <Input
            id="holderPhone"
            value={holderPhone}
            onChange={(e) => setHolderPhone(e.target.value)}
            placeholder={t("enterHolderPhone")}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">{t("department")}</Label>
          <Input
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder={t("enterDepartment")}
          />
        </div>
      </div>
    </div>
  );
}
