import mongoose, { Document, Schema } from "mongoose";
import { ApplicationStatus } from "../types/common";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  jobSeekerId: mongoose.Types.ObjectId;
  appliedDate: Date;
  status: ApplicationStatus;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    jobSeekerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    appliedDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "shortlisted", "rejected", "hired"], default: "pending" },
    remarks: { type: String, trim: true }
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1, jobSeekerId: 1 }, { unique: true });

export const Application = mongoose.model<IApplication>("Application", applicationSchema);
