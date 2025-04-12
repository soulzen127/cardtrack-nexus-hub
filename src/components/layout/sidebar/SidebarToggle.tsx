
import React from "react";
import { cn } from "@/lib/utils";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <>
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
    </>
  );
}
