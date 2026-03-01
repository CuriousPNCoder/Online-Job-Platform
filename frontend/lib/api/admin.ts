import { apiClient } from "@/lib/api/client";
import { ApiListResponse, Job, SummaryReport, User } from "@/lib/types";

export const adminApi = {
  users: async (params: { page?: number; limit?: number; role?: string }): Promise<ApiListResponse<User>> => {
    const { data } = await apiClient.get<ApiListResponse<User>>("/admin/users", { params });
    return data;
  },
  disableUser: async (id: string): Promise<{ success: true; message: string }> => {
    const { data } = await apiClient.patch<{ success: true; message: string }>(`/admin/users/${id}/disable`);
    return data;
  },
  jobs: async (params: { page?: number; limit?: number; status?: "active" | "closed" }): Promise<ApiListResponse<Job>> => {
    const { data } = await apiClient.get<ApiListResponse<Job>>("/admin/jobs", { params });
    return data;
  },
  deleteJob: async (id: string): Promise<{ success: true; message: string }> => {
    const { data } = await apiClient.delete<{ success: true; message: string }>(`/admin/jobs/${id}`);
    return data;
  },
  reportSummary: async (): Promise<{ success: true; data: SummaryReport }> => {
    const { data } = await apiClient.get<{ success: true; data: SummaryReport }>("/admin/reports/summary");
    return data;
  }
};
