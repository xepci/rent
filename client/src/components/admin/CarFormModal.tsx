import { useEffect, useState } from "react";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

type CarFormValues = {
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  image: File | null;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  description: string;
  available: boolean;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialCar?: Car | null;
  onClose: () => void;
  onSubmit: (values: CarFormValues) => Promise<void>;
  submitting?: boolean;
};

const defaultValues: CarFormValues = {
  name: "",
  brand: "",
  category: "",
  imageUrl: "",
  image: null,
  pricePerDay: 0,
  seats: 4,
  transmission: "",
  fuel: "",
  year: new Date().getFullYear(),
  description: "",
  available: true
};

export default function CarFormModal({ open, mode, initialCar, onClose, onSubmit, submitting = false }: Props) {
  const [form, setForm] = useState<CarFormValues>(defaultValues);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initialCar) {
      setForm({
        name: initialCar.name || "",
        brand: initialCar.brand || "",
        category: initialCar.category || "",
        imageUrl: initialCar.imageUrl || "",
        image: null,
        pricePerDay: initialCar.pricePerDay || 0,
        seats: initialCar.seats || 4,
        transmission: initialCar.transmission || "",
        fuel: initialCar.fuel || "",
        year: initialCar.year || new Date().getFullYear(),
        description: initialCar.description || "",
        available: initialCar.available
      });
      setPreviewUrl(initialCar.imageUrl || "");
    } else {
      setForm(defaultValues);
      setPreviewUrl("");
    }
  }, [open, mode, initialCar]);

  if (!open) return null;

  const updateField = <K extends keyof CarFormValues>(key: K, value: CarFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file: File | null) => {
    updateField("image", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(form.imageUrl || "");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-4xl p-6 max-h-[95vh] overflow-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{mode === "create" ? "Add Car" : "Edit Car"}</h2>
          <Button type="button" variant="outline" onClick={onClose}>Close</Button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={(e) => updateField("name", e.target.value)} required /></div>
          <div className="space-y-2"><Label>Brand</Label><Input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} /></div>
          <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={(e) => updateField("category", e.target.value)} required /></div>
          <div className="space-y-2"><Label>Price per day (€)</Label><Input type="number" min={1} value={form.pricePerDay} onChange={(e) => updateField("pricePerDay", Number(e.target.value))} required /></div>
          <div className="space-y-2"><Label>Seats</Label><Input type="number" min={1} value={form.seats} onChange={(e) => updateField("seats", Number(e.target.value))} required /></div>
          <div className="space-y-2"><Label>Transmission</Label><Input value={form.transmission} onChange={(e) => updateField("transmission", e.target.value)} required /></div>
          <div className="space-y-2"><Label>Fuel</Label><Input value={form.fuel} onChange={(e) => updateField("fuel", e.target.value)} required /></div>
          <div className="space-y-2"><Label>Year</Label><Input type="number" min={2000} max={2100} value={form.year} onChange={(e) => updateField("year", Number(e.target.value))} required /></div>
          <div className="space-y-2 md:col-span-2"><Label>Image upload</Label><Input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files?.[0] || null)} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Or image URL</Label><Input value={form.imageUrl} onChange={(e) => { updateField("imageUrl", e.target.value); if (!form.image) setPreviewUrl(e.target.value); }} /></div>
          {previewUrl ? <div className="space-y-2 md:col-span-2"><Label>Preview</Label><img src={previewUrl} alt="Preview" className="h-52 w-full rounded-lg border object-cover" /></div> : null}
          <div className="space-y-2 md:col-span-2"><Label>Description</Label><Textarea className="min-h-[120px]" value={form.description} onChange={(e) => updateField("description", e.target.value)} required /></div>
          <label className="md:col-span-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={form.available} onChange={(e) => updateField("available", e.target.checked)} /> Available</label>
          <div className="md:col-span-2 flex justify-end gap-3"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={submitting}>{submitting ? (mode === "create" ? "Creating..." : "Saving...") : (mode === "create" ? "Create car" : "Save changes")}</Button></div>
        </form>
      </Card>
    </div>
  );
}
