import { apiClient } from "@/lib/api/client";
import { ApiListResponse, ApiSingleResponse, Job } from "@/lib/types";

export type JobFilters = {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  page?: number;
  limit?: number;
};

export const jobsApi = {
  list: async (filters: JobFilters): Promise<ApiListResponse<Job>> => {
    const { data } = await apiClient.get<ApiListResponse<Job>>("/jobs", { params: filters });
    return data;
  },
  byId: async (id: string): Promise<ApiSingleResponse<Job>> => {
    const { data } = await apiClient.get<ApiSingleResponse<Job>>(`/jobs/${id}`);
    return data;
  }
};
