import { FilterQuery } from "mongoose";
import { Job, IJob } from "../models/Job";
import { parsePagination } from "../utils/pagination";

type ListJobsQuery = {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
  minSalary?: string;
  maxSalary?: string;
  page?: string;
  limit?: string;
};

export const listJobs = async (query: ListJobsQuery): Promise<Record<string, unknown>> => {
  const filter: FilterQuery<IJob> = { status: "active" };

  if (query.keyword) {
    filter.$text = { $search: query.keyword };
  }
  if (query.location) {
    filter.location = { $regex: query.location, $options: "i" };
  }
  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }
  if (query.jobType) {
    filter.jobType = { $regex: query.jobType, $options: "i" };
  }
  if (query.minSalary) {
    filter["salaryRange.min"] = { $gte: Number(query.minSalary) };
  }
  if (query.maxSalary) {
    filter["salaryRange.max"] = { $lte: Number(query.maxSalary) };
  }

  const { page, limit, skip } = parsePagination(query.page, query.limit);
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

export const getJobById = async (id: string): Promise<IJob | null> => {
  return Job.findById(id);
};
