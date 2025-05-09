
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import ExportDialog from "@/components/dashboard/ExportDialog";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CardActivityChart, AlertsTypeChart } from "@/components/dashboard/ChartCards";
import { LocationOverview } from "@/components/dashboard/LocationOverview";
import { EventTimeline } from "@/components/dashboard/EventTimeline";
import { TimelineEvent } from "@/components/tracking/map/mockData";
import { useI18n } from "@/hooks/use-i18n";

export default function Dashboard() {
  const { t } = useI18n();
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(null);

  const handleTimelineEventSelect = (event: TimelineEvent) => {
    setSelectedTimelineEvent(event);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHeader onExportClick={() => setIsExportDialogOpen(true)} />
        
        <DashboardStats />
        
        <EventTimeline onEventSelect={handleTimelineEventSelect} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardActivityChart />
          <AlertsTypeChart />
        </div>
        
        <LocationOverview />
      </div>

      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
      />
    </MainLayout>
  );
}
