import { Role } from "@/lib/types";

export const storageKeys = {
  token: "ojp_token",
  user: "ojp_user"
} as const;

export const defaultPageSize = 10;

export const roleHome: Record<Role, string> = {
  jobseeker: "/jobseeker/dashboard",
  recruiter: "/recruiter/dashboard",
  admin: "/admin/dashboard"
};

export const publicPaths = ["/", "/login", "/register", "/jobs"];
