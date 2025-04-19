
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserGroup {
  id: number;
  name: string;
  code: string;
  level: string;
  description: string;
}

interface UserGroupsTabProps {
  userGroups: UserGroup[];
  userLevels: Array<{ id: number; name: string; value: string; }>;
  onEditGroup: (group: UserGroup) => void;
  onDeleteGroup: (id: number) => void;
  onAddNewGroup: () => void;
}

export const UserGroupsTab = ({
  userGroups,
  userLevels,
  onEditGroup,
  onDeleteGroup,
  onAddNewGroup,
}: UserGroupsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Groups</h3>
        <Button variant="outline" onClick={onAddNewGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>
      <Separator />
      
      <div className="grid gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userGroups.map(group => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.code}</TableCell>
                <TableCell>
                  {userLevels.find(level => level.value === group.level)?.name || group.level}
                </TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEditGroup(group)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDeleteGroup(group.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
