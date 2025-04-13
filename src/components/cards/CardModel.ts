
export interface Card {
  id: string;
  cardNumber: string;
  status: string;
  holder: string;
  issueDate: string;
  lastSeen: string;
  location: string;
}

// Mock card data
export const initialCards = [
  { id: "C001", cardNumber: "1234-5678-9012-3456", status: "active", holder: "John Smith", issueDate: "2023-01-15", lastSeen: "5 minutes ago", location: "Taipei, Taiwan" },
  { id: "C002", cardNumber: "2345-6789-0123-4567", status: "active", holder: "Jane Doe", issueDate: "2023-02-20", lastSeen: "1 hour ago", location: "Kaohsiung, Taiwan" },
  { id: "C003", cardNumber: "3456-7890-1234-5678", status: "suspended", holder: "Bob Johnson", issueDate: "2023-03-10", lastSeen: "2 days ago", location: "Taichung, Taiwan" },
  { id: "C004", cardNumber: "4567-8901-2345-6789", status: "lost", holder: "Alice Williams", issueDate: "2023-04-05", lastSeen: "7 days ago", location: "Hsinchu, Taiwan" },
  { id: "C005", cardNumber: "5678-9012-3456-7890", status: "active", holder: "Charlie Brown", issueDate: "2023-05-12", lastSeen: "30 minutes ago", location: "Tainan, Taiwan" },
];
