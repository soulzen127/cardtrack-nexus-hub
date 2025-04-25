
import { useEffect, useState } from "react";

export type UserRole = "viewer" | "operator" | "manager" | "admin";

interface UseAccessControlProps {
  requiredRole?: UserRole;
  featureKey?: string;
}

export const useAccessControl = ({ 
  requiredRole = "viewer", 
  featureKey 
}: UseAccessControlProps = {}) => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>("viewer");
  const [isLoading, setIsLoading] = useState(true);
  
  const roleHierarchy: UserRole[] = ["viewer", "operator", "manager", "admin"];
  
  useEffect(() => {
    const storedRole = localStorage.getItem("user_role") as UserRole | null;
    const isInitialized = localStorage.getItem("system_initialized") === "true";
    
    console.log("AccessControl: stored role:", storedRole, "initialized:", isInitialized);
    
    if (storedRole && roleHierarchy.includes(storedRole)) {
      setCurrentUserRole(storedRole);
    } else if (!isInitialized) {
      console.log("AccessControl: system not initialized, defaulting to admin");
      setCurrentUserRole("admin");
    } else {
      console.log("AccessControl: no valid role, using viewer");
      setCurrentUserRole("viewer");
    }
    
    setIsLoading(false);
  }, []);
  
  const hasAccess = () => {
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    const currentRoleIndex = roleHierarchy.indexOf(currentUserRole);
    
    console.log(`AccessControl: Required role ${requiredRole} (${requiredRoleIndex}), Current role ${currentUserRole} (${currentRoleIndex})`);
    
    return currentRoleIndex >= requiredRoleIndex;
  };
  
  return {
    hasAccess: hasAccess(),
    isLoading,
    currentUserRole
  };
};
