import api from "..";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
}

export async function getUsers(): Promise<User[]> {
  const res = await api.get("/users");
  return res.data;
}

export async function getCurrentUser(id: string): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}) {
  const res = await api.post("/users", data);
  return res.data;
}

export async function updateUser(id: string, data: Partial<User>) {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
}

export async function deleteUser(id: string) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", data);
  return response;
}

