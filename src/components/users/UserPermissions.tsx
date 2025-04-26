
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/hooks/use-i18n";
import { Separator } from "@/components/ui/separator";

interface UserPermissionsProps {
  user?: any;
}

export function UserPermissions({ user }: UserPermissionsProps) {
  const { t } = useI18n();
  
  const permissionGroups = [
    {
      name: "cards",
      title: t("cards"),
      permissions: [
        { id: "cards.view", label: t("viewCards") },
        { id: "cards.create", label: t("createCards") },
        { id: "cards.edit", label: t("editCards") },
        { id: "cards.delete", label: t("deleteCards") },
      ]
    },
    {
      name: "tracking",
      title: t("locationTracking"),
      permissions: [
        { id: "tracking.view", label: t("viewTracking") },
        { id: "tracking.export", label: t("exportTrackingData") },
      ]
    },
    {
      name: "users",
      title: t("userManagement"),
      permissions: [
        { id: "users.view", label: t("viewUsers") },
        { id: "users.create", label: t("createUsers") },
        { id: "users.edit", label: t("editUsers") },
        { id: "users.delete", label: t("deleteUsers") },
      ]
    },
    {
      name: "settings",
      title: t("settings"),
      permissions: [
        { id: "settings.view", label: t("viewSettings") },
        { id: "settings.edit", label: t("editSettings") },
      ]
    },
    {
      name: "reports",
      title: t("reports"),
      permissions: [
        { id: "reports.view", label: t("viewReports") },
        { id: "reports.create", label: t("createReports") },
        { id: "reports.export", label: t("exportReports") },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{t("manageUserPermissions")}</p>
      
      {permissionGroups.map((group) => (
        <div key={group.name} className="space-y-3">
          <h3 className="text-md font-medium">{group.title}</h3>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox id={permission.id} />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
