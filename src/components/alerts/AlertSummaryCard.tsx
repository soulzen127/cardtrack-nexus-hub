
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface AlertSummaryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  iconClass?: string;
  children?: React.ReactNode;
}

export function AlertSummaryCard({ icon, title, count, iconClass, children }: AlertSummaryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <span className={`h-5 w-5 mr-2 ${iconClass}`}>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {children}
      </CardContent>
    </Card>
  );
}
