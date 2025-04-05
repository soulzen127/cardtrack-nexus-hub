
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is just a mock. In a real app, you would use Supabase authentication
      console.log("Resetting password for:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-cardtrack-700">CardTrack</h1>
            </div>
            <CardTitle className="text-2xl text-center">Reset your password</CardTitle>
            <CardDescription className="text-center">
              {!isSubmitted 
                ? "Enter your email and we'll send you a link to reset your password" 
                : "Check your email for the reset link"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  <Link to="/login" className="text-primary hover:underline">
                    Back to login
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm mt-2">
                  Please check your email and follow the instructions to reset your password.
                </p>
              </div>
              <Button 
                asChild
                className="w-full mt-4" 
              >
                <Link to="/login">Back to Login</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
