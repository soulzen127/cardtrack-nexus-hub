
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
  // In a real app, this would come from an auth context
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>("admin");
  const [isLoading, setIsLoading] = useState(true);
  
  // Role hierarchy - higher index means more permissions
  const roleHierarchy: UserRole[] = ["viewer", "operator", "manager", "admin"];
  
  // Feature-specific override settings from localStorage
  const [featureSettings, setFeatureSettings] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Simulate loading user role from storage or API
    const storedRole = localStorage.getItem("user_role") as UserRole | null;
    if (storedRole && roleHierarchy.includes(storedRole)) {
      setCurrentUserRole(storedRole);
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
    
    return currentRoleIndex >= requiredRoleIndex;
  };
  
  // Mock function to set user role (for demo/testing)
  const setUserRole = (role: UserRole) => {
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
