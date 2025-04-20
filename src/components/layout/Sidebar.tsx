
import React, { useState } from "react";
import { 
  Home, 
  CreditCard, 
  Map, 
  Search, 
  BarChart, 
  Bell, 
  Settings, 
  Users,
  LayoutGrid,
  MapPin,
  AlertTriangle,
  Route
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { SidebarToggle } from "./sidebar/SidebarToggle";
import { SidebarOverlay } from "./sidebar/SidebarOverlay";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface SidebarItem {
  name: string;
  translationKey: string;
  path: string;
  icon: React.ReactNode;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  // Company logo state
  const [companyLogo, setCompanyLogo] = useState<string | null>(localStorage.getItem('companyLogo'));

  const mainItems: SidebarItem[] = [
    { name: "System Function Portal", translationKey: "systemFunctionPortal", path: "/portal", icon: <LayoutGrid size={20} /> },
    { name: "Management Overview", translationKey: "managementOverview", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Cards", translationKey: "cards", path: "/cards", icon: <CreditCard size={20} /> },
    { name: "Tracking", translationKey: "tracking", path: "/tracking", icon: <Map size={20} /> },
    { name: "Event Reporting", translationKey: "eventReporting", path: "/events", icon: <Bell size={20} /> },
    { name: "Records", translationKey: "records", path: "/records", icon: <Search size={20} /> },
    { name: "Reports", translationKey: "reportsManagement", path: "/reports", icon: <BarChart size={20} /> },
    { name: "Alerts", translationKey: "alerts", path: "/alerts", icon: <AlertTriangle size={20} /> },
  ];

  const secondaryItems: SidebarItem[] = [
    { name: "Users", translationKey: "users", path: "/users", icon: <Users size={20} /> },
    { name: "Settings", translationKey: "settings", path: "/settings", icon: <Settings size={20} /> }
  ];
  
  // Function to handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCompanyLogo(result);
          localStorage.setItem('companyLogo', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onToggle={onToggle} />
      
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"
      )}>
        <SidebarLogo 
          isOpen={isOpen} 
          companyLogo={companyLogo} 
          onLogoUpload={handleLogoUpload} 
        />
        
        <SidebarNavigation 
          mainItems={mainItems}
          secondaryItems={secondaryItems}
          isOpen={isOpen}
          t={t}
        />
        
        <SidebarFooter isOpen={isOpen} logoutLabel={t("logout")} />
      </aside>
    </>
  );
}
