
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { UserList } from "@/components/users/UserList";
import { AddUserButton } from "@/components/users/AddUserButton";
import { mockUsers } from "@/components/users/mockData";
import { useI18n } from "@/hooks/use-i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserForm } from "@/components/users/UserForm";
import { UserPermissions } from "@/components/users/UserPermissions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("list");
  const { t } = useI18n();
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setActiveTab("edit");
  };
  
  const handleCreateUser = () => {
    setSelectedUser(null);
    setActiveTab("create");
  };
  
  const handleBack = () => {
    setActiveTab("list");
    setSelectedUser(null);
  };
  
  const handleSaveUser = () => {
    toast.success(selectedUser ? t("userUpdated") : t("userCreated"));
    setActiveTab("list");
    setSelectedUser(null);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("userManagement")}</h1>
          {activeTab === "list" ? (
            <Button onClick={handleCreateUser}>{t("addUser")}</Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("back")}
              </Button>
              <Button onClick={handleSaveUser}>
                <Save className="mr-2 h-4 w-4" />
                {t("save")}
              </Button>
            </div>
          )}
        </div>

        {activeTab === "list" ? (
          <Card>
            <CardHeader>
              <CardTitle>{t("users")}</CardTitle>
              <CardDescription>
                {t("manageUserAccounts")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserList 
                users={mockUsers} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                onEditUser={handleEditUser}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "edit" ? t("editUser") : t("createUser")}
              </CardTitle>
              <CardDescription>
                {activeTab === "edit" ? t("editUserDetails") : t("createNewUserAccount")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">{t("userDetails")}</TabsTrigger>
                  <TabsTrigger value="permissions">{t("permissions")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <UserForm user={selectedUser} />
                </TabsContent>
                
                <TabsContent value="permissions">
                  <UserPermissions user={selectedUser} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleBack}>{t("cancel")}</Button>
              <Button onClick={handleSaveUser}>{t("save")}</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
