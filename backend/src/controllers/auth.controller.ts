import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  const result = await registerUser(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, message: "Registered successfully", ...result });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const result = await loginUser(req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Login successful", ...result });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const data = await getCurrentUser(req.user!.userId);
  res.status(StatusCodes.OK).json({ success: true, data });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.OK).json({ success: true, message: "Logout successful" });
};
