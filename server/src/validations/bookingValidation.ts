import { z } from "zod";
export const bookingSchema = z.object({ carId: z.string().min(1), customerName: z.string().min(2), customerEmail: z.string().email(), customerPhone: z.string().min(5), pickupDate: z.string().min(1), dropoffDate: z.string().min(1), pickupLocation: z.string().min(2), dropoffLocation: z.string().min(2), notes: z.string().optional() });
export const bookingStatusSchema = z.object({ status: z.enum(["pending", "confirmed", "cancelled", "completed"]) });
