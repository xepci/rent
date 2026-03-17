import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDashboardStats } from "@/api/dashboardApi";
import { Card, CardContent } from "@/components/ui/card";

type DashboardStats = {
  totalCars: number; availableCars: number; totalBookings: number; pendingBookings: number; confirmedBookings: number; completedBookings: number; cancelledBookings: number; totalMessages: number; monthlyRevenue: number; totalRevenue: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => { try { setLoading(true); setStats(await getDashboardStats()); } catch (error: any) { toast.error(error?.response?.data?.message || "Failed to load dashboard stats"); } finally { setLoading(false); } })(); }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!stats) return <div>Unable to load dashboard.</div>;

  const cards = [
    { label: "Total Cars", value: stats.totalCars },
    { label: "Available Cars", value: stats.availableCars },
    { label: "Total Bookings", value: stats.totalBookings },
    { label: "Pending Bookings", value: stats.pendingBookings },
    { label: "Confirmed Bookings", value: stats.confirmedBookings },
    { label: "Completed Bookings", value: stats.completedBookings },
    { label: "Cancelled Bookings", value: stats.cancelledBookings },
    { label: "Messages", value: stats.totalMessages }
  ];

  return (
    <div className="space-y-6"><div><h1 className="font-display text-2xl font-bold">Dashboard</h1><p className="text-sm text-muted-foreground">Overview of cars, bookings, messages, and revenue.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <Card key={card.label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{card.label}</p><p className="mt-2 text-3xl font-bold">{card.value}</p></CardContent></Card>)}</div><div className="grid gap-4 md:grid-cols-2"><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Monthly Revenue</p><p className="mt-2 text-3xl font-bold">€{stats.monthlyRevenue}</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Revenue</p><p className="mt-2 text-3xl font-bold">€{stats.totalRevenue}</p></CardContent></Card></div></div>
  );
}
