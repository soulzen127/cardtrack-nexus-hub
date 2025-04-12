
export interface ActiveAlert {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  location?: string;
  cardId?: string | null;
}

export interface ResolvedAlert {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  resolvedBy: string;
  resolvedAt: string;
  notes?: string;
}

export interface AlertConfiguration {
  id: number;
  name: string;
  description: string;
  channels: string[];
  enabled: boolean;
}

// Mock data for development purposes
export const mockActiveAlerts: ActiveAlert[] = [
  { 
    id: 1, 
    type: "Geofence Violation", 
    description: "Card #1234 entered restricted area", 
    timestamp: "10 minutes ago", 
    priority: "high", 
    location: "Research Lab, Taipei",
    cardId: "C001"
  },
  { 
    id: 2, 
    type: "Suspicious Movement", 
    description: "Unusual movement pattern detected for Card #5678", 
    timestamp: "25 minutes ago", 
    priority: "medium", 
    location: "Downtown Taipei",
    cardId: "C002"
  },
  { 
    id: 3, 
    type: "System Warning", 
    description: "Database storage reaching 85% capacity", 
    timestamp: "1 hour ago", 
    priority: "medium", 
    location: "System",
    cardId: null
  },
  { 
    id: 4, 
    type: "Connection Lost", 
    description: "Card #9012 not reporting for over 24 hours", 
    timestamp: "5 hours ago", 
    priority: "low", 
    location: "Last seen: Taichung",
    cardId: "C004"
  },
];

export const mockResolvedAlerts: ResolvedAlert[] = [
  { 
    id: 101, 
    type: "Geofence Violation", 
    description: "Card #3456 left authorized zone", 
    timestamp: "Yesterday, 15:30", 
    resolvedBy: "admin@example.com",
    resolvedAt: "Yesterday, 15:45", 
    notes: "Authorized exception for delivery"
  },
  { 
    id: 102, 
    type: "System Error", 
    description: "Failed database connection", 
    timestamp: "Yesterday, 08:22",
    resolvedBy: "system",
    resolvedAt: "Yesterday, 08:30", 
    notes: "Auto-recovered after system restart"
  },
  { 
    id: 103, 
    type: "Multiple Failed Logins", 
    description: "5 failed login attempts for user operator@example.com", 
    timestamp: "Apr 16, 2023, 14:12",
    resolvedBy: "admin@example.com",
    resolvedAt: "Apr 16, 2023, 14:30", 
    notes: "User contacted and password reset provided"
  },
];

export const mockAlertConfigurations: AlertConfiguration[] = [
  {
    id: 1,
    name: "Geofence Violations",
    description: "Alerts when cards enter or leave defined geographical areas",
    channels: ["Email", "In-app"],
    enabled: true
  },
  {
    id: 2,
    name: "Card Status Changes",
    description: "Alerts when card status changes (activated, suspended, lost)",
    channels: ["Email", "In-app", "SMS"],
    enabled: true
  },
  {
    id: 3,
    name: "System Warnings",
    description: "Technical alerts about system performance and issues",
    channels: ["Email"],
    enabled: true
  },
  {
    id: 4,
    name: "Suspicious Activities",
    description: "Potential security concerns or unusual usage patterns",
    channels: ["Email", "In-app", "SMS"],
    enabled: false
  }
];
