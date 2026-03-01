import { StatusCodes } from "http-status-codes";
import { Application } from "../models/Application";
import { Job } from "../models/Job";
import { RecruiterProfile } from "../models/RecruiterProfile";
import { ApiError } from "../utils/apiError";
import { parsePagination } from "../utils/pagination";

export const getRecruiterProfile = async (userId: string): Promise<Record<string, unknown> | null> => {
  const profile = await RecruiterProfile.findOne({ userId });
  return profile ? profile.toObject() : null;
};

export const upsertRecruiterProfile = async (
  userId: string,
  payload: { companyName: string; website?: string; location: string; description?: string }
): Promise<Record<string, unknown>> => {
  const profile = await RecruiterProfile.findOneAndUpdate({ userId }, payload, {
    new: true,
    upsert: true,
    runValidators: true
  });
  return profile.toObject();
};

export const createRecruiterJob = async (
  recruiterId: string,
  payload: {
    title: string;
    description: string;
    skillsRequired: string[];
    location: string;
    salaryRange: { min: number; max: number; currency?: string };
    category: string;
    jobType: string;
    status?: "active" | "closed";
  }
): Promise<Record<string, unknown>> => {
  const job = await Job.create({
    recruiterId,
    ...payload
  });
  return job.toObject();
};

export const updateRecruiterJob = async (
  recruiterId: string,
  jobId: string,
  payload: Partial<{
    title: string;
    description: string;
    skillsRequired: string[];
    location: string;
    salaryRange: { min: number; max: number; currency?: string };
    category: string;
    jobType: string;
    status: "active" | "closed";
  }>
): Promise<Record<string, unknown>> => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
  }
  if (job.recruiterId.toString() !== recruiterId) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Cannot modify other recruiter job", "JOB_OWNERSHIP_ERROR");
  }

  Object.assign(job, payload);
  await job.save();
  return job.toObject();
};

export const deleteRecruiterJob = async (recruiterId: string, jobId: string): Promise<void> => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
  }
  if (job.recruiterId.toString() !== recruiterId) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Cannot delete other recruiter job", "JOB_OWNERSHIP_ERROR");
  }
  await Job.deleteOne({ _id: jobId });
};

export const listRecruiterJobs = async (
  recruiterId: string,
  query: { page?: string; limit?: string }
): Promise<Record<string, unknown>> => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter = { recruiterId };
  const [jobs, total] = await Promise.all([
    Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(filter)
  ]);
  return {
    success: true,
    data: jobs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};

export const listRecruiterJobApplicants = async (
  recruiterId: string,
  jobId: string,
  query: { page?: string; limit?: string; status?: string }
): Promise<Record<string, unknown>> => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
  }
  if (job.recruiterId.toString() !== recruiterId) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Cannot view applicants for other recruiter job", "JOB_OWNERSHIP_ERROR");
  }

  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter: Record<string, unknown> = { jobId };
  if (query.status) {
    filter.status = query.status;
  }

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate("jobSeekerId", "name email phone resumeUrl skills")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Application.countDocuments(filter)
  ]);

  return {
    success: true,
    data: applications,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};
