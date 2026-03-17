import api from "./axios";

export async function getCars() {
  const response = await api.get("/cars");
  return response.data;
}

export async function getCarById(id: string) {
  const response = await api.get(`/cars/${id}`);
  return response.data;
}

export async function getAdminCars() {
  const response = await api.get("/admin/cars");
  return response.data;
}

export async function createCar(payload: {
  name: string;
  brand?: string;
  category: string;
  image?: File | null;
  imageUrl?: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  description: string;
  available?: boolean;
}) {
  const formData = new FormData();
  formData.append("name", payload.name);
  if (payload.brand) formData.append("brand", payload.brand);
  formData.append("category", payload.category);
  if (payload.image) formData.append("image", payload.image);
  if (payload.imageUrl) formData.append("imageUrl", payload.imageUrl);
  formData.append("pricePerDay", String(payload.pricePerDay));
  formData.append("seats", String(payload.seats));
  formData.append("transmission", payload.transmission);
  formData.append("fuel", payload.fuel);
  formData.append("year", String(payload.year));
  formData.append("description", payload.description);
  formData.append("available", String(payload.available ?? true));
  const response = await api.post("/admin/cars", formData, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data;
}

export async function updateCar(id: string, payload: Partial<{
  name: string;
  brand?: string;
  category: string;
  image: File | null;
  imageUrl?: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  description: string;
  available: boolean;
}>) {
  const formData = new FormData();
  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.brand !== undefined) formData.append("brand", payload.brand);
  if (payload.category !== undefined) formData.append("category", payload.category);
  if (payload.image) formData.append("image", payload.image);
  if (payload.imageUrl !== undefined) formData.append("imageUrl", payload.imageUrl);
  if (payload.pricePerDay !== undefined) formData.append("pricePerDay", String(payload.pricePerDay));
  if (payload.seats !== undefined) formData.append("seats", String(payload.seats));
  if (payload.transmission !== undefined) formData.append("transmission", payload.transmission);
  if (payload.fuel !== undefined) formData.append("fuel", payload.fuel);
  if (payload.year !== undefined) formData.append("year", String(payload.year));
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.available !== undefined) formData.append("available", String(payload.available));
  const response = await api.put(`/admin/cars/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data;
}

export async function deleteCar(id: string) {
  const response = await api.delete(`/admin/cars/${id}`);
  return response.data;
}
