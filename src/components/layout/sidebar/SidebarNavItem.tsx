
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isOpen: boolean;
}

export function SidebarNavItem({ path, icon, label, isActive, isOpen }: SidebarNavItemProps) {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
        !isOpen && "lg:justify-center"
      )}
      title={!isOpen ? label : undefined}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && <span className="ml-3">{label}</span>}
    </Link>
  );
}
