
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddUserButton = () => {
  return (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add User
    </Button>
  );
};
