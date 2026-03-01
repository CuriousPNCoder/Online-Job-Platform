import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/apiError";
import { deleteJobAdmin, disableUser, getSummaryReport, listJobsAdmin, listUsers } from "../services/admin.service";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const result = await listUsers(req.query as { page?: string; limit?: string; role?: string });
  res.status(StatusCodes.OK).json(result);
};

export const disableUserById = async (req: Request, res: Response): Promise<void> => {
  const data = await disableUser(req.params.id);
  if (!data) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found", "USER_NOT_FOUND");
  }
  res.status(StatusCodes.OK).json({ success: true, message: "User disabled", data });
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const result = await listJobsAdmin(req.query as { page?: string; limit?: string; status?: "active" | "closed" });
  res.status(StatusCodes.OK).json(result);
};

export const deleteJobById = async (req: Request, res: Response): Promise<void> => {
  await deleteJobAdmin(req.params.id);
  res.status(StatusCodes.OK).json({ success: true, message: "Job deleted" });
};

export const getSummary = async (_req: Request, res: Response): Promise<void> => {
  const data = await getSummaryReport();
  res.status(StatusCodes.OK).json(data);
};
