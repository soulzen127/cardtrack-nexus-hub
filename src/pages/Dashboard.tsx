
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, MapPin, CreditCard, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for dashboard
  const stats = [
    { title: "Total Active Cards", value: "1,254", trend: "up", percent: "12%", icon: <CreditCard className="h-5 w-5" /> },
    { title: "Tracked Locations", value: "867", trend: "up", percent: "8%", icon: <MapPin className="h-5 w-5" /> },
    { title: "Active Alerts", value: "23", trend: "down", percent: "5%", icon: <AlertCircle className="h-5 w-5" /> },
    { title: "Reports Generated", value: "156", trend: "up", percent: "18%", icon: <BarChart className="h-5 w-5" /> },
  ];

  const recentAlerts = [
    { id: 1, type: "Geofence", message: "Card #5643 left authorized zone", time: "10 minutes ago", priority: "high" },
    { id: 2, type: "System", message: "Database backup completed", time: "1 hour ago", priority: "low" },
    { id: 3, type: "Card", message: "Card #8921 reported lost", time: "3 hours ago", priority: "medium" },
  ];

  const recentActivities = [
    { id: 1, action: "Card Issued", details: "Card #3389 was issued to John Smith", time: "30 minutes ago" },
    { id: 2, action: "Card Location Updated", details: "Card #5432 location updated", time: "45 minutes ago" },
    { id: 3, action: "User Login", details: "Admin user logged in from 192.168.1.1", time: "1 hour ago" },
    { id: 4, action: "Report Generated", details: "Monthly activity report was generated", time: "2 hours ago" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">
              Refresh Data
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
                        {stat.percent} from last month
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest system alerts and notifications</CardDescription>
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
                  <Link to="/alerts">View All Alerts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Recent system and user actions</CardDescription>
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
                  <Link to="/records">View All Activities</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Location Overview</CardTitle>
            <CardDescription>Geographic distribution of active cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] bg-muted rounded-md flex items-center justify-center border border-dashed">
              <div className="text-center space-y-2">
                <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Map view will be available once connected to Mapbox or Google Maps API</p>
                <Button asChild size="sm">
                  <Link to="/tracking">Go to Tracking</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
