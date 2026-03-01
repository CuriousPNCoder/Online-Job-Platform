import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getJobById, listJobs } from "../services/jobs.service";
import { ApiError } from "../utils/apiError";

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const result = await listJobs(req.query as Record<string, string>);
  res.status(StatusCodes.OK).json(result);
};

export const getJob = async (req: Request, res: Response): Promise<void> => {
  const job = await getJobById(req.params.id);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found", "JOB_NOT_FOUND");
  }
  res.status(StatusCodes.OK).json({ success: true, data: job });
};
