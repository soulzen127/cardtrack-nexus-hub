
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "David Chen",
    email: "david.chen@example.com",
    role: "Admin",
    company: "CardTrack Technologies",
    employeeId: "EMP-2023-0042",
    department: "IT Security",
    position: "Senior System Administrator",
    validUntil: "2025-12-31",
    avatarUrl: "/placeholder.svg"
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Full Name</TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Email</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Role</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Company</TableCell>
                    <TableCell>{user.company}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Employee ID</TableCell>
                    <TableCell>{user.employeeId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department</TableCell>
                    <TableCell>{user.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Position</TableCell>
                    <TableCell>{user.position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Valid Until</TableCell>
                    <TableCell>{user.validUntil}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
