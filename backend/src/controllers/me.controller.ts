import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { applyForJob } from "../services/application.service";
import { getMeProfile, listMyApplications, updateMeProfile } from "../services/me.service";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const data = await getMeProfile(req.user!.userId);
  res.status(StatusCodes.OK).json({ success: true, data });
};

export const putProfile = async (req: Request, res: Response): Promise<void> => {
  const data = await updateMeProfile(req.user!.userId, req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Profile updated", data });
};

export const applyJob = async (req: Request, res: Response): Promise<void> => {
  const data = await applyForJob(req.params.id, req.user!.userId);
  res.status(StatusCodes.CREATED).json({ success: true, message: "Application submitted", data });
};

export const myApplications = async (req: Request, res: Response): Promise<void> => {
  const result = await listMyApplications(req.user!.userId, req.query as { page?: string; limit?: string });
  res.status(StatusCodes.OK).json(result);
};
