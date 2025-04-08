
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/use-i18n";

export const ThemeSettings = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t("themeSettings")}</h3>
      <Separator />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="theme">{t("theme")}</Label>
            <Select defaultValue="light">
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("light")}</SelectItem>
                <SelectItem value="dark">{t("dark")}</SelectItem>
                <SelectItem value="system">{t("system")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryColor">{t("primaryColor")}</Label>
            <div className="flex space-x-2">
              <Input id="primaryColor" defaultValue="#1E6CB4" />
              <div className="w-10 h-10 rounded-md bg-cardtrack-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
