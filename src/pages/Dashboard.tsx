
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import ExportDialog from "@/components/dashboard/ExportDialog";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { CardActivityChart, AlertsTypeChart } from "@/components/dashboard/ChartCards";
import { LocationOverview } from "@/components/dashboard/LocationOverview";

export default function Dashboard() {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHeader onExportClick={() => setIsExportDialogOpen(true)} />
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentAlerts />
          <RecentActivities />
        </div>
        
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
