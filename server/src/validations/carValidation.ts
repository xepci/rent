import { z } from "zod";
export const carSchema = z.object({ name: z.string().min(2), brand: z.string().optional().or(z.literal("")), category: z.string().min(2), imageUrl: z.string().url().optional().or(z.literal("")), pricePerDay: z.number().int().positive(), seats: z.number().int().positive(), transmission: z.string().min(2), fuel: z.string().min(2), year: z.number().int().min(2000).max(2100), description: z.string().min(10), available: z.boolean().optional() });
export const updateCarSchema = carSchema.partial();
