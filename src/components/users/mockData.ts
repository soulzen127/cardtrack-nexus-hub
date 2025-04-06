
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  created: string;
}

// Mock users data
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    status: "active",
    lastActive: "Today, 10:35 AM",
    created: "2023-01-15",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    role: "Operator",
    status: "active",
    lastActive: "Yesterday, 3:42 PM",
    created: "2023-02-20",
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    lastActive: "Today, 9:15 AM",
    created: "2023-03-05",
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "2023-04-10",
    created: "2023-04-01",
  },
  {
    id: 5,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Operator",
    status: "active",
    lastActive: "Today, 11:22 AM",
    created: "2023-04-12",
  },
];
