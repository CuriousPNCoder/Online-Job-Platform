import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { ApiError } from "../utils/apiError";

const uploadDir = path.join(process.cwd(), "uploads", "resumes");
fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeOriginalName}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new ApiError(StatusCodes.BAD_REQUEST, "Only PDF, DOC, DOCX files are allowed", "INVALID_RESUME_TYPE"));
      return;
    }
    cb(null, true);
  }
});

export const uploadResume = (req: Request, res: Response, next: NextFunction): void => {
  upload.single("resume")(req, res, (err: unknown) => {
    if (!err) {
      next();
      return;
    }

    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      next(new ApiError(StatusCodes.BAD_REQUEST, "Resume must be 5MB or smaller", "RESUME_TOO_LARGE"));
      return;
    }

    if (err instanceof ApiError) {
      next(err);
      return;
    }

    next(new ApiError(StatusCodes.BAD_REQUEST, "Failed to upload resume", "RESUME_UPLOAD_FAILED"));
  });
};
