
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "manager" | "operator" | "viewer";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole = "viewer" 
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      // Check for authentication
      const isAuthenticated = localStorage.getItem("authenticated") === "true";
      if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to login");
        setHasAccess(false);
        setIsChecking(false);
        return;
      }
      
      // Check if system has been initialized
      const isSystemInitialized = localStorage.getItem("system_initialized") === "true";
      
      // Grant access to portal regardless of initialization state
      // This ensures users can always access the portal even during first setup
      if (location.pathname === "/portal") {
        console.log("Allowing access to portal");
        setHasAccess(true);
        setIsChecking(false);
        return;
      }
      
      // If system is not initialized, only allow access to settings for first-time setup
      if (!isSystemInitialized) {
        if (location.pathname === "/settings") {
          console.log("System not initialized but allowing access to settings");
          setHasAccess(true);
        } else {
          console.log("System not initialized, redirecting to settings");
          toast.info("請先完成系統設定");
          setHasAccess(false);
        }
        setIsChecking(false);
        return;
      }
      
      // Check role access for initialized system
      if (requiredRole) {
        const userRole = localStorage.getItem("user_role") || "viewer";
        const roleHierarchy = ["viewer", "operator", "manager", "admin"];
        const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
        const userRoleIndex = roleHierarchy.indexOf(userRole);
        
        // User has access if their role is same or higher level than required
        const hasRoleAccess = userRoleIndex >= requiredRoleIndex;
        
        if (!hasRoleAccess) {
          console.log("Insufficient permissions for", location.pathname);
          toast.error("您沒有權限訪問此頁面");
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
    return <div className="flex h-screen items-center justify-center">載入中...</div>;
  }
  
  // If not authenticated or doesn't have required role, redirect to login
  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // User is authenticated and has required role, render children
  return <Outlet />;
};
