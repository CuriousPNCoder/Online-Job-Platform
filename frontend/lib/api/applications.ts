import { apiClient } from "@/lib/api/client";
import { ApiListResponse, ApiSingleResponse, Application, ApplicationStatus, User } from "@/lib/types";

export const applicationApi = {
  apply: async (jobId: string): Promise<ApiSingleResponse<Application>> => {
    const { data } = await apiClient.post<ApiSingleResponse<Application>>(`/jobs/${jobId}/apply`);
    return data;
  },
  myApplications: async (page = 1, limit = 10): Promise<ApiListResponse<Application>> => {
    const { data } = await apiClient.get<ApiListResponse<Application>>("/me/applications", { params: { page, limit } });
    return data;
  },
  applicantsByJob: async (
    jobId: string,
    params: { page?: number; limit?: number; status?: ApplicationStatus }
  ): Promise<ApiListResponse<Application & { jobSeekerId: User }>> => {
    const { data } = await apiClient.get<ApiListResponse<Application & { jobSeekerId: User }>>(
      `/recruiter/jobs/${jobId}/applications`,
      { params }
    );
    return data;
  },
  updateStatus: async (
    applicationId: string,
    payload: { status: ApplicationStatus; remarks?: string }
  ): Promise<ApiSingleResponse<Application>> => {
    const { data } = await apiClient.patch<ApiSingleResponse<Application>>(`/applications/${applicationId}/status`, payload);
    return data;
  }
};
