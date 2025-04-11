
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import {
  LayoutDashboard,
  CreditCard,
  MapPin,
  FileText,
  Bell,
  Users,
  Settings,
  User,
} from "lucide-react";

export default function PortalPage() {
  const { t } = useI18n();

  const menuItems = [
    {
      title: t("dashboard"),
      icon: <LayoutDashboard className="h-12 w-12 mb-4 text-primary" />,
      description: t("dashboardDescription"),
      path: "/dashboard",
    },
    {
      title: t("cardManagement"),
      icon: <CreditCard className="h-12 w-12 mb-4 text-primary" />,
      description: t("cardManagementDescription"),
      path: "/cards",
    },
    {
      title: t("locationTracking"),
      icon: <MapPin className="h-12 w-12 mb-4 text-primary" />,
      description: t("locationTrackingDescription"),
      path: "/tracking",
    },
    {
      title: t("records"),
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      description: t("recordsDescription"),
      path: "/records",
    },
    {
      title: t("alerts"),
      icon: <Bell className="h-12 w-12 mb-4 text-primary" />,
      description: t("alertsDescription"),
      path: "/alerts",
    },
    {
      title: t("reports"),
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      description: t("reportsDescription"),
      path: "/reports",
    },
    {
      title: t("userManagement"),
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      description: t("userManagementDescription"),
      path: "/users",
    },
    {
      title: t("settings"),
      icon: <Settings className="h-12 w-12 mb-4 text-primary" />,
      description: t("settingsDescription"),
      path: "/settings",
    },
    {
      title: t("profile"),
      icon: <User className="h-12 w-12 mb-4 text-primary" />,
      description: t("profileDescription"),
      path: "/profile",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("portal")}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link to={item.path}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
