
import { format, parseISO, subDays, addDays, isValid } from "date-fns";

// Create formatted date from a Date object
export const createFormattedDate = (date: Date): string => {
  try {
    if (!isValid(date)) {
      console.error("Invalid date object:", date);
      return format(new Date(), 'yyyy/MM/dd'); // Default to today if invalid
    }
    return format(date, 'yyyy/MM/dd');
  } catch (error) {
    console.error("Error formatting date:", error);
    return format(new Date(), 'yyyy/MM/dd'); // Default to today if error
  }
};

// Safely create a date from a string
export const safelyCreateDate = (dateStr: string): Date => {
  try {
    // Check if it's a yyyy/MM/dd format
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed months
      const day = parseInt(parts[2], 10);
      
      const result = new Date(year, month, day);
      if (isValid(result)) {
        return result;
      }
    }
    console.warn("Could not parse date string:", dateStr);
    return new Date(); // fallback to today
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date(); // fallback to today
  }
};

// Safe date formatting helper
export const safeFormatDate = (dateString: string, formatString: string): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return "Invalid date";
    }
    return format(date, formatString);
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return "Invalid date";
  }
};

// Generate an array of date strings for the timeline
export const generateTimelineDates = (centerDate: Date = new Date(), daysBack: number = 2, daysForward: number = 2): string[] => {
  const dates: string[] = [];
  
  for (let i = -daysBack; i <= daysForward; i++) {
    const date = i === 0 ? centerDate : (i < 0 ? subDays(centerDate, -i) : addDays(centerDate, i));
    dates.push(createFormattedDate(date));
  }
  
  return dates;
};

// Check if date is today
export const isDateToday = (dateStr: string): boolean => {
  return dateStr === format(new Date(), 'yyyy/MM/dd');
};

// Navigate to a new set of dates
export const getNavigatedDates = (currentDates: string[], direction: 'prev' | 'next'): string[] => {
  const newDates = [...currentDates];
  if (direction === 'prev') {
    const firstDate = safelyCreateDate(currentDates[0]);
    const newFirstDate = subDays(firstDate, currentDates.length);
    newDates.unshift(createFormattedDate(newFirstDate));
    newDates.pop();
  } else {
    const lastDate = safelyCreateDate(currentDates[currentDates.length - 1]);
    const newLastDate = addDays(lastDate, 1);
    newDates.push(createFormattedDate(newLastDate));
    newDates.shift();
  }
  return newDates;
};
