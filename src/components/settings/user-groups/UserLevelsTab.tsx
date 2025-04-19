
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserLevelsTabProps {
  isSystemInitialized: boolean;
  onSetupAdmin: () => void;
}

export const UserLevelsTab = ({ isSystemInitialized, onSetupAdmin }: UserLevelsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Access Levels</h3>
        
        {!isSystemInitialized && (
          <Button onClick={onSetupAdmin} variant="default">
            <Shield className="h-4 w-4 mr-2" />
            Setup Administrator
          </Button>
        )}
      </div>
      <Separator />
      
      <div className="grid gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Level Name</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">High Level</TableCell>
              <TableCell>Administrator/Supervisor</TableCell>
              <TableCell>Complete system access including administration</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Advanced</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Access to most features except administration</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Normal</TableCell>
              <TableCell>Staff</TableCell>
              <TableCell>Basic operational access</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Guest</TableCell>
              <TableCell>Limited</TableCell>
              <TableCell>View-only access to specific features</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
