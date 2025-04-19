
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserGroup {
  id?: number;
  name: string;
  code: string;
  level: string;
  description: string;
}

interface UserGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: UserGroup;
  onGroupChange: (group: UserGroup) => void;
  onSave: () => void;
  isEditing: boolean;
  userLevels: Array<{ id: number; name: string; value: string; }>;
}

export const UserGroupDialog = ({
  open,
  onOpenChange,
  group,
  onGroupChange,
  onSave,
  isEditing,
  userLevels,
}: UserGroupDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit User Group" : "Add New User Group"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update user group details" : "Create a new user group"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-name" className="text-right">Group Name</Label>
            <Input
              id="group-name"
              value={group.name}
              onChange={(e) => onGroupChange({ ...group, name: e.target.value })}
              className="col-span-3"
              placeholder="e.g. Administrators"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-code" className="text-right">Group Code</Label>
            <Input
              id="group-code"
              value={group.code}
              onChange={(e) => onGroupChange({ ...group, code: e.target.value })}
              className="col-span-3"
              placeholder="e.g. ADMIN"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-level" className="text-right">Access Level</Label>
            <Select
              value={group.level}
              onValueChange={(value) => onGroupChange({ ...group, level: value })}
            >
              <SelectTrigger id="group-level" className="col-span-3">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {userLevels.map(level => (
                  <SelectItem key={level.id} value={level.value}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group-desc" className="text-right">Description</Label>
            <Textarea
              id="group-desc"
              value={group.description}
              onChange={(e) => onGroupChange({ ...group, description: e.target.value })}
              className="col-span-3"
              placeholder="Brief description of this group"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            {isEditing ? "Update Group" : "Add Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
