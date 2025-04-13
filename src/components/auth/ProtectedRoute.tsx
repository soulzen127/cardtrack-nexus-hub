
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAccessControl } from "@/hooks/use-access-control";
import { toast } from "sonner";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "supervisor" | "user" | "guest";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole = "user" 
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("authenticated") === "true";
      if (!isAuthenticated) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }
      
      // Check if system has been initialized
      const isSystemInitialized = localStorage.getItem("system_initialized") === "true";
      
      // If system is not initialized, allow access to all routes
      if (!isSystemInitialized) {
        setHasAccess(true);
        setIsChecking(false);
        return;
      }
      
      // Check role if needed
      if (requiredRole && requiredRole !== "user") {
        const userRole = localStorage.getItem("user_role") || "guest";
        const roleHierarchy = ["guest", "user", "supervisor", "admin"];
        const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
        const userRoleIndex = roleHierarchy.indexOf(userRole);
        
        // User has access if their role is same or higher level than required
        const hasRoleAccess = userRoleIndex >= requiredRoleIndex;
        
        if (!hasRoleAccess) {
          toast.error("You don't have permission to access this page");
        }
        
        setHasAccess(hasRoleAccess);
        setIsChecking(false);
      } else {
        // For regular user routes, just check authentication
        setHasAccess(true);
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [requiredRole, location.pathname]);
  
  // Still checking auth state
  if (isChecking) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated or doesn't have required role, redirect to login
  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // User is authenticated and has required role, render children
  return <Outlet />;
};
