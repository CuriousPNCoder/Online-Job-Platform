import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateApplicationStatus } from "../services/application.service";

export const patchApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  const data = await updateApplicationStatus(req.params.id, req.body, {
    userId: req.user!.userId,
    role: req.user!.role
  });
  res.status(StatusCodes.OK).json({ success: true, message: "Application status updated", data });
};
