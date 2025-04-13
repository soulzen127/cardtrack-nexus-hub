
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to portal
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/portal");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex flex-col items-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-cardtrack-700">CardTrack</h1>
              {/* Logo will appear here, uploaded by user */}
              <div className="mt-2 w-24 h-24 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {localStorage.getItem('systemLogo') ? (
                  <img 
                    src={localStorage.getItem('systemLogo') || ''} 
                    alt="System Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-muted-foreground text-xs">Logo</div>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Login to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access the dashboard
            </CardDescription>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
