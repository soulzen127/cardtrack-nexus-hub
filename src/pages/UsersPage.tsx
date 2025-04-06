
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
import { useI18n } from "@/hooks/use-i18n";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useI18n();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("userManagement")}</h1>
          <AddUserButton />
        </div>

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
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
