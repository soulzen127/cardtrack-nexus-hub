
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/use-i18n";
import { MoreHorizontal, Edit, Trash, Lock, Eye } from "lucide-react";

interface UserTableProps {
  users: any[];
  onEditUser: (user: any) => void;
}

export function UserTable({ users, onEditUser }: UserTableProps) {
  const { t } = useI18n();

  // Function to render role badge with appropriate color
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500 hover:bg-red-600">{t("admin")}</Badge>;
      case "manager":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t("manager")}</Badge>;
      case "operator":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("operator")}</Badge>;
      default:
        return <Badge variant="secondary">{t("viewer")}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("email")}</TableHead>
          <TableHead>{t("role")}</TableHead>
          <TableHead>{t("department")}</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead>{t("lastLogin")}</TableHead>
          <TableHead className="text-right">{t("actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
              {t("noUsers")}
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                <div className="text-sm text-muted-foreground">{user.username}</div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {getRoleBadge(user.role)}
              </TableCell>
              <TableCell>{t(user.department)}</TableCell>
              <TableCell>
                {user.status === "active" ? (
                  <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
                    {t("active")}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-500">
                    {t("inactive")}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm">{user.lastLogin}</span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">{t("openMenu")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>{t("edit")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>{t("resetPassword")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>{t("delete")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
