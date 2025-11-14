import { apiRequest } from "./queryClient";

export interface User {
  id: string;
  email: string;
  role: "admin" | "client";
  name: string | null;
}

export interface LoginResponse {
  user: User;
  message: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await apiRequest("POST", "/api/auth/login", { email, password });
  return await response.json();
}

export async function logout(): Promise<void> {
  await apiRequest("POST", "/api/auth/logout");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiRequest("GET", "/api/auth/me");
    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function register(
  email: string,
  password: string,
  name?: string
): Promise<LoginResponse> {
  const response = await apiRequest("POST", "/api/auth/register", { email, password, name });
  return await response.json();
}
