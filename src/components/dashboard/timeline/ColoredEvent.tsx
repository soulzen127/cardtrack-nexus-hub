
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type EventPriority = "low" | "medium" | "high";
export type EventType = "alert" | "activity" | "info" | "warning" | "success" | "error";

export interface ColoredEventProps {
  type: EventType;
  priority?: EventPriority;
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const getEventTypeColors = (type: EventType, priority?: EventPriority) => {
  switch (type) {
    case "alert":
      if (priority === "high") return { bg: "bg-red-100", text: "text-red-500" };
      if (priority === "medium") return { bg: "bg-amber-100", text: "text-amber-500" };
      return { bg: "bg-blue-100", text: "text-blue-500" };
    case "activity":
      return { bg: "bg-green-100", text: "text-green-500" };
    case "info":
      return { bg: "bg-blue-100", text: "text-blue-500" };
    case "warning":
      return { bg: "bg-amber-100", text: "text-amber-500" };
    case "success":
      return { bg: "bg-green-100", text: "text-green-500" };
    case "error":
      return { bg: "bg-red-100", text: "text-red-500" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-500" };
  }
};

export const ColoredEvent = ({
  type,
  priority,
  icon: Icon,
  className,
  size = "md"
}: ColoredEventProps) => {
  const { bg, text } = getEventTypeColors(type, priority);
  
  const sizeClasses = {
    sm: "p-1 rounded-full",
    md: "p-1.5 rounded-full",
    lg: "p-2 rounded-full"
  };
  
  const iconSizes = {
    sm: { width: 12, height: 12 },
    md: { width: 14, height: 14 },
    lg: { width: 16, height: 16 }
  };

  return (
    <div className={cn(bg, sizeClasses[size], className)}>
      <Icon className={text} width={iconSizes[size].width} height={iconSizes[size].height} />
    </div>
  );
};
