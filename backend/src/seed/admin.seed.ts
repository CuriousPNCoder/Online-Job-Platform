import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { env } from "../config/env";
import { User } from "../models/User";

const seedAdmin = async (): Promise<void> => {
  await connectDB();
  const existing = await User.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    // eslint-disable-next-line no-console
    console.log("Admin already exists");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
  await User.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: "admin"
  });

  // eslint-disable-next-line no-console
  console.log("Admin seeded successfully");
  process.exit(0);
};

void seedAdmin();
