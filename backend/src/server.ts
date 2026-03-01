import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    const baseUrl = `http://localhost:${env.PORT}`;
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${env.PORT}`);
    // eslint-disable-next-line no-console
    console.log(`API base URL: ${baseUrl}`);
    // eslint-disable-next-line no-console
    console.log(`Swagger UI: ${baseUrl}/api-docs`);
    // eslint-disable-next-line no-console
    console.log(`Swagger JSON: ${baseUrl}/api-docs.json`);
  });
};

void start();
