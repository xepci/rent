import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getAdminBookings, updateBookingStatus } from "@/api/bookingApi";
import type { Booking, BookingStatus } from "@/types/booking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteBooking } from "@/api/bookingApi";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  useEffect(() => { loadBookings(); }, []);

  const loadBookings = async () => {
    try { setLoading(true); setBookings(await getAdminBookings()); }
    catch (error: any) { toast.error(error?.response?.data?.message || "Failed to load bookings"); }
    finally { setLoading(false); }
  };

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase().trim();
    return bookings.filter((booking) => {
      const matchesSearch = !q || [booking.customerName, booking.customerEmail, booking.customerPhone, booking.car?.name || "", booking.pickupLocation, booking.dropoffLocation].join(" ").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    try {
      setUpdatingId(bookingId);
      await updateBookingStatus(bookingId, status);
      toast.success("Booking status updated");
      await loadBookings();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update booking status");
    } finally { setUpdatingId(null); }
  };

  const badge = (status: BookingStatus) => {
    const cls = status === "pending" ? "bg-yellow-100 text-yellow-700" : status === "confirmed" ? "bg-blue-100 text-blue-700" : status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
    return <span className={`rounded-full px-3 py-1 text-xs font-medium ${cls}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">Bookings Management</h1><p className="text-sm text-muted-foreground">Review and manage customer booking requests.</p></div>
      <div className="flex flex-col gap-3 md:flex-row"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." className="w-full md:max-w-sm rounded-lg border p-3" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="rounded-lg border p-3 md:w-52"><option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
      {loading ? <div>Loading bookings...</div> : filteredBookings.length === 0 ? <div className="rounded-xl border p-6 text-sm text-muted-foreground">No bookings found.</div> : <div className="space-y-4">{filteredBookings.map((booking) => <Card key={booking.id}><CardContent className="p-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="space-y-3"><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-semibold">{booking.customerName}</h2>{badge(booking.status)}</div><div className="grid gap-2 text-sm md:grid-cols-2"><p><strong>Car:</strong> {booking.car?.name}</p><p><strong>Email:</strong> {booking.customerEmail}</p><p><strong>Phone:</strong> {booking.customerPhone}</p><p><strong>Total:</strong> €{booking.totalPrice}</p><p><strong>Pickup:</strong> {new Date(booking.pickupDate).toLocaleString()}</p><p><strong>Dropoff:</strong> {new Date(booking.dropoffDate).toLocaleString()}</p><p><strong>Pickup location:</strong> {booking.pickupLocation}</p><p><strong>Dropoff location:</strong> {booking.dropoffLocation}</p></div>{booking.notes ? <div className="rounded-xl bg-muted/40 p-3 text-sm"><strong>Notes:</strong> {booking.notes}</div> : null}<p className="text-xs text-muted-foreground">Created: {new Date(booking.createdAt).toLocaleString()}</p></div><div className="flex min-w-[220px] flex-col gap-2"><Button variant="outline" disabled={updatingId === booking.id} onClick={() => handleStatusChange(booking.id, "pending")}>Mark Pending</Button><Button variant="outline" disabled={updatingId === booking.id} onClick={() => handleStatusChange(booking.id, "confirmed")}>Confirm</Button><Button variant="outline" disabled={updatingId === booking.id} onClick={() => handleStatusChange(booking.id, "completed")}>Mark Completed</Button><Button variant="outline" disabled={updatingId === booking.id} onClick={() => handleStatusChange(booking.id, "cancelled")}>Cancel</Button></div></div></CardContent></Card>)}</div>}
    </div>
  );
}
