
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, MapPin, AlertCircle, BarChart as BarChartIcon, TrendingUp, TrendingDown } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface StatCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  percent: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, trend, percent, icon }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
          <div className="flex items-center text-xs">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
            )}
            <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
              {percent} {" from last month"}
            </span>
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const { t } = useI18n();

  const stats = [
    { title: t("totalActiveCards"), value: "1,254", trend: "up" as const, percent: "12%", icon: <CreditCard className="h-5 w-5" /> },
    { title: t("trackedLocations"), value: "867", trend: "up" as const, percent: "8%", icon: <MapPin className="h-5 w-5" /> },
    { title: t("activeAlerts"), value: "23", trend: "down" as const, percent: "5%", icon: <AlertCircle className="h-5 w-5" /> },
    { title: t("reportsGenerated"), value: "156", trend: "up" as const, percent: "18%", icon: <BarChartIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
