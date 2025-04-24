
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

interface SidebarFooterProps {
  isOpen: boolean;
  logoutLabel: string;
}

export function SidebarFooter({ isOpen, logoutLabel }: SidebarFooterProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleLogout = () => {
    // Clear all authentication related data
    localStorage.removeItem("authenticated");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("loginProvider");

    // Show success message
    toast.success(t("logoutSuccess"));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
      <button 
        onClick={handleLogout}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-sidebar-accent/50 w-full",
          !isOpen && "lg:justify-center"
        )}
        title={!isOpen ? logoutLabel : undefined}
      >
        <LogOut size={20} />
        {isOpen && <span className="ml-3">{logoutLabel}</span>}
      </button>
    </div>
  );
}
