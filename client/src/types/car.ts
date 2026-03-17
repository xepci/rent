export type Car = {
  id: string;
  name: string;
  brand?: string | null;
  category: string;
  imageUrl?: string | null;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  description: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};
