import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function ProtectedAdminRoute() {
  const { loading, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Checking admin session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
