
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Shield, Trash, Edit, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
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

// Component for user group settings
export const UserGroupSettings = () => {
  const [activeTab, setActiveTab] = useState("user_levels");
  const [userGroups, setUserGroups] = useState(initialUserGroups);
  const [editGroupId, setEditGroupId] = useState<number | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", code: "", level: "normal", description: "" });
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<Record<number, boolean>>({});
  
  // Initialize permissions
  React.useEffect(() => {
    if (selectedGroupId) {
      const initialPermissions: Record<number, boolean> = {};
      systemFeatures.forEach(feature => {
        // Set all permissions to true for high_level, advanced for core features only, etc.
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
  
  return (
    <Tabs defaultValue="user_levels" onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid grid-cols-3">
        <TabsTrigger value="user_levels">User Levels</TabsTrigger>
        <TabsTrigger value="user_groups">User Groups</TabsTrigger>
        <TabsTrigger value="group_permissions">Group Permissions</TabsTrigger>
      </TabsList>
      
      {/* User Levels Tab */}
      <TabsContent value="user_levels">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">User Access Levels</h3>
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
      </TabsContent>
      
      {/* User Groups Tab */}
      <TabsContent value="user_groups">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">User Groups</h3>
            <Button variant="outline" onClick={() => {
              setEditGroupId(null);
              setNewGroup({ name: "", code: "", level: "normal", description: "" });
              setShowAddDialog(true);
            }}>
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
                        <Button variant="ghost" size="icon" onClick={() => handleEditGroup(group)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteGroup(group.id)}>
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
      </TabsContent>
      
      {/* Group Permissions Tab */}
      <TabsContent value="group_permissions">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Group Permissions</h3>
            <div>
              <Select 
                value={selectedGroupId?.toString() || ""}
                onValueChange={(value) => setSelectedGroupId(Number(value))}
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
          </div>
          <Separator />
          
          {selectedGroupId ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Access Permissions</CardTitle>
                  <CardDescription>
                    Select which features this group can access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Core Features</h4>
                      {systemFeatures.filter(f => f.category === "core").map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`feature-${feature.id}`} 
                            checked={permissions[feature.id] || false}
                            onCheckedChange={(checked) => {
                              setPermissions(prev => ({
                                ...prev,
                                [feature.id]: checked === true
                              }));
                            }}
                          />
                          <label htmlFor={`feature-${feature.id}`} className="text-sm">
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Data Management</h4>
                      {systemFeatures.filter(f => f.category === "data").map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`feature-${feature.id}`} 
                            checked={permissions[feature.id] || false}
                            onCheckedChange={(checked) => {
                              setPermissions(prev => ({
                                ...prev,
                                [feature.id]: checked === true
                              }));
                            }}
                          />
                          <label htmlFor={`feature-${feature.id}`} className="text-sm">
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Monitoring</h4>
                      {systemFeatures.filter(f => f.category === "monitoring").map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`feature-${feature.id}`} 
                            checked={permissions[feature.id] || false}
                            onCheckedChange={(checked) => {
                              setPermissions(prev => ({
                                ...prev,
                                [feature.id]: checked === true
                              }));
                            }}
                          />
                          <label htmlFor={`feature-${feature.id}`} className="text-sm">
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Administration</h4>
                      {systemFeatures.filter(f => f.category === "admin").map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`feature-${feature.id}`} 
                            checked={permissions[feature.id] || false}
                            onCheckedChange={(checked) => {
                              setPermissions(prev => ({
                                ...prev,
                                [feature.id]: checked === true
                              }));
                            }}
                          />
                          <label htmlFor={`feature-${feature.id}`} className="text-sm">
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePermissions}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Permissions
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
              <div className="text-center">
                <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h4 className="text-lg font-medium">Select a Group</h4>
                <p className="text-sm text-muted-foreground">
                  Please select a user group to manage permissions
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      
      {/* Add/Edit Group Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editGroupId ? "Edit User Group" : "Add New User Group"}
            </DialogTitle>
            <DialogDescription>
              {editGroupId ? "Update user group details" : "Create a new user group"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group-name" className="text-right">Group Name</Label>
              <Input
                id="group-name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                className="col-span-3"
                placeholder="e.g. Administrators"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group-code" className="text-right">Group Code</Label>
              <Input
                id="group-code"
                value={newGroup.code}
                onChange={(e) => setNewGroup({ ...newGroup, code: e.target.value })}
                className="col-span-3"
                placeholder="e.g. ADMIN"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group-level" className="text-right">Access Level</Label>
              <Select
                value={newGroup.level}
                onValueChange={(value) => setNewGroup({ ...newGroup, level: value })}
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
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                className="col-span-3"
                placeholder="Brief description of this group"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={editGroupId ? handleUpdateGroup : handleAddGroup}>
              {editGroupId ? "Update Group" : "Add Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};
