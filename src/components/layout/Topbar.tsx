import React, { useState } from "react";
import { Bell, Moon, Sun, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { useTheme } from "@/hooks/use-theme";
import { SidebarToggle } from "./sidebar/SidebarToggle";

interface TopbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Topbar({ onToggleSidebar, sidebarOpen }: TopbarProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarToggle isOpen={sidebarOpen} onToggle={onToggleSidebar} />
        
        {/* Return to Portal button - only show if not on the portal page */}
        {location.pathname !== "/portal" && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={() => navigate("/portal")}
            aria-label="Return to Portal"
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
        
        <div className="ml-auto flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector minimal />
          
          {/* Theme Switcher */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("toggleTheme")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-cardtrack-red" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t("alerts")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{t("geofenceAlert")}</p>
                    <p className="text-xs text-muted-foreground">{t("cardLeftZone")}</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Card Status Changed</p>
                    <p className="text-xs text-muted-foreground">Card #5678 was suspended</p>
                    <p className="text-xs text-muted-foreground">30 minutes ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/alerts" className="w-full text-center cursor-pointer">
                  {t("viewAllAlerts")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsAlertSettingsOpen(true)}>
                {t("alertSettings")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">{t("settings")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Alert Settings Dialog */}
      <Dialog open={isAlertSettingsOpen} onOpenChange={setIsAlertSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("alertSettings")}</DialogTitle>
            <DialogDescription>
              {t("configureAlertPreferences")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("notificationChannels")}</h3>
              <div className="flex items-start space-x-2">
                <Checkbox id="email-alerts-top" />
                <div className="grid gap-1.5">
                  <Label htmlFor="email-alerts-top">{t("emailAlerts")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("receiveAlertsViaEmail")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="app-alerts-top" defaultChecked />
                <div className="grid gap-1.5">
                  <Label htmlFor="app-alerts-top">{t("inAppAlerts")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("showAlertsInApplication")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("alertFrequency")}</h3>
              <Select defaultValue="realtime">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectFrequency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">{t("realtime")}</SelectItem>
                  <SelectItem value="hourly">{t("hourly")}</SelectItem>
                  <SelectItem value="daily">{t("daily")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsAlertSettingsOpen(false)}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
