import { apiClient } from "@/lib/api/client";
import { ApiListResponse, ApiSingleResponse, Job, RecruiterProfile } from "@/lib/types";

export type RecruiterJobPayload = {
  title: string;
  description: string;
  skillsRequired: string[];
  location: string;
  salaryRange: { min: number; max: number; currency?: string };
  category: string;
  jobType: string;
  status?: "active" | "closed";
};

export const recruiterApi = {
  getProfile: async (): Promise<ApiSingleResponse<RecruiterProfile | null>> => {
    const { data } = await apiClient.get<ApiSingleResponse<RecruiterProfile | null>>("/recruiter/profile");
    return data;
  },
  upsertProfile: async (payload: Omit<RecruiterProfile, "id" | "userId">): Promise<ApiSingleResponse<RecruiterProfile>> => {
    const { data } = await apiClient.put<ApiSingleResponse<RecruiterProfile>>("/recruiter/profile", payload);
    return data;
  },
  myJobs: async (page = 1, limit = 10): Promise<ApiListResponse<Job>> => {
    const { data } = await apiClient.get<ApiListResponse<Job>>("/recruiter/jobs", { params: { page, limit } });
    return data;
  },
  createJob: async (payload: RecruiterJobPayload): Promise<ApiSingleResponse<Job>> => {
    const { data } = await apiClient.post<ApiSingleResponse<Job>>("/recruiter/jobs", payload);
    return data;
  },
  updateJob: async (jobId: string, payload: Partial<RecruiterJobPayload>): Promise<ApiSingleResponse<Job>> => {
    const { data } = await apiClient.put<ApiSingleResponse<Job>>(`/recruiter/jobs/${jobId}`, payload);
    return data;
  },
  deleteJob: async (jobId: string): Promise<{ success: true; message: string }> => {
    const { data } = await apiClient.delete<{ success: true; message: string }>(`/recruiter/jobs/${jobId}`);
    return data;
  }
};
