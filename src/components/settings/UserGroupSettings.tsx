import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserLevelsTab } from "./user-groups/UserLevelsTab";
import { UserGroupsTab } from "./user-groups/UserGroupsTab";
import { GroupPermissionsTab } from "./user-groups/GroupPermissionsTab";
import { UserGroupDialog } from "./user-groups/UserGroupDialog";
import { AdminSetupDialog } from "./user-groups/AdminSetupDialog";

// Mock data (keep the same as before)
const userLevels = [
  { id: 1, name: "High Level", value: "high_level" },
  { id: 2, name: "Advanced", value: "advanced" },
  { id: 3, name: "Normal", value: "normal" },
  { id: 4, name: "Guest", value: "guest" },
];

const initialUserGroups = [
  { id: 1, name: "Administrators", code: "ADMIN", level: "high_level", description: "System administrators with full access" },
  { id: 2, name: "Managers", code: "MGR", level: "advanced", description: "Department managers" },
  { id: 3, name: "Staff", code: "STAFF", level: "normal", description: "Regular staff members" },
  { id: 4, name: "Visitors", code: "VISIT", level: "guest", description: "Temporary visitors" }
];

const systemFeatures = [
  { id: 1, name: "Dashboard", category: "core" },
  { id: 2, name: "Cards Management", category: "core" },
  { id: 3, name: "Tracking", category: "core" },
  { id: 4, name: "Records", category: "data" },
  { id: 5, name: "Reports", category: "data" },
  { id: 6, name: "Alerts", category: "monitoring" },
  { id: 7, name: "User Management", category: "admin" },
  { id: 8, name: "Settings", category: "admin" },
  { id: 9, name: "Card Registration", category: "core" },
  { id: 10, name: "Import/Export Data", category: "data" },
];

export const UserGroupSettings = () => {
  const [activeTab, setActiveTab] = useState("user_levels");
  const [userGroups, setUserGroups] = useState(initialUserGroups);
  const [editGroupId, setEditGroupId] = useState<number | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", code: "", level: "normal", description: "" });
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<Record<number, boolean>>({});
  const [isSystemInitialized, setIsSystemInitialized] = useState(
    localStorage.getItem("system_initialized") === "true"
  );
  const [showAdminSetupDialog, setShowAdminSetupDialog] = useState(!isSystemInitialized);

  useEffect(() => {
    if (selectedGroupId) {
      const initialPermissions: Record<number, boolean> = {};
      systemFeatures.forEach(feature => {
        const group = userGroups.find(g => g.id === selectedGroupId);
        if (group) {
          if (group.level === "high_level") {
            initialPermissions[feature.id] = true;
          } else if (group.level === "advanced") {
            initialPermissions[feature.id] = ["core", "data"].includes(feature.category);
          } else if (group.level === "normal") {
            initialPermissions[feature.id] = feature.category === "core";
          } else {
            initialPermissions[feature.id] = false;
          }
        }
      });
      setPermissions(initialPermissions);
    }
  }, [selectedGroupId, userGroups]);

  const handleAddGroup = () => {
    if (!newGroup.name || !newGroup.code) {
      toast.error("Group name and code are required");
      return;
    }
    
    const newId = Math.max(...userGroups.map(g => g.id)) + 1;
    setUserGroups([...userGroups, { ...newGroup, id: newId }]);
    setNewGroup({ name: "", code: "", level: "normal", description: "" });
    setShowAddDialog(false);
    toast.success("Group added successfully");
  };

  const handleEditGroup = (group: typeof userGroups[0]) => {
    setEditGroupId(group.id);
    setNewGroup({ name: group.name, code: group.code, level: group.level, description: group.description });
    setShowAddDialog(true);
  };

  const handleUpdateGroup = () => {
    if (!newGroup.name || !newGroup.code) {
      toast.error("Group name and code are required");
      return;
    }
    
    setUserGroups(userGroups.map(group => 
      group.id === editGroupId ? { ...group, ...newGroup } : group
    ));
    setEditGroupId(null);
    setNewGroup({ name: "", code: "", level: "normal", description: "" });
    setShowAddDialog(false);
    toast.success("Group updated successfully");
  };

  const handleDeleteGroup = (id: number) => {
    setUserGroups(userGroups.filter(group => group.id !== id));
    toast.success("Group deleted successfully");
  };

  const handleSavePermissions = () => {
    toast.success("Permissions saved successfully");
  };

  const handleSetAsAdmin = () => {
    localStorage.setItem("user_role", "admin");
    localStorage.setItem("system_initialized", "true");
    setIsSystemInitialized(true);
    setShowAdminSetupDialog(false);
    toast.success("You have been set as the system administrator");
  };

  return (
    <>
      <Tabs defaultValue="user_levels" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-3">
          <TabsTrigger value="user_levels">User Levels</TabsTrigger>
          <TabsTrigger value="user_groups">User Groups</TabsTrigger>
          <TabsTrigger value="group_permissions">Group Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user_levels">
          <UserLevelsTab 
            isSystemInitialized={isSystemInitialized}
            onSetupAdmin={() => setShowAdminSetupDialog(true)}
          />
        </TabsContent>
        
        <TabsContent value="user_groups">
          <UserGroupsTab 
            userGroups={userGroups}
            userLevels={userLevels}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
            onAddNewGroup={() => {
              setEditGroupId(null);
              setNewGroup({ name: "", code: "", level: "normal", description: "" });
              setShowAddDialog(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="group_permissions">
          <GroupPermissionsTab 
            selectedGroupId={selectedGroupId}
            userGroups={userGroups}
            systemFeatures={systemFeatures}
            permissions={permissions}
            onGroupSelect={(value) => setSelectedGroupId(Number(value))}
            onPermissionChange={(featureId, checked) => {
              setPermissions(prev => ({
                ...prev,
                [featureId]: checked
              }));
            }}
            onSavePermissions={handleSavePermissions}
          />
        </TabsContent>
      </Tabs>

      <AdminSetupDialog 
        open={showAdminSetupDialog}
        onOpenChange={setShowAdminSetupDialog}
        onSetAsAdmin={handleSetAsAdmin}
      />
      
      <UserGroupDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        group={newGroup}
        onGroupChange={setNewGroup}
        onSave={editGroupId ? handleUpdateGroup : handleAddGroup}
        isEditing={!!editGroupId}
        userLevels={userLevels}
      />
    </>
  );
};
