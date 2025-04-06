
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as BarChartIcon, MapPin, CreditCard, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  // Mock data for dashboard
  const stats = [
    { title: t("totalActiveCards"), value: "1,254", trend: "up", percent: "12%", icon: <CreditCard className="h-5 w-5" /> },
    { title: t("trackedLocations"), value: "867", trend: "up", percent: "8%", icon: <MapPin className="h-5 w-5" /> },
    { title: t("activeAlerts"), value: "23", trend: "down", percent: "5%", icon: <AlertCircle className="h-5 w-5" /> },
    { title: t("reportsGenerated"), value: "156", trend: "up", percent: "18%", icon: <BarChartIcon className="h-5 w-5" /> },
  ];

  const recentAlerts = [
    { id: 1, type: t("geofenceAlert"), message: t("cardLeftZone"), time: "10 minutes ago", priority: "high" },
    { id: 2, type: t("systemAlert"), message: t("databaseBackup"), time: "1 hour ago", priority: "low" },
    { id: 3, type: t("cardLost"), message: t("cardLost"), time: "3 hours ago", priority: "medium" },
  ];

  const recentActivities = [
    { id: 1, action: t("cardIssued"), details: t("cardIssuedTo"), time: "30 minutes ago" },
    { id: 2, action: t("locationUpdated"), details: t("locationUpdated"), time: "45 minutes ago" },
    { id: 3, action: t("userLogin"), details: t("adminLogin"), time: "1 hour ago" },
    { id: 4, action: t("reportGenerated"), details: t("monthlyReport"), time: "2 hours ago" },
  ];

  // Chart data
  const cardActivityData = [
    { name: "Jan", active: 1000, inactive: 400 },
    { name: "Feb", active: 1200, inactive: 380 },
    { name: "Mar", active: 1100, inactive: 350 },
    { name: "Apr", active: 1400, inactive: 320 },
    { name: "May", active: 1300, inactive: 290 },
    { name: "Jun", active: 1500, inactive: 270 },
  ];

  const alertsByTypeData = [
    { name: "Geofence", value: 35 },
    { name: "System", value: 25 },
    { name: "Card", value: 20 },
    { name: "User", value: 15 },
    { name: "Other", value: 5 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("dashboard")}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              {t("export")}
            </Button>
            <Button size="sm">
              {t("refreshData")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <div className="flex items-center text-xs">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {stat.percent} {t("from")} {t("lastMonth")}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t("recentAlerts")}</CardTitle>
              <CardDescription>{t("latestAlertsNotifications")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      alert.priority === "high" ? "bg-red-100" :
                      alert.priority === "medium" ? "bg-amber-100" : "bg-blue-100"
                    }`}>
                      <AlertCircle className={`h-4 w-4 ${
                        alert.priority === "high" ? "text-red-500" :
                        alert.priority === "medium" ? "text-amber-500" : "text-blue-500"
                      }`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{alert.type}: {alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild size="sm">
                  <Link to="/alerts">{t("viewAllAlerts")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t("recentActivities")}</CardTitle>
              <CardDescription>{t("recentSystemUserActions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild size="sm">
                  <Link to="/records">{t("viewAllActivities")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Card Activity Trends</CardTitle>
              <CardDescription>Monthly active vs inactive cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cardActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#6366f1" 
                      activeDot={{ r: 8 }} 
                      name="Active Cards"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="inactive" 
                      stroke="#f43f5e" 
                      name="Inactive Cards"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Alerts by Type</CardTitle>
              <CardDescription>Distribution of alerts by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={alertsByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6366f1" name="Number of Alerts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>{t("locationOverview")}</CardTitle>
            <CardDescription>{t("geographicDistribution")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] bg-muted rounded-md flex items-center justify-center border border-dashed">
              <div className="text-center space-y-2">
                <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">{t("mapViewAvailable")}</p>
                <Button asChild size="sm">
                  <Link to="/tracking">{t("goToTracking")}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
