import { Router } from "express";
import adminRoutes from "./admin.routes";
import applicationsRoutes from "./applications.routes";
import authRoutes from "./auth.routes";
import jobsRoutes from "./jobs.routes";
import meRoutes from "./me.routes";
import recruiterRoutes from "./recruiter.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/me", meRoutes);
router.use("/recruiter", recruiterRoutes);
router.use("/applications", applicationsRoutes);
router.use("/admin", adminRoutes);

export default router;
