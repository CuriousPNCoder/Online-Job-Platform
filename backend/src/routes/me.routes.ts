import { Router } from "express";
import { getProfile, myApplications, putProfile, uploadResumeFile } from "../controllers/me.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { uploadResume } from "../middlewares/resumeUpload.middleware";
import { allowRoles } from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { myApplicationsQuerySchema, updateMeProfileSchema } from "../validators/me.validators";

const router = Router();

router.use(authenticate, allowRoles("jobseeker"));

router.get("/profile", asyncHandler(getProfile));
router.put("/profile", validate(updateMeProfileSchema), asyncHandler(putProfile));
router.post("/resume", uploadResume, asyncHandler(uploadResumeFile));
router.get("/applications", validate(myApplicationsQuerySchema), asyncHandler(myApplications));

export default router;
