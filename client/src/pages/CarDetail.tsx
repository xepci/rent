import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "@/api/carApi";
import type { Car } from "@/types/car";
import BookingForm from "@/components/booking/BookingForm";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!id) return; (async () => { try { setLoading(true); setCar(await getCarById(id)); } catch { setCar(null); } finally { setLoading(false); } })(); }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-10">Loading car...</div>;
  if (!car) return <div className="container mx-auto px-4 py-10"><div className="rounded-2xl border p-6">Car not found.</div></div>;

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="grid gap-8 lg:grid-cols-2"><div className="space-y-4"><img src={car.imageUrl || "https://via.placeholder.com/900x520?text=No+Image"} alt={car.name} className="h-[420px] w-full rounded-2xl object-cover border" /><div className="rounded-2xl border p-4"><h1 className="font-display text-3xl font-bold">{car.name}</h1><p className="mt-1 text-muted-foreground">{car.brand ? `${car.brand} • ` : ""}{car.category}</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-muted/30 p-3"><strong>Price:</strong> €{car.pricePerDay}/day</div><div className="rounded-xl bg-muted/30 p-3"><strong>Seats:</strong> {car.seats}</div><div className="rounded-xl bg-muted/30 p-3"><strong>Transmission:</strong> {car.transmission}</div><div className="rounded-xl bg-muted/30 p-3"><strong>Fuel:</strong> {car.fuel}</div><div className="rounded-xl bg-muted/30 p-3"><strong>Year:</strong> {car.year}</div><div className="rounded-xl bg-muted/30 p-3"><strong>Status:</strong> {car.available ? "Available" : "Unavailable"}</div></div><div className="mt-4"><h2 className="text-lg font-semibold">Description</h2><p className="mt-2 text-muted-foreground">{car.description}</p></div></div></div><div><div className="rounded-2xl border p-5 shadow-sm"><h2 className="text-2xl font-semibold">Book this car</h2><p className="mb-4 text-sm text-muted-foreground">Send your rental request and we’ll contact you to confirm.</p><BookingForm car={car} /></div></div></div>
    </div>
  );
}
