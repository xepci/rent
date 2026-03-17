import api from "./axios";

export async function getDashboardStats() {
  const response = await api.get("/admin/dashboard");
  return response.data;
}
