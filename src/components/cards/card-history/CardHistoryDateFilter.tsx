
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface CardHistoryDateFilterProps {
  timeFrame: string;
  setTimeFrame: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (value: Date | undefined) => void;
}

export function CardHistoryDateFilter({
  timeFrame,
  setTimeFrame,
  selectedDate,
  setSelectedDate,
}: CardHistoryDateFilterProps) {
  return (
    <div className="flex justify-between mb-4">
      <div className="space-y-1">
        <Label>Date Range</Label>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="custom">Custom date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {timeFrame === "custom" && (
        <div className="space-y-1">
          <Label>Select Date</Label>
          <div className="relative">
            <div className="border rounded-md p-2 flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
              <span>{selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}</span>
            </div>
            <div className="absolute mt-1 z-10 bg-white border rounded-md shadow-md">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
