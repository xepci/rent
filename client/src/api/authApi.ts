import api from "./axios";

export async function loginAdmin(email: string, password: string) {
  const response = await api.post("/admin/login", { email, password });
  return response.data;
}

export async function getAdminMe() {
  const response = await api.get("/admin/me");
  return response.data;
}
