import { Application } from "../models/Application";
import { Job } from "../models/Job";
import { User } from "../models/User";
import { parsePagination } from "../utils/pagination";

export const listUsers = async (query: { page?: string; limit?: string; role?: string }): Promise<Record<string, unknown>> => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter: Record<string, unknown> = {};
  if (query.role) {
    filter.role = query.role;
  }
  const [users, total] = await Promise.all([
    User.find(filter).select("-passwordHash").sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter)
  ]);
  return {
    success: true,
    data: users,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};

export const disableUser = async (id: string): Promise<Record<string, unknown> | null> => {
  const user = await User.findByIdAndUpdate(id, { isDisabled: true }, { new: true }).select("-passwordHash");
  return user ? user.toObject() : null;
};

export const listJobsAdmin = async (
  query: { page?: string; limit?: string; status?: "active" | "closed" }
): Promise<Record<string, unknown>> => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter: Record<string, unknown> = {};
  if (query.status) {
    filter.status = query.status;
  }
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

export const deleteJobAdmin = async (id: string): Promise<void> => {
  await Job.deleteOne({ _id: id });
  await Application.deleteMany({ jobId: id });
};

export const getSummaryReport = async (): Promise<Record<string, unknown>> => {
  const [totalUsers, totalRecruiters, totalJobs, totalApplications, statusWise] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "recruiter" }),
    Job.countDocuments(),
    Application.countDocuments(),
    Application.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
  ]);

  return {
    success: true,
    data: {
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalApplications,
      applicationStatusCounts: statusWise
    }
  };
};
