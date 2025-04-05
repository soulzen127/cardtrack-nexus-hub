
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface RegisterCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterCardDialog({ open, onOpenChange }: RegisterCardDialogProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    cardType: "",
    securityLevel: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.cardNumber || !formData.cardHolder || !formData.cardType || !formData.securityLevel) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real application, this would be an API call to register the card
      console.log("Registering card:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Card registered successfully");
      onOpenChange(false);
      
      // Reset form
      setFormData({
        cardNumber: "",
        cardHolder: "",
        cardType: "",
        securityLevel: "",
      });
    } catch (error) {
      console.error("Error registering card:", error);
      toast.error("Failed to register card");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Register New Card</DialogTitle>
            <DialogDescription>
              Fill out the form below to register a new card in the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardHolder">Card Holder</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="Full name"
                value={formData.cardHolder}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Select 
                  value={formData.cardType} 
                  onValueChange={(value) => handleSelectChange("cardType", value)}
                >
                  <SelectTrigger id="cardType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="access">Access Card</SelectItem>
                    <SelectItem value="identity">Identity Card</SelectItem>
                    <SelectItem value="payment">Payment Card</SelectItem>
                    <SelectItem value="multi">Multi-function</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityLevel">Security Level</Label>
                <Select 
                  value={formData.securityLevel} 
                  onValueChange={(value) => handleSelectChange("securityLevel", value)}
                >
                  <SelectTrigger id="securityLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="maximum">Maximum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
