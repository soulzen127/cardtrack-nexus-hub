
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "David Chen",
    email: "david.chen@example.com",
    role: t("adminRole"),
    company: "CardTrack Technologies",
    employeeId: "EMP-2023-0042",
    department: t("itSecurityDepartment"),
    position: t("seniorSystemAdmin"),
    validUntil: "2025-12-31",
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server/storage
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarUrl(e.target.result as string);
          toast({
            title: t("profileUpdated"),
            description: t("profilePhotoUpdated"),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("userProfile")}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t("profilePicture")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Camera className="h-8 w-8" />
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('avatar-upload')?.click()}>
                {t("changePhoto")}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("personalInformation")}</CardTitle>
              <CardDescription>{t("accountDetailsPreferences")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t("fullName")}</TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("email")}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("role")}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("company")}</TableCell>
                    <TableCell>{user.company}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("employeeId")}</TableCell>
                    <TableCell>{user.employeeId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("department")}</TableCell>
                    <TableCell>{user.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("position")}</TableCell>
                    <TableCell>{user.position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("validUntil")}</TableCell>
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
