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
      file?: {
        filename: string;
        path: string;
        mimetype: string;
        size: number;
      };
    }
  }
}

export {};
