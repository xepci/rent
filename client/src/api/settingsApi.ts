import api from "./axios";

export async function getPublicSettings() {
  const response = await api.get("/settings");
  return response.data;
}

export async function getSettings() {
  const response = await api.get("/admin/settings");
  return response.data;
}

export async function updateSettings(payload: {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
}) {
  const response = await api.put("/admin/settings", payload);
  return response.data;
}
