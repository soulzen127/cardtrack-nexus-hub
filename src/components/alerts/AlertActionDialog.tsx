
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AlertActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertId: number;
  alertTitle: string;
  type: "confirm" | "resolve" | "viewResolved";
  resolvedNote?: string;
}

export const AlertActionDialog: React.FC<AlertActionDialogProps> = ({
  open,
  onOpenChange,
  alertId,
  alertTitle,
  type,
  resolvedNote
}) => {
  const [note, setNote] = React.useState(resolvedNote || "");
  
  const handleAction = () => {
    if (type === "confirm") {
      toast.success(`Alert #${alertId} has been confirmed`);
      onOpenChange(false);
    } else if (type === "resolve") {
      if (!note.trim()) {
        toast.error("Please enter a resolution note");
        return;
      }
      toast.success(`Alert #${alertId} has been resolved`);
      onOpenChange(false);
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case "confirm": return "Confirm Alert";
      case "resolve": return "Resolve Alert";
      case "viewResolved": return "Resolution Details";
      default: return "Alert Action";
    }
  };
  
  const getDescription = () => {
    switch (type) {
      case "confirm": return "Mark this alert as confirmed. You will still need to resolve it.";
      case "resolve": return "Mark this alert as resolved and provide resolution details.";
      case "viewResolved": return "View the resolution details for this alert.";
      default: return "Take action on this alert.";
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium mb-2">{alertTitle}</h3>
          
          {type === "resolve" && (
            <div className="space-y-2">
              <Label htmlFor="resolution-note">Resolution Note</Label>
              <Textarea 
                id="resolution-note" 
                placeholder="Enter details about how this alert was resolved..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
            </div>
          )}
          
          {type === "viewResolved" && resolvedNote && (
            <div className="space-y-2">
              <Label>Resolution Note</Label>
              <div className="p-3 border rounded-md bg-muted/20 text-sm">
                {resolvedNote}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Resolved on: April 17, 2023 at 10:45 AM
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {type !== "viewResolved" ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleAction}>
                {type === "confirm" ? "Confirm Alert" : "Resolve Alert"}
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
