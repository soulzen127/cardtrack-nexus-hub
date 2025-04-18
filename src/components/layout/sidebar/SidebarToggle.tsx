
import React from "react";
import { cn } from "@/lib/utils";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/hooks/use-i18n";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  const { t } = useI18n();
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle} 
            className="lg:hidden"
          >
            <Menu size={20} />
            <span className="sr-only">{t("toggleSidebar")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t("toggleSidebar")}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden lg:flex"
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            <span className="sr-only">{t("toggleSidebar")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isOpen ? t("collapseSidebar") : t("expandSidebar")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
