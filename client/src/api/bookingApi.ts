import api from "./axios";
import type { BookingStatus } from "@/types/booking";

export async function createBooking(payload: {
  carId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
}) {
  const response = await api.post("/bookings", payload);
  return response.data;
}

export async function getAdminBookings() {
  const response = await api.get("/admin/bookings");
  return response.data;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const response = await api.patch(`/admin/bookings/${id}/status`, { status });
  return response.data;
}

export async function deleteBooking(id: string) {
  const response = await api.delete(`/admin/bookings/${id}`);
  return response.data;
}