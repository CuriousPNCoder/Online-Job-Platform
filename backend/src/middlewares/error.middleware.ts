import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
      details: err.details
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errorCode: "VALIDATION_ERROR",
      details: err.flatten().fieldErrors
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    errorCode: "INTERNAL_SERVER_ERROR"
  });
};
