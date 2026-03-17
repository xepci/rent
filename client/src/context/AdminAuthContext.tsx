import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAdminMe } from "@/api/authApi";
import type { AdminAuthContextType, AdminUser } from "@/types/auth";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setAdmin(null);
  }, []);

  const refreshAdmin = useCallback(async () => {
    const storedToken = localStorage.getItem("admin_token");
    if (!storedToken) {
      setAdmin(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      setToken(storedToken);
      const data = await getAdminMe();
      setAdmin(data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const login = useCallback(async (newToken: string, adminFromLogin?: AdminUser | null) => {
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    if (adminFromLogin) setAdmin(adminFromLogin);
    await refreshAdmin();
  }, [refreshAdmin]);

  useEffect(() => {
    refreshAdmin();
  }, [refreshAdmin]);

  const value = useMemo(() => ({ admin, token, loading, isAuthenticated: Boolean(token && admin), login, logout, refreshAdmin }), [admin, token, loading, login, logout, refreshAdmin]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuthContext() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuthContext must be used within AdminAuthProvider");
  return context;
}
