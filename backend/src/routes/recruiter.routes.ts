import { Router } from "express";
import {
  createJob,
  deleteJob,
  getApplicants,
  getJobs,
  getProfile,
  putProfile,
  updateJob
} from "../controllers/recruiter.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { createJobSchema, jobIdParamSchema, recruiterJobsQuerySchema, updateJobSchema } from "../validators/jobs.validators";
import { recruiterApplicantsQuerySchema, updateRecruiterProfileSchema } from "../validators/recruiter.validators";

const router = Router();

router.use(authenticate, allowRoles("recruiter"));

router.get("/profile", asyncHandler(getProfile));
router.put("/profile", validate(updateRecruiterProfileSchema), asyncHandler(putProfile));

router.post("/jobs", validate(createJobSchema), asyncHandler(createJob));
router.put("/jobs/:id", validate(updateJobSchema), asyncHandler(updateJob));
router.delete("/jobs/:id", validate(jobIdParamSchema), asyncHandler(deleteJob));
router.get("/jobs", validate(recruiterJobsQuerySchema), asyncHandler(getJobs));
router.get("/jobs/:id/applications", validate(recruiterApplicantsQuerySchema), asyncHandler(getApplicants));

export default router;
