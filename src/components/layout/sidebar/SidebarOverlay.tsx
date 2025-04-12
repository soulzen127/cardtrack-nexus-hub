
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarOverlayProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarOverlay({ isOpen, onToggle }: SidebarOverlayProps) {
  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} 
      onClick={onToggle} 
    />
  );
}
