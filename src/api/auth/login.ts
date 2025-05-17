import api from "..";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  if (![200, 201].includes(response.status)) {
    return false;
  }

  return response.data;
}
