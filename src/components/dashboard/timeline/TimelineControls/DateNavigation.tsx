
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface DateNavigationProps {
  navigateDates: (direction: 'prev' | 'next') => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  navigateDates
}) => {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => navigateDates('prev')}
        className="px-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="ml-1">{t("previous")}</span>
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => navigateDates('next')}
        className="px-2"
      >
        <span className="mr-1">{t("next")}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
