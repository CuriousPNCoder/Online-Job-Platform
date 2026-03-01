import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Role } from "../types/common";

export const signToken = (payload: { userId: string; email: string; role: Role }): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): { userId: string; email: string; role: Role } => {
  return jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string; role: Role };
};
