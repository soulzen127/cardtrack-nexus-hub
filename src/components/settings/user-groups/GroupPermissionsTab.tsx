
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Feature {
  id: number;
  name: string;
  category: string;
}

interface GroupPermissionsTabProps {
  selectedGroupId: number | null;
  userGroups: Array<{ id: number; name: string; }>;
  systemFeatures: Feature[];
  permissions: Record<number, boolean>;
  onGroupSelect: (groupId: string) => void;
  onPermissionChange: (featureId: number, checked: boolean) => void;
  onSavePermissions: () => void;
}

export const GroupPermissionsTab = ({
  selectedGroupId,
  userGroups,
  systemFeatures,
  permissions,
  onGroupSelect,
  onPermissionChange,
  onSavePermissions,
}: GroupPermissionsTabProps) => {
  const featuresByCategory = {
    core: systemFeatures.filter(f => f.category === "core"),
    data: systemFeatures.filter(f => f.category === "data"),
    monitoring: systemFeatures.filter(f => f.category === "monitoring"),
    admin: systemFeatures.filter(f => f.category === "admin"),
  };

  if (!selectedGroupId) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
        <div className="text-center">
          <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h4 className="text-lg font-medium">Select a Group</h4>
          <p className="text-sm text-muted-foreground">
            Please select a user group to manage permissions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Group Permissions</h3>
        <Select 
          value={selectedGroupId?.toString() || ""}
          onValueChange={onGroupSelect}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            {userGroups.map(group => (
              <SelectItem key={group.id} value={group.id.toString()}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Access Permissions</CardTitle>
          <CardDescription>
            Select which features this group can access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(featuresByCategory).map(([category, features]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-sm font-semibold capitalize">{category === 'admin' ? 'Administration' : category} Features</h4>
                {features.map(feature => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`feature-${feature.id}`} 
                      checked={permissions[feature.id] || false}
                      onCheckedChange={(checked) => onPermissionChange(feature.id, checked === true)}
                    />
                    <label htmlFor={`feature-${feature.id}`} className="text-sm">
                      {feature.name}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSavePermissions}>
            <Save className="h-4 w-4 mr-2" />
            Save Permissions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
