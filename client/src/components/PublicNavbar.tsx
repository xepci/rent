import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import logo from "@/assets/xepci-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

export function PublicNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { settings } = usePublicSettings();

  return (
    <>
      <div className="bg-primary text-primary-foreground"><div className="container flex items-center justify-between py-2 text-xs">
	  <div className="flex items-center gap-4"><span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {settings?.phone || "+383 45 123 456"}</span>
	  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {settings?.email || "xepcirent@gmail.com"}</span>
	  </div></div></div>
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"><div className="container flex h-16 items-center justify-between"><Link to="/" className="flex items-center gap-2"><img src={logo} alt="Xepci Rent" className="h-10 w-auto" /></Link><div className="hidden md:flex items-center gap-1">{navLinks.map((l) => <Link key={l.to} to={l.to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === l.to ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{l.label}</Link>)}</div><div className="hidden md:flex items-center gap-2"><Button asChild variant="outline" size="sm"><Link to="/contact">Contact Us</Link></Button><Button asChild size="sm"><Link to="/fleet">Book a Car</Link></Button></div><button className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button></div>{open && <div className="md:hidden border-t bg-card pb-4">{navLinks.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`block px-6 py-3 text-sm font-medium transition-colors ${location.pathname === l.to ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground"}`}>{l.label}</Link>)}<div className="px-6 pt-3 flex flex-col gap-2"><Button asChild variant="outline" size="sm"><Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link></Button><Button asChild size="sm"><Link to="/fleet" onClick={() => setOpen(false)}>Book a Car</Link></Button><Link to="/admin/login" onClick={() => setOpen(false)} className="text-xs text-muted-foreground text-center mt-2">Admin Access</Link></div></div>}</nav>
    </>
  );
}
