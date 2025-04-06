
import React from "react";
import { Mail, Calendar, User, Shield, Key, Lock, Unlock, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  created: string;
}

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
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
          {users.map((user) => (
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
  );
};
