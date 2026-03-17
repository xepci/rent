import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, ClipboardList, Settings, LogOut, Menu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/xepci-logo.png";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/cars", label: "Cars", icon: Car },
  { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) => path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2"><img src={logo} alt="Xepci Rent" className="h-8 w-auto brightness-0 invert" /></Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(l.to) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}`}>
            <l.icon className="h-4 w-4" />{l.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border text-xs text-sidebar-foreground/70">
        {admin ? <div className="mb-3 px-3">Logged in as<br /><span className="font-medium">{admin.name}</span><br />{admin.email}</div> : null}
        <Link to="/" className="block hover:text-sidebar-foreground mb-2 px-3 py-1">← Back to Website</Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full"><LogOut className="h-4 w-4" /> Logout</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">{sidebar}</aside>
      {sidebarOpen && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} /><aside className="relative w-64 h-full bg-sidebar">{sidebar}</aside></div>}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-card flex items-center px-4 gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></Button><h2 className="font-display font-semibold text-lg truncate">{links.find((l) => isActive(l.to))?.label || "Admin"}</h2></header>
        <main className="flex-1 p-4 md:p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
}
