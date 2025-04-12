
import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  isOpen: boolean;
  logoutLabel: string;
}

export function SidebarFooter({ isOpen, logoutLabel }: SidebarFooterProps) {
  return (
    <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
      <Link 
        to="/login" 
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-sidebar-accent/50",
          !isOpen && "lg:justify-center"
        )}
        title={!isOpen ? logoutLabel : undefined}
      >
        <LogOut size={20} />
        {isOpen && <span className="ml-3">{logoutLabel}</span>}
      </Link>
    </div>
  );
}
