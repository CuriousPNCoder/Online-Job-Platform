import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../types/common";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  phone?: string;
  resumeUrl?: string;
  bio?: string;
  skills?: string[];
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "recruiter", "admin"], required: true },
    phone: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    bio: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    isDisabled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
