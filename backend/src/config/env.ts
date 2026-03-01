import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string().optional(),
  DB_URI: z.string().optional(),
  JWT_SECRET: z.string().default("test_secret"),
  PORT: z.coerce.number().default(5000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  ADMIN_EMAIL: z.string().email().default("admin@jobportal.com"),
  ADMIN_PASSWORD: z.string().min(6).default("Admin@123"),
  ADMIN_NAME: z.string().default("System Admin")
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const dbUri = parsed.data.MONGODB_URI ?? parsed.data.DB_URI ?? "mongodb://127.0.0.1:27017/job-portal";

export const env = {
  ...parsed.data,
  DB_URI: dbUri
};
