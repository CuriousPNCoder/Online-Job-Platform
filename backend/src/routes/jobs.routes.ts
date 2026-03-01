import { Router } from "express";
import { getJob, getJobs } from "../controllers/jobs.controller";
import { applyJob } from "../controllers/me.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/rbac.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { jobIdParamSchema, listJobsSchema } from "../validators/jobs.validators";
import { validate } from "../middlewares/validate.middleware";
import { applyJobSchema } from "../validators/applications.validators";

const router = Router();

router.get("/", validate(listJobsSchema), asyncHandler(getJobs));
router.post("/:id/apply", authenticate, allowRoles("jobseeker"), validate(applyJobSchema), asyncHandler(applyJob));
router.get("/:id", validate(jobIdParamSchema), asyncHandler(getJob));

export default router;
