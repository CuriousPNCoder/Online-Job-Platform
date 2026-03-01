import { apiClient } from "@/lib/api/client";
import { ApiSingleResponse, AuthResponse, User } from "@/lib/types";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "recruiter";
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/register", payload);
    return data;
  },
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  me: async (): Promise<ApiSingleResponse<User>> => {
    const { data } = await apiClient.get<ApiSingleResponse<User>>("/auth/me");
    return data;
  },
  logout: async (): Promise<{ success: true; message: string }> => {
    const { data } = await apiClient.post<{ success: true; message: string }>("/auth/logout");
    return data;
  }
};
