import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "@/api/carApi";
import type { Car } from "@/types/car";
import { Card, CardContent } from "@/components/ui/card";

export default function Fleet() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [transmission, setTransmission] = useState("all");

  useEffect(() => { (async () => { try { setLoading(true); setCars(await getCars()); } finally { setLoading(false); } })(); }, []);

  const categories = useMemo(() => ["all", ...Array.from(new Set(cars.map((car) => car.category))).filter(Boolean)], [cars]);
  const transmissions = useMemo(() => ["all", ...Array.from(new Set(cars.map((car) => car.transmission))).filter(Boolean)], [cars]);
  const filteredCars = useMemo(() => {
    const q = search.toLowerCase().trim();
    return cars.filter((car) => {
      const matchesSearch = !q || [car.name, car.brand || "", car.category, car.fuel, car.transmission, String(car.year)].join(" ").toLowerCase().includes(q);
      return matchesSearch && (category === "all" || car.category === category) && (transmission === "all" || car.transmission === transmission);
    });
  }, [cars, search, category, transmission]);

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div><h1 className="font-display text-3xl font-bold">Available Cars</h1><p className="text-muted-foreground">Browse our live rental fleet and choose the car that fits your trip.</p></div>
      <div className="grid gap-3 md:grid-cols-3"><input type="text" placeholder="Search cars..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl border p-3" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border p-3">{categories.map((item) => <option key={item} value={item}>{item === "all" ? "All categories" : item}</option>)}</select><select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="rounded-xl border p-3">{transmissions.map((item) => <option key={item} value={item}>{item === "all" ? "All transmissions" : item}</option>)}</select></div>
      {loading ? <div>Loading cars...</div> : filteredCars.length === 0 ? <div className="rounded-2xl border p-6 text-muted-foreground">No cars found.</div> : <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filteredCars.map((car) => <Card key={car.id} className="overflow-hidden shadow-sm"><img src={car.imageUrl || "https://via.placeholder.com/600x360?text=No+Image"} alt={car.name} className="h-56 w-full object-cover" /><CardContent className="p-4 space-y-3"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">{car.name}</h2><p className="text-sm text-muted-foreground">{car.brand ? `${car.brand} • ` : ""}{car.category}</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Available</span></div><div className="grid grid-cols-2 gap-2 text-sm"><p>{car.seats} seats</p><p>{car.transmission}</p><p>{car.fuel}</p><p>{car.year}</p></div><p className="line-clamp-3 text-sm text-muted-foreground">{car.description}</p><div className="flex items-center justify-between pt-2"><p className="text-lg font-bold">€{car.pricePerDay}/day</p><Link to={`/fleet/${car.id}`} className="rounded-lg bg-black px-4 py-2 text-white">View details</Link></div></CardContent></Card>)}</div>}
    </div>
  );
}
