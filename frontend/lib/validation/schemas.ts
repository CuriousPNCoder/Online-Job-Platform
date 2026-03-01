import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["jobseeker", "recruiter"]),
  phone: z.string().optional()
});

export const seekerProfileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  resumeUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  bio: z.string().optional(),
  skills: z.string().optional()
});

export const recruiterProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
  description: z.string().optional()
});

export const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  skillsRequired: z.string().min(2, "At least one skill is required"),
  location: z.string().min(2, "Location is required"),
  salaryMin: z.coerce.number().min(1, "Min salary is required"),
  salaryMax: z.coerce.number().min(1, "Max salary is required"),
  category: z.string().min(2, "Category is required"),
  jobType: z.string().min(2, "Job type is required"),
  status: z.enum(["active", "closed"]).optional()
});
