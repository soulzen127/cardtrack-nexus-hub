
import React, { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import { useAccessControl } from "@/hooks/use-access-control";
import {
  LayoutDashboard,
  CreditCard,
  MapPin,
  FileText,
  Bell,
  Users,
  Settings,
  User,
  File,
} from "lucide-react";

export default function PortalPage() {
  const { t } = useI18n();
  const { hasAccess, currentUserRole } = useAccessControl();
  const navigate = useNavigate();

  // Check system initialization status
  useEffect(() => {
    const isSystemInitialized = localStorage.getItem("system_initialized") === "true";
    if (!isSystemInitialized) {
      console.log("PortalPage: System not initialized, setting current user as admin");
      localStorage.setItem("user_role", "admin");
    }
  }, []);

  // Define menu items with their access requirements
  const menuItems = [
    {
      title: t("managementOverview"),
      icon: <LayoutDashboard className="h-12 w-12 mb-4 text-primary" />,
      description: t("dashboardDescription"),
      path: "/dashboard",
      requiredRole: "viewer" // All users can access dashboard
    },
    {
      title: t("cards"),
      icon: <CreditCard className="h-12 w-12 mb-4 text-primary" />,
      description: t("cardManagementDescription"),
      path: "/cards",
      requiredRole: "viewer" // All users can view cards
    },
    {
      title: t("tracking"),
      icon: <MapPin className="h-12 w-12 mb-4 text-primary" />,
      description: t("locationTrackingDescription"),
      path: "/tracking",
      requiredRole: "viewer" // All users can access tracking
    },
    {
      title: t("records"),
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      description: t("recordsDescription"),
      path: "/records",
      requiredRole: "viewer" // All users can view records
    },
    {
      title: t("reports"),
      icon: <File className="h-12 w-12 mb-4 text-primary" />,
      description: t("reportsDescription"),
      path: "/reports",
      requiredRole: "operator" // Operators and above can access reports
    },
    {
      title: t("alerts"),
      icon: <Bell className="h-12 w-12 mb-4 text-primary" />,
      description: t("alertsDescription"),
      path: "/alerts",
      requiredRole: "operator" // Operators and above can access alerts
    },
    {
      title: t("users"),
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      description: t("userManagementDescription"),
      path: "/users",
      requiredRole: "admin" // Only admins can manage users
    },
    {
      title: t("settings"),
      icon: <Settings className="h-12 w-12 mb-4 text-primary" />,
      description: t("settingsDescription"),
      path: "/settings",
      requiredRole: "viewer" // All users can access settings
    },
    {
      title: t("profile"),
      icon: <User className="h-12 w-12 mb-4 text-primary" />,
      description: t("profileDescription"),
      path: "/profile",
      requiredRole: "viewer" // All users can access their profile
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    const userRole = localStorage.getItem("user_role") || "viewer";
    if (item.requiredRole === "admin") return userRole === "admin";
    if (item.requiredRole === "operator") return ["operator", "manager", "admin"].includes(userRole);
    return true; // All users can access 'viewer' level items
  });

  // Handler for card click
  const handleCardClick = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("systemFunctionPortal")}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCardClick(item.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
