import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Role } from "../types/common";
import { ApiError } from "../utils/apiError";

export const allowRoles =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized", "UNAUTHORIZED"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError(StatusCodes.FORBIDDEN, "Forbidden", "FORBIDDEN"));
      return;
    }

    next();
  };
