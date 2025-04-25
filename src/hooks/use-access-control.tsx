
import { useEffect, useState } from "react";

// User roles with increasing levels of permission
export type UserRole = "viewer" | "operator" | "manager" | "admin";

interface UseAccessControlProps {
  // The minimum role required to access a feature
  requiredRole?: UserRole;
  // Optional feature key for more granular control
  featureKey?: string;
}

/**
 * A hook to check user access permissions for features
 */
export const useAccessControl = ({ 
  requiredRole = "viewer", 
  featureKey 
}: UseAccessControlProps = {}) => {
  // Get user role from localStorage
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>("viewer");
  const [isLoading, setIsLoading] = useState(true);
  
  // Role hierarchy - higher index means more permissions
  const roleHierarchy: UserRole[] = ["viewer", "operator", "manager", "admin"];
  
  // Feature-specific override settings from localStorage
  const [featureSettings, setFeatureSettings] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Get stored role from localStorage
    const storedRole = localStorage.getItem("user_role") as UserRole | null;
    console.log("Retrieved user role from storage:", storedRole);
    
    if (storedRole && roleHierarchy.includes(storedRole)) {
      setCurrentUserRole(storedRole);
    } else {
      // Default to viewer if no role is stored
      console.log("No valid role found, using viewer");
      setCurrentUserRole("viewer");
    }
    
    // Load feature-specific settings
    if (featureKey) {
      const requiresAdmin = localStorage.getItem(`${featureKey}_requires_admin`);
      if (requiresAdmin === "true") {
        setFeatureSettings(prev => ({
          ...prev,
          [featureKey]: true
        }));
      }
    }
    
    setIsLoading(false);
  }, [featureKey]);
  
  // Check if current role has sufficient permissions
  const hasAccess = () => {
    // Feature requires admin specifically (override role hierarchy)
    if (featureKey && featureSettings[featureKey]) {
      return currentUserRole === "admin";
    }
    
    // Check role hierarchy
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    const currentRoleIndex = roleHierarchy.indexOf(currentUserRole);
    
    console.log(`Access check: Required role ${requiredRole} (${requiredRoleIndex}), Current role ${currentUserRole} (${currentRoleIndex})`);
    
    return currentRoleIndex >= requiredRoleIndex;
  };
  
  // Function to set user role (for testing)
  const setUserRole = (role: UserRole) => {
    console.log("Setting user role to:", role);
    setCurrentUserRole(role);
    localStorage.setItem("user_role", role);
  };
  
  return {
    hasAccess: hasAccess(),
    isLoading,
    currentUserRole,
    setUserRole
  };
};
