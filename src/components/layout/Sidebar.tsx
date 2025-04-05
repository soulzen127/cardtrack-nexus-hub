
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const mainItems: SidebarItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Cards", path: "/cards", icon: <CreditCard size={20} /> },
    { name: "Tracking", path: "/tracking", icon: <Map size={20} /> },
    { name: "Records", path: "/records", icon: <Search size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart size={20} /> },
    { name: "Alerts", path: "/alerts", icon: <Bell size={20} /> }
  ];

  const secondaryItems: SidebarItem[] = [
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> }
  ];

  return (
    <>
      <div className={cn(
        "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={onToggle} />
      
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">CardTrack</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
            <Menu size={20} />
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
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.name}</span>
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
                      : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
          <Link to="/login" className="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-sidebar-accent/50">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
