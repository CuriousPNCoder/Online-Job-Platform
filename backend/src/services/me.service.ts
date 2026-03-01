import { StatusCodes } from "http-status-codes";
import { Application } from "../models/Application";
import { User } from "../models/User";
import { ApiError } from "../utils/apiError";
import { parsePagination } from "../utils/pagination";

export const getMeProfile = async (userId: string): Promise<Record<string, unknown>> => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found", "USER_NOT_FOUND");
  }
  return user.toObject();
};

export const updateMeProfile = async (
  userId: string,
  payload: Partial<{ name: string; phone: string; resumeUrl: string; bio: string; skills: string[] }>
): Promise<Record<string, unknown>> => {
  const user = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true }).select("-passwordHash");
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found", "USER_NOT_FOUND");
  }
  return user.toObject();
};

export const listMyApplications = async (
  userId: string,
  query: { page?: string; limit?: string }
): Promise<Record<string, unknown>> => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter = { jobSeekerId: userId };
  const [applications, total] = await Promise.all([
    Application.find(filter).populate("jobId").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Application.countDocuments(filter)
  ]);

  return {
    success: true,
    data: applications,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};
