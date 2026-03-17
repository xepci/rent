import api from "./axios";

export async function createContactMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const response = await api.post("/contact", payload);
  return response.data;
}

export async function getAdminMessages() {
  const response = await api.get("/admin/messages");
  return response.data;
}

export async function deleteAdminMessage(id: string) {
  const response = await api.delete(`/admin/messages/${id}`);
  return response.data;
}

export async function replyToAdminMessage(
  id: string,
  payload: {
    subject: string;
    message: string;
  }
) {
  const response = await api.post(`/admin/messages/${id}/reply`, payload);
  return response.data;
}