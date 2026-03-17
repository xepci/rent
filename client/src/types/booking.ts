import type { Car } from "./car";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  carId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string | null;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
  car: Car;
};
