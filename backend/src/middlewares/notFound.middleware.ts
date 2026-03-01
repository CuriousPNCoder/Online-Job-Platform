import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError(404, "Route not found", "ROUTE_NOT_FOUND"));
};
