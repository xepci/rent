import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import CarFormModal from "@/components/admin/CarFormModal";
import { createCar, deleteCar, getAdminCars, updateCar } from "@/api/carApi";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CarFormValues = {
  name: string; brand: string; category: string; imageUrl: string; image: File | null; pricePerDay: number; seats: number; transmission: string; fuel: string; year: number; description: string; available: boolean;
};

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => { loadCars(); }, []);

  const loadCars = async () => {
    try { setLoading(true); setCars(await getAdminCars()); }
    catch (error: any) { toast.error(error?.response?.data?.message || "Failed to load cars"); }
    finally { setLoading(false); }
  };

  const filteredCars = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return cars;
    return cars.filter((car) => [car.name, car.brand || "", car.category, car.transmission, car.fuel, String(car.year)].join(" ").toLowerCase().includes(q));
  }, [cars, search]);

  const handleDelete = async (car: Car) => {
    if (!window.confirm(`Delete "${car.name}"?`)) return;
    try { await deleteCar(car.id); toast.success("Car deleted successfully"); await loadCars(); }
    catch (error: any) { toast.error(error?.response?.data?.message || "Failed to delete car"); }
  };

  const handleSubmit = async (values: CarFormValues) => {
    try {
      setSubmitting(true);
      if (modalMode === "create") {
        await createCar(values);
        toast.success("Car created successfully");
      } else if (selectedCar) {
        await updateCar(selectedCar.id, values);
        toast.success("Car updated successfully");
      }
      setModalOpen(false);
      setSelectedCar(null);
      await loadCars();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save car");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap"><div><h1 className="font-display text-2xl font-bold">Cars Management</h1><p className="text-sm text-muted-foreground">Manage your fleet from the live database.</p></div><Button onClick={() => { setModalMode("create"); setSelectedCar(null); setModalOpen(true); }}>Add Vehicle</Button></div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cars..." className="w-full md:max-w-sm rounded-lg border p-3" />
      {loading ? <div>Loading cars...</div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{filteredCars.map((car) => <Card key={car.id} className="overflow-hidden"><div className="aspect-video overflow-hidden"><img src={car.imageUrl || "https://via.placeholder.com/640x360?text=No+Image"} alt={car.name} className="w-full h-full object-cover" /></div><CardContent className="pt-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">{car.name}</h2><p className="text-sm text-muted-foreground">{car.brand ? `${car.brand} • ` : ""}{car.category}</p></div><span className={`rounded-full px-3 py-1 text-xs font-medium ${car.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{car.available ? "Available" : "Unavailable"}</span></div><div className="grid grid-cols-2 gap-2 mt-4 text-sm"><p><strong>€{car.pricePerDay}</strong>/day</p><p>{car.year}</p><p>{car.seats} seats</p><p>{car.transmission}</p><p>{car.fuel}</p></div><p className="mt-4 text-sm text-muted-foreground line-clamp-3">{car.description}</p><div className="flex gap-2 mt-4"><Button variant="outline" size="sm" className="flex-1" onClick={() => { setModalMode("edit"); setSelectedCar(car); setModalOpen(true); }}>Edit</Button><Button variant="outline" size="sm" className="flex-1" onClick={() => handleDelete(car)}>Delete</Button></div></CardContent></Card>)}</div>}
      <CarFormModal open={modalOpen} mode={modalMode} initialCar={selectedCar} onClose={() => { setModalOpen(false); setSelectedCar(null); }} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
