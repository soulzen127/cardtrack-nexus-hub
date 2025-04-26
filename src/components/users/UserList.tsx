
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserTable } from "./UserTable";
import { useI18n } from "@/hooks/use-i18n";
import { Search } from "lucide-react";

interface UserListProps {
  users: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEditUser: (user: any) => void;
}

export function UserList({ users, searchTerm, setSearchTerm, onEditUser }: UserListProps) {
  const { t } = useI18n();
  
  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchFields = [
      user.username,
      user.email,
      user.firstName,
      user.lastName,
      user.role,
      user.department
    ].map(field => field?.toLowerCase() || '');
    
    return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder={t("searchUsers")}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <UserTable 
          users={filteredUsers} 
          onEditUser={onEditUser}
        />
      </div>
    </div>
  );
}
