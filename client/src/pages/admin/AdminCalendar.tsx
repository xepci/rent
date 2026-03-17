import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bookings } from "@/data/bookings";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleString("default", { month: "long", year: "numeric" });

  const bookingsByDate = useMemo(() => {
    const map: Record<string, typeof bookings> = {};
    bookings.forEach((b) => {
      const start = new Date(b.pickupDate);
      const end = new Date(b.dropoffDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split("T")[0];
        if (!map[key]) map[key] = [];
        map[key].push(b);
      }
    });
    return map;
  }, []);

  const days = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Booking Calendar</h1>

      <Card>
        <CardHeader>
          <CardTitle>{monthName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground p-2">{d}</div>
            ))}
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="min-h-[80px]" />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayBookings = bookingsByDate[dateStr] || [];
              const isToday = day === today.getDate();

              return (
                <div
                  key={day}
                  className={`min-h-[80px] border rounded-md p-1 ${isToday ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className={`text-xs font-medium mb-1 ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayBookings.slice(0, 2).map((b) => (
                      <div key={b.id} className="text-[10px] truncate">
                        <Badge className={`${statusColors[b.status]} text-[9px] px-1 py-0`}>
                          {b.carName}
                        </Badge>
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-[10px] text-muted-foreground">+{dayBookings.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Upcoming Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings
              .filter((b) => b.status !== "completed" && b.status !== "cancelled")
              .map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium text-sm">{b.carName}</p>
                    <p className="text-xs text-muted-foreground">{b.customerName} · {b.pickupDate} → {b.dropoffDate}</p>
                  </div>
                  <Badge className={statusColors[b.status]}>{b.status}</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
