
import React from "react";
import { AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdminSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetAsAdmin: () => void;
}

export const AdminSetupDialog = ({
  open,
  onOpenChange,
  onSetAsAdmin,
}: AdminSetupDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>System Administrator Setup</DialogTitle>
          <DialogDescription>
            This appears to be the first time setup. Would you like to set yourself as the system administrator?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                As the system administrator, you will have full access to all system features and settings.
                You can add other administrators later.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Administrator Privileges</h4>
                <p className="text-sm text-muted-foreground">
                  Full access to user management, system settings, and all other features
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Later
          </Button>
          <Button onClick={onSetAsAdmin}>
            <Shield className="h-4 w-4 mr-2" />
            Set Me As Administrator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
