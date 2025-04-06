
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Authentication Settings</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select defaultValue="strong">
                <SelectTrigger id="passwordPolicy">
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="standard">Standard (8+ chars, numbers, letters)</SelectItem>
                  <SelectItem value="strong">Strong (8+ chars, numbers, symbols, mixed case)</SelectItem>
                  <SelectItem value="custom">Custom Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiration</Label>
              <Select defaultValue="90">
                <SelectTrigger id="passwordExpiry">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="enable2FA" defaultChecked />
              <Label htmlFor="enable2FA">Require two-factor authentication</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="enforceLoginLimit" defaultChecked />
              <Label htmlFor="enforceLoginLimit">Enforce account lockout after failed login attempts</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="failedAttempts">Failed Login Attempts</Label>
                <Input id="failedAttempts" type="number" defaultValue="5" min="1" max="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                <Input id="lockoutDuration" type="number" defaultValue="30" min="5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Session Settings</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout</Label>
              <Select defaultValue="30">
                <SelectTrigger id="sessionTimeout">
                  <SelectValue placeholder="Select timeout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxConcurrentSessions">Max Concurrent Sessions</Label>
              <Select defaultValue="1">
                <SelectTrigger id="maxConcurrentSessions">
                  <SelectValue placeholder="Select maximum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 session</SelectItem>
                  <SelectItem value="2">2 sessions</SelectItem>
                  <SelectItem value="3">3 sessions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" defaultChecked />
            <Label htmlFor="rememberMe">Allow "Remember Me" functionality</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Security</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiTimeout">API Request Timeout</Label>
            <Select defaultValue="30">
              <SelectTrigger id="apiTimeout">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">60 seconds</SelectItem>
                <SelectItem value="120">120 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rateLimit">Rate Limiting</Label>
            <Input id="rateLimit" defaultValue="100" />
            <p className="text-xs text-muted-foreground">Maximum number of requests per minute</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="enableCORS" defaultChecked />
            <Label htmlFor="enableCORS">Enable CORS for API access</Label>
          </div>
        </div>
      </div>
    </div>
  );
};
