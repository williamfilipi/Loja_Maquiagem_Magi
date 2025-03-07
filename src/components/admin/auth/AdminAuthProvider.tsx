import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>(
  {} as AdminAuthContextType,
);

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for hardcoded admin credentials first
    const adminPhone = localStorage.getItem("adminPhone");
    if (adminPhone === "0123456789") {
      setIsLoading(false);
      return;
    }

    if (!authLoading) {
      // If not authenticated or not an admin, redirect to login
      if (!user || !isAdmin) {
        navigate("/admin/login");
      }
      setIsLoading(false);
    }
  }, [user, authLoading, isAdmin, navigate]);

  // Check for hardcoded admin credentials
  const adminPhone = localStorage.getItem("adminPhone");
  const isHardcodedAdmin = adminPhone === "0123456789";

  const value = {
    isAuthenticated: isHardcodedAdmin || (!!user && isAdmin),
    isLoading: authLoading || isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const withAdminAuth = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (props: P) => (
    <AdminAuthProvider>
      <Component {...props} />
    </AdminAuthProvider>
  );
};
