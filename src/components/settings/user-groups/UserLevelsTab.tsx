
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, Plus, Edit, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UserLevel {
  id: number;
  name: string;
  accessLevel: string;
  description: string;
}

interface UserLevelsTabProps {
  isSystemInitialized: boolean;
  onSetupAdmin: () => void;
}

export const UserLevelsTab = ({ isSystemInitialized, onSetupAdmin }: UserLevelsTabProps) => {
  const [userLevels, setUserLevels] = useState<UserLevel[]>([
    {
      id: 1,
      name: "High Level",
      accessLevel: "Administrator/Supervisor",
      description: "Complete system access including administration"
    },
    {
      id: 2,
      name: "Advanced",
      accessLevel: "Manager",
      description: "Access to most features except administration"
    },
    {
      id: 3,
      name: "Normal",
      accessLevel: "Staff",
      description: "Basic operational access"
    },
    {
      id: 4,
      name: "Guest",
      accessLevel: "Limited",
      description: "View-only access to specific features"
    }
  ]);
  
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isEditLevelOpen, setIsEditLevelOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<UserLevel | null>(null);
  const [newLevelName, setNewLevelName] = useState("");
  const [newAccessLevel, setNewAccessLevel] = useState("");
  const [newDescription, setNewDescription] = useState("");
  
  const handleAddLevel = () => {
    if (!newLevelName || !newAccessLevel) {
      toast.error("Level name and access level are required");
      return;
    }
    
    const newId = Math.max(0, ...userLevels.map(l => l.id)) + 1;
    const newLevel = {
      id: newId,
      name: newLevelName,
      accessLevel: newAccessLevel,
      description: newDescription
    };
    
    setUserLevels([...userLevels, newLevel]);
    toast.success("User level added successfully");
    resetForm();
    setIsAddLevelOpen(false);
  };
  
  const handleEditLevel = () => {
    if (!currentLevel || !newLevelName || !newAccessLevel) {
      toast.error("Level name and access level are required");
      return;
    }
    
    setUserLevels(userLevels.map(level => 
      level.id === currentLevel.id ? 
      { 
        ...level, 
        name: newLevelName, 
        accessLevel: newAccessLevel, 
        description: newDescription 
      } : level
    ));
    
    toast.success("User level updated successfully");
    resetForm();
    setIsEditLevelOpen(false);
  };
  
  const handleDeleteLevel = (id: number) => {
    setUserLevels(userLevels.filter(level => level.id !== id));
    toast.success("User level deleted successfully");
  };
  
  const resetForm = () => {
    setNewLevelName("");
    setNewAccessLevel("");
    setNewDescription("");
    setCurrentLevel(null);
  };
  
  const openEditDialog = (level: UserLevel) => {
    setCurrentLevel(level);
    setNewLevelName(level.name);
    setNewAccessLevel(level.accessLevel);
    setNewDescription(level.description);
    setIsEditLevelOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Access Levels</h3>
        
        <div className="flex space-x-2">
          {!isSystemInitialized && (
            <Button onClick={onSetupAdmin} variant="default">
              <Shield className="h-4 w-4 mr-2" />
              Setup Administrator
            </Button>
          )}
          
          <Button onClick={() => setIsAddLevelOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Level
          </Button>
        </div>
      </div>
      <Separator />
      
      <div className="grid gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Level Name</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userLevels.map(level => (
              <TableRow key={level.id}>
                <TableCell className="font-medium">{level.name}</TableCell>
                <TableCell>{level.accessLevel}</TableCell>
                <TableCell>{level.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(level)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteLevel(level.id)}
                      disabled={level.id <= 4} // Prevent deletion of default levels
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Level Dialog */}
      <Dialog open={isAddLevelOpen} onOpenChange={setIsAddLevelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User Level</DialogTitle>
            <DialogDescription>
              Create a new user access level
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="levelName">Level Name</Label>
              <Input 
                id="levelName" 
                value={newLevelName} 
                onChange={(e) => setNewLevelName(e.target.value)} 
                placeholder="e.g. Expert"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Access Level</Label>
              <Input 
                id="accessLevel" 
                value={newAccessLevel} 
                onChange={(e) => setNewAccessLevel(e.target.value)} 
                placeholder="e.g. Senior Operator"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={newDescription} 
                onChange={(e) => setNewDescription(e.target.value)} 
                placeholder="Description of this level's access"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLevelOpen(false)}>Cancel</Button>
            <Button onClick={handleAddLevel}>Add Level</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Level Dialog */}
      <Dialog open={isEditLevelOpen} onOpenChange={setIsEditLevelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Level</DialogTitle>
            <DialogDescription>
              Modify this user access level
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editLevelName">Level Name</Label>
              <Input 
                id="editLevelName" 
                value={newLevelName} 
                onChange={(e) => setNewLevelName(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editAccessLevel">Access Level</Label>
              <Input 
                id="editAccessLevel" 
                value={newAccessLevel} 
                onChange={(e) => setNewAccessLevel(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Input 
                id="editDescription" 
                value={newDescription} 
                onChange={(e) => setNewDescription(e.target.value)} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLevelOpen(false)}>Cancel</Button>
            <Button onClick={handleEditLevel}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
