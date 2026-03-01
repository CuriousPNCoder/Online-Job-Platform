export type Role = "jobseeker" | "recruiter" | "admin";

export type ApplicationStatus = "pending" | "shortlisted" | "rejected" | "hired";
export type JobStatus = "active" | "closed";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  createdAt: string;
  resumeUrl?: string;
  bio?: string;
  skills?: string[];
  isDisabled?: boolean;
};

export type RecruiterProfile = {
  id: string;
  userId: string;
  companyName: string;
  website?: string;
  location: string;
  description?: string;
};

export type SalaryRange = {
  min: number;
  max: number;
  currency?: string;
};

export type Job = {
  id: string;
  recruiterId: string;
  title: string;
  description: string;
  skillsRequired: string[];
  location: string;
  salaryRange: SalaryRange;
  category: string;
  jobType: string;
  postedDate: string;
  status: JobStatus;
};

export type Application = {
  id: string;
  jobId: string | Job;
  jobSeekerId: string | User;
  appliedDate: string;
  status: ApplicationStatus;
  remarks?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorCode?: string;
  details?: Record<string, unknown>;
};

export type ApiListResponse<T> = {
  success: true;
  data: T[];
  pagination: Pagination;
};

export type ApiSingleResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type AuthResponse = {
  success: true;
  message: string;
  token: string;
  user: User;
};

export type SummaryReport = {
  totalUsers: number;
  totalRecruiters: number;
  totalJobs: number;
  totalApplications: number;
  applicationStatusCounts: Array<{ _id: ApplicationStatus; count: number }>;
};
