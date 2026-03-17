import { useState } from "react";
import { toast } from "sonner";
import { createBooking } from "@/api/bookingApi";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BookingForm({ car }: { car: Car }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setCustomerName(""); setCustomerEmail(""); setCustomerPhone(""); setPickupDate(""); setDropoffDate(""); setPickupLocation(""); setDropoffLocation(""); setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createBooking({ carId: car.id, customerName, customerEmail, customerPhone, pickupDate, dropoffDate, pickupLocation, dropoffLocation, notes });
      toast.success("Booking request submitted successfully");
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to submit booking right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input placeholder="Full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      <Input type="email" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
      <Input placeholder="Phone number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label className="mb-1 block">Pickup date</Label><Input type="datetime-local" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required /></div>
        <div><Label className="mb-1 block">Dropoff date</Label><Input type="datetime-local" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required /></div>
      </div>
      <Input placeholder="Pickup location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />
      <Input placeholder="Dropoff location" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required />
      <Textarea className="min-h-[120px]" placeholder="Extra notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Button type="submit" disabled={submitting}>{submitting ? "Sending request..." : `Book ${car.name}`}</Button>
    </form>
  );
}
