
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/hooks/use-i18n";

interface UserFormProps {
  user?: any;
}

export function UserForm({ user }: UserFormProps) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">{t("username")}</Label>
          <Input id="username" defaultValue={user?.username || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" defaultValue={user?.email || ""} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input id="firstName" defaultValue={user?.firstName || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input id="lastName" defaultValue={user?.lastName || ""} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">{t("role")}</Label>
        <Select defaultValue={user?.role || "viewer"}>
          <SelectTrigger id="role">
            <SelectValue placeholder={t("selectRole")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">{t("admin")}</SelectItem>
            <SelectItem value="manager">{t("manager")}</SelectItem>
            <SelectItem value="operator">{t("operator")}</SelectItem>
            <SelectItem value="viewer">{t("viewer")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="department">{t("department")}</Label>
        <Select defaultValue={user?.department || ""}>
          <SelectTrigger id="department">
            <SelectValue placeholder={t("selectDepartment")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="it">{t("it")}</SelectItem>
            <SelectItem value="hr">{t("hr")}</SelectItem>
            <SelectItem value="finance">{t("finance")}</SelectItem>
            <SelectItem value="operations">{t("operations")}</SelectItem>
            <SelectItem value="security">{t("security")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        {user && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="resetPassword">{t("resetPassword")}</Label>
            <Checkbox id="resetPassword" />
          </div>
        )}
        
        {!user && (
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="active" defaultChecked={user ? user.status === "active" : true} />
        <Label htmlFor="active">{t("activeAccount")}</Label>
      </div>
    </div>
  );
}
