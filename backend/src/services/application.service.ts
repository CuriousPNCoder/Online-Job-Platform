import { StatusCodes } from "http-status-codes";
import { Application } from "../models/Application";
import { Job } from "../models/Job";
import { ApiError } from "../utils/apiError";

export const applyForJob = async (jobId: string, jobSeekerId: string): Promise<Record<string, unknown>> => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
  }
  if (job.status !== "active") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Cannot apply to closed job", "JOB_CLOSED");
  }

  const existing = await Application.findOne({ jobId, jobSeekerId });
  if (existing) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "You have already applied to this job",
      "DUPLICATE_APPLICATION"
    );
  }

  const application = await Application.create({ jobId, jobSeekerId });
  return application.toObject();
};

export const updateApplicationStatus = async (
  applicationId: string,
  payload: { status: "pending" | "shortlisted" | "rejected" | "hired"; remarks?: string },
  currentUser: { userId: string; role: string }
): Promise<Record<string, unknown>> => {
  const application = await Application.findById(applicationId);
  if (!application) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application not found", "APPLICATION_NOT_FOUND");
  }

  if (currentUser.role !== "admin") {
    const job = await Job.findById(application.jobId);
    if (!job) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
    }
    if (job.recruiterId.toString() !== currentUser.userId) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden", "FORBIDDEN");
    }
  }

  application.status = payload.status;
  application.remarks = payload.remarks;
  await application.save();

  return application.toObject();
};
