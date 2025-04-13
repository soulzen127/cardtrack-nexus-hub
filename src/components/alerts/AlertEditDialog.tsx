
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AlertEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertId: number;
  alertData: {
    title: string;
    description: string;
    type: string;
    severity: string;
    isEnabled: boolean;
  };
}

export const AlertEditDialog: React.FC<AlertEditDialogProps> = ({
  open,
  onOpenChange,
  alertId,
  alertData
}) => {
  const [editedAlert, setEditedAlert] = useState(alertData);
  
  const handleSave = () => {
    if (!editedAlert.title.trim()) {
      toast.error("Alert title is required");
      return;
    }
    
    toast.success(`Alert #${alertId} has been updated`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Alert Configuration</DialogTitle>
          <DialogDescription>
            Update the alert settings and conditions
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-title" className="text-right">Title</Label>
            <Input
              id="alert-title"
              value={editedAlert.title}
              onChange={(e) => setEditedAlert({ ...editedAlert, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-type" className="text-right">Type</Label>
            <Select
              value={editedAlert.type}
              onValueChange={(value) => setEditedAlert({ ...editedAlert, type: value })}
            >
              <SelectTrigger id="alert-type" className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geofence">Geofence Violation</SelectItem>
                <SelectItem value="battery">Low Battery</SelectItem>
                <SelectItem value="movement">Unexpected Movement</SelectItem>
                <SelectItem value="tamper">Tamper Detection</SelectItem>
                <SelectItem value="system">System Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-severity" className="text-right">Severity</Label>
            <Select
              value={editedAlert.severity}
              onValueChange={(value) => setEditedAlert({ ...editedAlert, severity: value })}
            >
              <SelectTrigger id="alert-severity" className="col-span-3">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-description" className="text-right">Description</Label>
            <Textarea
              id="alert-description"
              value={editedAlert.description}
              onChange={(e) => setEditedAlert({ ...editedAlert, description: e.target.value })}
              className="col-span-3"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-enabled" className="text-right">Status</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="alert-enabled"
                checked={editedAlert.isEnabled}
                onCheckedChange={(checked) => setEditedAlert({ ...editedAlert, isEnabled: checked })}
              />
              <Label htmlFor="alert-enabled">
                {editedAlert.isEnabled ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
