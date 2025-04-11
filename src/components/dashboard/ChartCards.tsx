
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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

export const CardActivityChart = () => {
  return (
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
  );
};

export const AlertsTypeChart = () => {
  return (
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
  );
};
