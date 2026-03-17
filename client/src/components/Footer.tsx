import { Link } from "react-router-dom";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import logo from "@/assets/xepci-logo.png";

export function Footer() {
  const { settings } = usePublicSettings();
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3"><img src={logo} alt="Xepci Rent" className="h-10 w-auto" /><p className="text-sm text-muted-foreground">Reliable car rental in Kosovo with a modern online booking workflow.</p></div>
        <div className="space-y-2 text-sm"><h3 className="font-semibold">Quick links</h3><div className="flex flex-col gap-1"><Link to="/">Home</Link><Link to="/fleet">Fleet</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div></div>
        <div className="space-y-2 text-sm"><h3 className="font-semibold">Contact</h3><p>{settings?.companyName || "Xepci Rent"}</p><p>{settings?.phone || "+383 44 000 000"}</p><p>{settings?.email || "info@xepcirent.com"}</p><p>{settings?.address || "Pejë, Kosovo"}</p></div>
      </div>
    </footer>
  );
}
