
import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarNavItem } from "./SidebarNavItem";
import { LanguageSelector } from "@/components/language/LanguageSelector";

interface SidebarItem {
  name: string;
  translationKey: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarNavigationProps {
  mainItems: SidebarItem[];
  secondaryItems: SidebarItem[];
  isOpen: boolean;
  translations: Record<string, string>;
}

export function SidebarNavigation({ mainItems, secondaryItems, isOpen, translations }: SidebarNavigationProps) {
  const location = useLocation();
  
  return (
    <div className="p-4 space-y-6">
      <nav className="space-y-1">
        {mainItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            path={item.path}
            icon={item.icon}
            label={translations[item.translationKey as keyof typeof translations] || item.name}
            isActive={location.pathname === item.path}
            isOpen={isOpen}
          />
        ))}
      </nav>

      <div className="pt-4 border-t border-sidebar-border">
        <nav className="space-y-1">
          {secondaryItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={translations[item.translationKey as keyof typeof translations] || item.name}
              isActive={location.pathname === item.path}
              isOpen={isOpen}
            />
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
  );
}
