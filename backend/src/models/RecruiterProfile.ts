import mongoose, { Document, Schema } from "mongoose";

export interface IRecruiterProfile extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  website?: string;
  location: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const recruiterProfileSchema = new Schema<IRecruiterProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    companyName: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

export const RecruiterProfile = mongoose.model<IRecruiterProfile>("RecruiterProfile", recruiterProfileSchema);
