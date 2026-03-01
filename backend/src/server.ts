import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${env.PORT}`);
  });
};

void start();
