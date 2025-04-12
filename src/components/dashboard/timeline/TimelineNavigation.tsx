
import React from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface TimelineNavigationProps {
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const TimelineNavigation: React.FC<TimelineNavigationProps> = ({
  onNavigate
}) => {
  const { t } = useI18n();

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium">{t("eventTimelineDate")}</h3>
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
