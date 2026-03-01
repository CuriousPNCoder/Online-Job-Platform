import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/apiError";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized", "UNAUTHORIZED"));
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch (_error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token", "INVALID_TOKEN"));
  }
};
