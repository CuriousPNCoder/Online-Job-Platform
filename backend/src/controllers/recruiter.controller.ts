import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createRecruiterJob,
  deleteRecruiterJob,
  getRecruiterProfile,
  listRecruiterJobApplicants,
  listRecruiterJobs,
  updateRecruiterJob,
  upsertRecruiterProfile
} from "../services/recruiter.service";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const data = await getRecruiterProfile(req.user!.userId);
  res.status(StatusCodes.OK).json({ success: true, data });
};

export const putProfile = async (req: Request, res: Response): Promise<void> => {
  const data = await upsertRecruiterProfile(req.user!.userId, req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Recruiter profile updated", data });
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  const data = await createRecruiterJob(req.user!.userId, req.body);
  res.status(StatusCodes.CREATED).json({ success: true, message: "Job created", data });
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  const data = await updateRecruiterJob(req.user!.userId, req.params.id, req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Job updated", data });
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  await deleteRecruiterJob(req.user!.userId, req.params.id);
  res.status(StatusCodes.OK).json({ success: true, message: "Job deleted" });
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const result = await listRecruiterJobs(req.user!.userId, req.query as { page?: string; limit?: string });
  res.status(StatusCodes.OK).json(result);
};

export const getApplicants = async (req: Request, res: Response): Promise<void> => {
  const result = await listRecruiterJobApplicants(
    req.user!.userId,
    req.params.id,
    req.query as { page?: string; limit?: string; status?: string }
  );
  res.status(StatusCodes.OK).json(result);
};
