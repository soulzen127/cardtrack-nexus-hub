
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Shield, 
  User,
  Mail,
  Calendar,
  Key
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock users data
  const users = [
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors = {
    "Administrator": "bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20",
    "Operator": "bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20",
    "Manager": "bg-cardtrack-teal/10 text-cardtrack-teal border-cardtrack-teal/20",
    "Viewer": "bg-blue-100 text-blue-800 border-blue-200",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const handleResetPassword = (userId: number) => {
    toast.success(`Password reset link sent to user #${userId}`);
  };

  const handleLockUser = (userId: number) => {
    toast.success(`User #${userId} account has been locked`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or role..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={roleColors[user.role as keyof typeof roleColors]}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.status === "active" ? (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cardtrack-green mr-2" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground mr-2" />
                            Inactive
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {user.lastActive}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <User className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleLockUser(user.id)}>
                                <Lock className="h-4 w-4 mr-2" />
                                Lock Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Unlock className="h-4 w-4 mr-2" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
