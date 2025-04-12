
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CreditCard, 
  Map, 
  Search, 
  BarChart, 
  Bell, 
  Settings, 
  Users, 
  Menu,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Languages,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const location = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  // Company logo state
  const [companyLogo, setCompanyLogo] = React.useState<string | null>(localStorage.getItem('companyLogo'));

  const mainItems: SidebarItem[] = [
    { name: "System Function Portal", translationKey: "systemFunctionPortal", path: "/portal", icon: <LayoutGrid size={20} /> },
    { name: "Management Overview", translationKey: "managementOverview", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Cards", translationKey: "cards", path: "/cards", icon: <CreditCard size={20} /> },
    { name: "Tracking", translationKey: "tracking", path: "/tracking", icon: <Map size={20} /> },
    { name: "Records", translationKey: "records", path: "/records", icon: <Search size={20} /> },
    { name: "Reports", translationKey: "reports", path: "/reports", icon: <BarChart size={20} /> },
    { name: "Alerts", translationKey: "alerts", path: "/alerts", icon: <Bell size={20} /> },
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
      <div className={cn(
        "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={onToggle} />
      
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"
      )}>
        <div className="flex flex-col items-center justify-between h-28 px-4 border-b border-sidebar-border">
          {companyLogo && (
            <div className={cn(
              "w-full flex justify-center my-2",
              !isOpen && "lg:hidden"
            )}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={companyLogo} alt="Company Logo" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
            </div>
          )}
          
          <Link to="/dashboard" className={cn(
            "flex items-center space-x-2",
            !isOpen && "lg:justify-center lg:w-full"
          )}>
            {isOpen ? (
              <>
                <span className="text-xl font-bold tracking-tight">CardTrack</span>
                <label htmlFor="logo-upload" className="cursor-pointer ml-2">
                  <Settings size={14} className="text-sidebar-foreground/60 hover:text-sidebar-foreground" />
                  <input 
                    id="logo-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                  />
                </label>
              </>
            ) : (
              <span className="lg:text-xl lg:font-bold">CT</span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle} 
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden lg:flex"
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </Button>
        </div>
        
        <div className="p-4 space-y-6">
          <nav className="space-y-1">
            {mainItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                  !isOpen && "lg:justify-center"
                )}
                title={!isOpen ? t(item.translationKey as any) : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="ml-3">{t(item.translationKey as any)}</span>}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-sidebar-border">
            <nav className="space-y-1">
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    !isOpen && "lg:justify-center"
                  )}
                  title={!isOpen ? t(item.translationKey as any) : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span className="ml-3">{t(item.translationKey as any)}</span>}
                </Link>
              ))}
              
              {isOpen ? (
                <div className="px-3 py-2">
                  <LanguageSelector />
                </div>
              ) : (
                <div className="flex justify-center py-2">
                  <LanguageSelector minimal />
                </div>
              )}
            </nav>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
          <Link 
            to="/login" 
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-sidebar-accent/50",
              !isOpen && "lg:justify-center"
            )}
            title={!isOpen ? t("logout") : undefined}
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-3">{t("logout")}</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
