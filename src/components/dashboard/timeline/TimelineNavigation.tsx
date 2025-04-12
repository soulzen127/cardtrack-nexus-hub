
import React from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ColoredEvent } from "./ColoredEvent";

interface TimelineNavigationProps {
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const TimelineNavigation: React.FC<TimelineNavigationProps> = ({
  onNavigate
}) => {
  const { t } = useI18n();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <ColoredEvent 
          type="info" 
          icon={Calendar} 
          size="sm" 
          className="mr-2"
        />
        <h3 className="text-sm font-medium">{t("eventTimelineDate")}</h3>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onNavigate('prev')} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => onNavigate('next')} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
