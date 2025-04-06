
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { UserList } from "@/components/users/UserList";
import { AddUserButton } from "@/components/users/AddUserButton";
import { mockUsers } from "@/components/users/mockData";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <AddUserButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserList 
              users={mockUsers} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
