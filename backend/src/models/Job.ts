import mongoose, { Document, Schema } from "mongoose";
import { JobStatus } from "../types/common";

export interface IJob extends Document {
  recruiterId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  skillsRequired: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
    currency?: string;
  };
  category: string;
  jobType: string;
  postedDate: Date;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    recruiterId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skillsRequired: [{ type: String, required: true, trim: true }],
    location: { type: String, required: true, trim: true },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD" }
    },
    category: { type: String, required: true, trim: true },
    jobType: { type: String, required: true, trim: true },
    postedDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "closed"], default: "active" }
  },
  { timestamps: true }
);

jobSchema.index({ location: 1, category: 1 });
jobSchema.index({ title: "text", description: "text" });

export const Job = mongoose.model<IJob>("Job", jobSchema);
