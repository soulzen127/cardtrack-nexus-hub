
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  const [viewProfileUser, setViewProfileUser] = useState<User | null>(null);
  const [editPermissionsUser, setEditPermissionsUser] = useState<User | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

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

  const handleViewProfile = (user: User) => {
    setViewProfileUser(user);
  };

  const handleEditPermissions = (user: User) => {
    setEditPermissionsUser(user);
    setHasEditPermission(user.role === "Administrator" || user.role === "Manager");
  };

  const handleResetPassword = (user: User) => {
    setResetPasswordUser(user);
    setNewPassword("");
  };

  const handleLockAccount = (userId: number) => {
    setIsAccountLocked(true);
    toast.success(`User #${userId} account has been locked`);
  };

  const handleUnlockAccount = (userId: number) => {
    setIsAccountLocked(false);
    toast.success(`User #${userId} account has been unlocked`);
  };

  const handleSavePassword = () => {
    if (!newPassword.trim()) {
      toast.error("Please enter a valid password");
      return;
    }
    
    toast.success(`Password has been reset for ${resetPasswordUser?.name}`);
    setResetPasswordUser(null);
  };

  const handleSavePermissions = () => {
    toast.success(`Permissions updated for ${editPermissionsUser?.name}`);
    setEditPermissionsUser(null);
  };

  return (
    <>
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
                      <DropdownMenuItem onSelect={() => handleViewProfile(user)}>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleEditPermissions(user)}>
                        <Shield className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => handleResetPassword(user)}>
                        <Key className="h-4 w-4 mr-2" />
                        Reset Password
                      </DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem onSelect={() => handleLockAccount(user.id)}>
                          <Lock className="h-4 w-4 mr-2" />
                          Lock Account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onSelect={() => handleUnlockAccount(user.id)}>
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

      {/* Profile Dialog */}
      <Dialog open={!!viewProfileUser} onOpenChange={() => setViewProfileUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Detailed information about {viewProfileUser?.name}
            </DialogDescription>
          </DialogHeader>
          {viewProfileUser && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">{getInitials(viewProfileUser.name)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <div className="col-span-3">{viewProfileUser.name}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <div className="col-span-3">{viewProfileUser.email}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Role</Label>
                <div className="col-span-3">
                  <Badge variant="outline" className={roleColors[viewProfileUser.role as keyof typeof roleColors]}>
                    {viewProfileUser.role}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  {viewProfileUser.status === "active" ? (
                    <span className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cardtrack-green mr-2" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground mr-2" />
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Last Active</Label>
                <div className="col-span-3">{viewProfileUser.lastActive}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Account Created</Label>
                <div className="col-span-3">{viewProfileUser.created}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setViewProfileUser(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Dialog */}
      <Dialog open={!!editPermissionsUser} onOpenChange={() => setEditPermissionsUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>
              Update permissions for {editPermissionsUser?.name}
            </DialogDescription>
          </DialogHeader>
          {editPermissionsUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-permission">Edit Permission</Label>
                <Switch 
                  id="edit-permission" 
                  checked={hasEditPermission}
                  onCheckedChange={setHasEditPermission}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Current status: {hasEditPermission ? 'Yes' : 'No'}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditPermissionsUser(null)}>Cancel</Button>
            <Button type="button" onClick={handleSavePermissions}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetPasswordUser} onOpenChange={() => setResetPasswordUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter a new password for {resetPasswordUser?.name}
            </DialogDescription>
          </DialogHeader>
          {resetPasswordUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setResetPasswordUser(null)}>Cancel</Button>
            <Button type="button" onClick={handleSavePassword}>Reset Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
