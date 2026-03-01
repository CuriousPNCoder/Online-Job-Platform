import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { swaggerDocument, totalApiCount } from "./config/swagger";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server healthy" });
});

app.get("/api-docs.json", (_req, res) => {
  res.status(200).json({
    success: true,
    totalApis: totalApiCount,
    docs: swaggerDocument
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
