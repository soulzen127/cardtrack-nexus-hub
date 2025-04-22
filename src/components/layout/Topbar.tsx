
import React from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { useI18n } from "@/hooks/use-i18n";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const { t } = useI18n();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">{t("toggleSidebar")}</span>
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <LanguageSelector minimal={false} />
        <Button variant="ghost" size="icon" className="mr-2">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
