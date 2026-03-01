import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { Role } from "../types/common";
import { ApiError } from "../utils/apiError";
import { signToken } from "../utils/jwt";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "recruiter";
  phone?: string;
}): Promise<{ token: string; user: Record<string, unknown> }> => {
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) {
    throw new ApiError(StatusCodes.CONFLICT, "Email already in use", "EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    passwordHash,
    role: payload.role,
    phone: payload.phone
  });

  const token = signToken({ userId: user.id, role: user.role as Role, email: user.email });
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt
    }
  };
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ token: string; user: Record<string, unknown> }> => {
  const user = await User.findOne({ email: payload.email.toLowerCase() });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  if (user.isDisabled) {
    throw new ApiError(StatusCodes.FORBIDDEN, "User account is disabled", "USER_DISABLED");
  }

  const validPassword = await bcrypt.compare(payload.password, user.passwordHash);
  if (!validPassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const token = signToken({ userId: user.id, role: user.role as Role, email: user.email });
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt
    }
  };
};

export const getCurrentUser = async (userId: string): Promise<Record<string, unknown>> => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found", "USER_NOT_FOUND");
  }
  return user.toObject();
};
