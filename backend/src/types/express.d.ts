import { Role } from "./common";

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: Role;
      email: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
