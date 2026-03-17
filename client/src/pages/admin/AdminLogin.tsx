import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/api/authApi";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";
import logo from "@/assets/xepci-logo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();
  const from = (location.state as any)?.from?.pathname || "/admin";

  useEffect(() => {
    if (isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = await loginAdmin(email, password);
      await login(data.token, data.admin);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border p-8 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <img src={logo} alt="Xepci Rent" className="h-12 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your fleet</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your admin email here" required /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your admin password here" required /></div>
          <Button type="submit" className="w-full" size="lg" disabled={submitting}>{submitting ? "Signing in..." : "Sign In"}</Button>
        </form>
      </div>
    </div>
  );
}
